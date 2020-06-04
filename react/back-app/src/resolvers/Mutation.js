const fs = require("fs")
const { fullResource } = require("../fragments/Resource")

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

function singleUpload(parent, args, context, info) {
  return args.file.then(file => {
    const { createReadStream, filename, mimetype } = file

    const fileStream = createReadStream()

    fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))

    return file;
  });
}
module.exports = {
  postResource,
  singleUpload
}