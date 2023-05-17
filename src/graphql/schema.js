import { faker } from "@faker-js/faker";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from "graphql";

const BotType = new GraphQLObjectType({
  name: "Bots",
  fields: {
    botId: { type: GraphQLString }
  }
});

const TabType = new GraphQLObjectType({
  name: "Tabs",
  fields: {
    entityId: { type: GraphQLString }
  }
});

const InstalledAppType = new GraphQLObjectType({
  name: "InstalledApp",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    bots: {
      type: new GraphQLList(BotType)
    },
    tabs: {
      type: new GraphQLList(TabType)
    }
  }
});

// const peopleData = Array.from({ length: 100 }).map((_, index) => {
//   return { id: index + 1, name: faker.name.fullName() };
// });

// console.log("xxx", peopleData);

// [
//   { id: 1, name: 'John Smith' },
//   { id: 2, name: 'Sara Smith' },
//   { id: 3, name: 'Budd Deey' },
//   { id: 4, name: "Brenton Carter" },
//   { id: 5, name: "Adrianna Reese" },
//   { id: 6, name: "Jaidyn Rosales" },
//   { id: 7, name: "Alayah Wilkins" },
//   { id: 8, name: "Aleena Gould" },
//   { id: 9, name: "Brynlee Ayala" }
// ];

const installedAppsData = [
  {
    id: 1,
    name: "Polly",
    bots: [
      {
        botId: "botId1"
      }
    ],
    tabs: [
      {
        entityId: "entityId1"
      }
    ]
  },
  {
    id: 2,
    name: "Forms",
    bots: [
      {
        botId: "botId2"
      }
    ],
    tabs: [
      {
        entityId: "entityId2"
      }
    ]
  }
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    apps: {
      type: new GraphQLList(InstalledAppType),
      args: {
        capability: { type: GraphQLString },
        context: { type: GraphQLString }
      },
      resolve: (_, { capability = "", context = "" }) => {
        console.log("in resolver", capability, context);
        // const searchResults = search
        //   ? peopleData.filter((person) =>
        //       person.name.toLowerCase().includes(search.toLowerCase())
        //     )
        //   : peopleData;
        // return searchResults.slice(offset, offset + limit);
        // if (capability === "bots") {
        //   const results = [];
        //   installedAppsData.forEach((app) => {
        //     results.push({
        //       id: app.id,
        //       name: app.name,
        //       bots: app.bots
        //     });
        //   });
        //   return results;
        // } else if (capability === "tabs") {
        //   const results = [];
        //   installedAppsData.forEach((app) => {
        //     results.push({
        //       id: app.id,
        //       name: app.name,
        //       tabs: app.tabs
        //     });
        //   });
        //   return results;
        // }
        return installedAppsData;
      }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });
