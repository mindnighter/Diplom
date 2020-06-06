const fs = require('fs')
const pdf = require('pdf-parse')

function parseThethis(path) {
  let dataBuffer = fs.readFileSync(path);
  const regUDC = new RegExp(/\nУДК /gu)

  return pdf(dataBuffer).then(function (data) {
    const works = data.text.split(regUDC)
    const UDCs = []
    const author = []
    const subAuthor = []
    const title = []
    const content = []

    const regSpace = ' '
    const regEnter = '\n'
    const regSmallLetter = new RegExp(/\p{Ll}/gu)
    const regInitials = new RegExp(/\p{Lu}\.\p{Lu}\./gu)
    const regAllUpperLetterInWord = new RegExp(/\p{Lu}\s{0,}\n\p{Lu}(\p{Ll}{1,}|\s)/gu)
    regAllUpperLetterInWord.lastIndex = 0;
    const regFirstContentWord = new RegExp(/(^|\s)\p{Lu}(\p{Ll}{1,}|\s)/gu)

    for (let i = 2; i < works.length; i++) {
      const workSplittedSpace = works[i].split(regSpace)
      const workSplittedEnter = works[i].split(regEnter)

      UDCs.push(workSplittedSpace[0].trim())
      author.push(workSplittedEnter[1].trim())
      subAuthor.push(workSplittedEnter[2].trim())

      const enterTitlePart = []
      for (let j = 3; !regSmallLetter.test(workSplittedEnter[j]) && j < workSplittedEnter.length; j++) {
        enterTitlePart.push(workSplittedEnter[j])
      }
      title.push(enterTitlePart.join('').trim())

      const start = regAllUpperLetterInWord;
      const end = "Перелік посилань";
      const idxStart = works[i].search(start);
      const idxEnd = works[i].indexOf(end);
      content.push(works[i].slice(idxStart + 1, idxEnd));
    }
    const res = []
    for (let i = 0; i < author.length; i++) {
      res.push({
        author: author[i],
        author: subAuthor[i],
        title: title[i],
        udc: UDCs[i],
        content: content[i]
      })
    }

    return res
  })
}

module.exports = {
  parseThethis
}