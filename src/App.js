import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const ALL_APPS = gql`
  query AllApps($capability: String, $context: String) {
    apps(capability: $capability, context: $context) {
      id
      name
    }
  }
`;

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, previousData, refetch } = useQuery(ALL_APPS, {
    variables: {
      capability: "bots"
    }
  });
  console.log("got data", "page:", page, data);
  // useEffect(() => {
  //   refetch({
  //     // variables: {
  //     offset: (page - 1) * limit
  //     // }
  //   });
  // }, [page]);

  // useEffect(() => {
  //   setPage(1);
  //   refetch({
  //     // variables: {
  //     search,
  //     offset: 0
  //     // }
  //   });
  // }, [search]);

  const { apps } = data ?? previousData ?? {};

  return (
    <main>
      <input type="test" onChange={(e) => setSearch(e.target.value)} />
      <h2>Names</h2>
      <ul>
        {apps?.map((app) => (
          <li key={app.id}>{app.name}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: 10 }).map((_, index) => {
          const newPage = index + 1;
          return (
            <button
              key={newPage}
              onClick={() => {
                // refetch({
                //   variables: {
                //     offset: (page - 1) * limit
                //   }
                // });
                setPage(newPage);
              }}
            >
              {newPage}
            </button>
          );
        })}
      </div>
    </main>
  );
}
