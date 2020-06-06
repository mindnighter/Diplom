const fullResource = `
fragment FullResource on Resource {
  id
  author {
    fullName
  }
  subAuthor {
    fullName
  }
  title {
    title
  }
  direction {
    code
  }
  profession {
    profession
  }
  specialization {
    specialization
  }
  udc {
    udc
  }
}
`

module.exports = {
  fullResource,
}