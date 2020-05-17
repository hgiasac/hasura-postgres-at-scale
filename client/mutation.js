const fetch = require('node-fetch');
const clientNumber = process.env.CLIENT_NUMBER ? parseInt(process.env.CLIENT_NUMBER) : 100;


function doFetch(idx) {
  const min = new Date();
  const variables = {
    objects: [{
      name: Math.random().toString(36).substring(20),
    }]
  };
  return fetch(`http://127.0.0.1:8080/v1/graphql`, {
    method: 'post',
    body: JSON.stringify({
      query: `mutation createTest($objects: [test_insert_input!]!) {
        insert_test(objects: $objects) {
          returning {
            id
            name
          }
        }
      }
      `,
      variables
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'hasura'
    }
  }).then(() => console.log(idx, new Date().getTime() - min.getTime()))
    .catch(console.error);
}
function main() {
  let counter = 1;
  const itv = setInterval(() => {

    for (let i = 1; i <= clientNumber; i++) {
      doFetch(i);
    }
    counter++;
  }, 1000);
}

main();
