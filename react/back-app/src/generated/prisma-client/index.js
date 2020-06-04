"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Resource",
    embedded: false
  },
  {
    name: "Author",
    embedded: false
  },
  {
    name: "Title",
    embedded: false
  },
  {
    name: "Direction",
    embedded: false
  },
  {
    name: "Profession",
    embedded: false
  },
  {
    name: "Specialization",
    embedded: false
  },
  {
    name: "Udc",
    embedded: false
  },
  {
    name: "Content",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/vlad-herasymchuk/dplm/dplm`
});
exports.prisma = new exports.Prisma();
