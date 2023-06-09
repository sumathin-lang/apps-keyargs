import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "@apollo/client";
import { schema } from "./schema";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export const link = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { query, operationName, variables } = operation;
    delay(10)
      .then(() =>
        graphql(schema, print(query), null, null, variables, operationName)
      )
      .then((result) => {
        observer.next(result);
        observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});
