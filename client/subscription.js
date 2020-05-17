
const {
  ApolloClient,
  InMemoryCache,
  gql
} = require('@apollo/client');
const { WebSocketLink } = require('@apollo/link-ws');
const ws = require('ws');

const clientNumber = process.env.CLIENT_NUMBER ? parseInt(process.env.CLIENT_NUMBER) : 500;

function createWsClient() {
  // const userId = Math.floor(Math.random() * 50);
  const userId = 1;

  const wsLink = new WebSocketLink({
    uri: `ws://127.0.0.1:8080/v1/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': 'hasura',
          'x-hasura-user-id': userId.toString(),
          'x-hasura-role': 'user'
        }
      },
      lazy: false,
      connectionCallback: () => {
        // console.error('connection error: ', error);
      },
    },
    webSocketImpl: ws
  });

  return new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
}

function doSubscribe(idx, client) {
  const min = new Date();
  return client.subscribe({
    query: gql`
    subscription chatMessages {
      test(limit: 100, order_by: { id: desc }) {
        id
        name
      }
    }
    `,
    fetchPolicy: "network-only"
  }).subscribe(() => console.log(idx, new Date().getTime() - min.getTime()));
}

function main() {
  for (let i = 0; i < clientNumber; i++) {
    const client = createWsClient();
    doSubscribe(i, client);
  }
}

main();
