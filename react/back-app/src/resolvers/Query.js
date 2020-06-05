const { fullResource } = require("../fragments/Resource")

function resources(parent, args, context, info) {
  return context.prisma.resources().$fragment(fullResource)
}

function authors(parent, args, context, info) {
  return context.prisma.authors()
}

function find(searchData, consist) {
  for (let i = 0; i < searchData.length; i++) {
    let counter = 0

    for (let j = 0; j < consist.length; j++) {
      if (searchData[i + j].toUpperCase() == consist[j].toUpperCase()) {
        counter++
      } else {
        if (counter) {
          i += counter - 1
        }
        break
      }
      if (counter == consist.length) {
        return true
      }
    }
  }

  return false
}

// async function findResourceByAuthor(parent, args, context, info) {
//   const authors = await context.prisma.authors()
//   const { consist } = args

//   const filteredAuthors = authors.filter(author => {
//     return find(author.fullName, consist)
//   })

//   const results = []
//   for (const author of filteredAuthors) {
//     results.push((await context.prisma
//       .resources({ where: { author_some: { id: author.id } } })
//       .$fragment(fullResource))[0])
//   }

//   return results
// }


function titles(parent, args, context, info) {
  return context.prisma.titles()
}

async function findResourceBy(parent, args, context, info) {
  const { author, subAuthor, title, direction, profession, specialization, udc, content, consist } = args
  const results = []

  if (author) {
    const authors = await context.prisma.authors()
    const filteredAuthors = authors.filter(author => {
      return find(author.fullName, consist)
    })

    for (const author of filteredAuthors) {
      results.push((await context.prisma
        .resources({ where: { author_some: { id: author.id } } })
        .$fragment(fullResource))[0])
    }
  }
  if (subAuthor) {
    const authors = await context.prisma.authors()
    const filteredAuthors = authors.filter(author => {
      return find(author.fullName, consist)
    })

    for (const author of filteredAuthors) {
      results.push((await context.prisma
        .resources({ where: { subAuthor_some: { id: author.id } } })
        .$fragment(fullResource))[0])
    }
  }
  if (title) {
    const titles = await context.prisma.titles()
    const filteredTitles = titles.filter(title => {
      return find(title.title, consist)
    })

    for (const title of filteredTitles) {
      results.push((await context.prisma
        .resources({ where: { title: { id: title.id } } })
        .$fragment(fullResource))[0])
    }
  }
  // if (direction) {
  //   request.direction = {
  //     create: {
  //       code: direction
  //     }
  //   }
  // }
  // if (profession) {
  //   request.profession = {
  //     create: {
  //       profession
  //     }
  //   }
  // }
  // if (specialization) {
  //   request.specialization = {
  //     create: {
  //       specialization
  //     }
  //   }
  // }
  // if (udc) {
  //   request.udc = {
  //     create: {
  //       udc
  //     }
  //   }
  // }
  // if (content) {
  //   request.content = {
  //     create: {
  //       content
  //     }
  //   }
  // }
  return results
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
  contents,
  findResourceBy
}