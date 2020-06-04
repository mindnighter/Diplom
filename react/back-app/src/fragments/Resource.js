const fullResource = `
fragment FullResource on Resource {
  id
  author {
    id
    fullName
  }
  subAuthor {
    id
    fullName
  }
  title {
    id
    title
  }
  direction {
    id
    code
  }
  profession {
    id
    profession
  }
  specialization {
    id
    specialization
  }
  udc {
    id
    udc
  }
  content {
    id
    content
  }
}
`

module.exports = {
  fullResource,
}