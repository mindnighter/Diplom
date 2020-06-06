const fs = require('fs');
const pdf = require('pdf-parse');
const { fullResource } = require("../fragments/Resource")
const { parseThethis } = require("../parsers/Thethis")
const { parseMagister } = require("../parsers/Magister")
const { parseBakalavr } = require("../parsers/Bakalavr")

function postResource(parent, args, context, info) {
  const { author, subAuthor, title, direction, profession, specialization, udc, content } = args

  return context.prisma.createResource({
    author: {
      create: {
        fullName: author
      }
    },
    subAuthor: {
      create: {
        fullName: subAuthor
      }
    },
    title: {
      create: {
        title
      }
    },
    direction: {
      create: {
        code: direction
      }
    },
    profession: {
      create: {
        profession
      }
    },
    specialization: {
      create: {
        specialization
      }
    },
    udc: {
      create: {
        udc
      }
    },
    content: {
      create: {
        content
      }
    }
  }).$fragment(fullResource)
}

async function createTheFile(file) {
  return new Promise(resolve => {
    //ToDo remove file from this, understand why 
    const { createReadStream, filename, mimetype } = file

    const readFileStream = createReadStream()
    const readWriteStream = fs.createWriteStream(`./uploadedFiles/${filename}`)
    readFileStream.pipe(readWriteStream)
    readWriteStream.on('finish', () => {
      resolve()
    })
  })
}

function singleUpload(parent, args, context, info) {
  return args.file.then(async file => {
    await createTheFile(file)
    const { createReadStream, filename, mimetype } = file

    //TODO rewrite
    let result
    if (args.type == "THETHIS") {
      result = await parseThethis(`./uploadedFiles/${filename}`)
    } else if (args.type == "BAKALAVR") {
      result = await parseBakalavr(`./uploadedFiles/${filename}`)
    } else if (args.type == "MAGISTER") {
      result = await parseMagister(`./uploadedFiles/${filename}`)
    }
    const { author, subAuthor, title, direction, profession, specialization, udc, content } = result
    const request = {}
    if (author) {
      request.author = {
        create: {
          fullName: author
        }
      }
    }
    if (subAuthor) {
      request.subAuthor = {
        create: {
          fullName: subAuthor
        }
      }
    }
    if (title) {
      request.title = {
        create: {
          title
        }
      }
    }
    if (direction) {
      request.direction = {
        create: {
          code: direction
        }
      }
    }
    if (profession) {
      request.profession = {
        create: {
          profession
        }
      }
    }
    if (specialization) {
      request.specialization = {
        create: {
          specialization
        }
      }
    }
    if (udc) {
      request.udc = {
        create: {
          udc
        }
      }
    }
    if (content) {
      request.content = {
        create: {
          content
        }
      }
    }
    await context.prisma.createResource({ ...request }).$fragment(fullResource)

    return file;
  });
}

module.exports = {
  postResource,
  singleUpload
}