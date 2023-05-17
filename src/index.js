import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const cashe = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        people: {
          keyArgs: ["search"],
          read(existing, { args: { offset, limit, search } }) {
            // A read function should always return undefined if existing is
            // undefined. Returning undefined signals that the field is
            // missing from the cache, which instructs Apollo Client to
            // fetch its value from your GraphQL server.
            console.log(
              "inside read fn",
              existing?.length,
              offset,
              limit,
              search
            );
            if (existing?.length > offset) {
              console.log("return from cache");
              return existing && existing.slice(offset, offset + limit);
            } else {
              console.log("return undefined");
              return undefined;
            }
          },
          merge: (existing = [], incoming, { args: { offset = 0 } }) => {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            console.log("xxx existing", existing);
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  link,
  connectToDevTools: true,
  cache: cashe
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
