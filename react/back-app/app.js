var express = require('express');
var app = express();
const fs = require('fs');
const pdf = require('pdf-parse');

//thethis
app.get('/', function (req, res) {
  let dataBuffer = fs.readFileSync('./1.pdf');

  const regUDC = new RegExp(/\nУДК /gu)

  pdf(dataBuffer).then(function (data) {
    const works = data.text.split(regUDC)

    const UDCs = []
    const author = []
    const subAuthor = []
    const title = []

    const regSpace = ' '
    const regEnter = '\n'
    const regSmallLetter = new RegExp(/\p{Ll}/gu)
    const regInitials = new RegExp(/\p{Lu}\.\p{Lu}\./gu)
    const regAllUpperLetterInWord = new RegExp(/(^|\s)\p{Lu}{1,}/gu)
    regAllUpperLetterInWord.lastIndex = 1;
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
    }

    res.send(author);
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


