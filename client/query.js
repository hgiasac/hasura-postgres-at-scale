
const {
  ApolloClient,
  InMemoryCache,
  HttpLink
} = require('@apollo/client');
const fetch = require('node-fetch');
const clientNumber = process.env.CLIENT_NUMBER ? parseInt(process.env.CLIENT_NUMBER) : 100;

function createHttpClient() {

  const link = new HttpLink({
    uri: `http://127.0.0.1:8080/v1/graphql`,
    headers: {
      'x-hasura-admin-secret': 'hasura'
    },
    fetch
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}

function doFetch(idx) {
  const min = new Date();
  return fetch(`http://127.0.0.1:8080/v1/graphql`, {
    method: 'post',
    body: JSON.stringify({
      query: `query listTest {
        test(limit: 100) {
          id
          name
        }
      }
      `,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'hasura'
    }
  }).then((result) => result.json())
    .then((result) => console.log(idx, result.data.test.length))
    .catch(console.error);
}
function main() {
  let counter = 1;
  setInterval(() => {

    for (let i = 1; i <= clientNumber; i++) {
      doFetch(i);
    }
    counter++;
  }, 1000);
}

main();
