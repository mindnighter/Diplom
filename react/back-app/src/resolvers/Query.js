const { fullResource } = require("../fragments/Resource")

function resources(parent, args, context, info) {
  return context.prisma.resources().$fragment(fullResource)
}

function authors(parent, args, context, info) {
  return context.prisma.authors()
}

function titles(parent, args, context, info) {
  return context.prisma.titles()
}

function directions(parent, args, context, info) {
  return context.prisma.directions()
}

function professions(parent, args, context, info) {
  return context.prisma.professions()
}

function specializations(parent, args, context, info) {
  return context.prisma.specializations()
}

function udcs(parent, args, context, info) {
  return context.prisma.udcs()
}

function contents(parent, args, context, info) {
  return context.prisma.contents()
}

module.exports = {
  resources,
  authors,
  titles,
  directions,
  professions,
  specializations,
  udcs,
  contents
}