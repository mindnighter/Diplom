var express = require('express');
var app = express();
const fs = require('fs');
const pdf = require('pdf-parse');

//thethis
/*
app.get('/', function (req, res) {
  let dataBuffer = fs.readFileSync('./thethis.pdf');

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

    res.send(UDCs);
  });

});
*/
//bakalavr
app.get('/', function (req, res) {
  let dataBuffer = fs.readFileSync('./bakalavr_2.pdf');
  pdf(dataBuffer).then(function (data) {
    //content
    const start = "ВСТУП";
    const end = "СПИСОК ВИКОРИСТАНИХ ДЖЕРЕЛ \n";
    const idxStart = data.text.indexOf(start);
    const idxEnd = data.text.indexOf(end);
    const content = data.text.slice(idxStart+5,idxEnd);
    //name
    const strNameEnd = "(прізвище, ім’я, по батькові)";
    const idxNameEnd = data.text.indexOf(strNameEnd);
    let iter = 5;
    let i = idxNameEnd;
    while(iter>0){

      i--;
     if(data.text[i] == data.text[i].toUpperCase() && data.text[i] != "_" && data.text[i] != " "){
        iter--;
      }
    }
    const idxNameStart = i;
    var re = /_/gi;
    const name = data.text.slice(idxNameStart,idxNameEnd).replace(re,"");
    //direction
    const strDirect = "підготовки";
    const idxDirectStart = data.text.indexOf(strDirect);
    let arr = "";
      for(i = idxDirectStart; i<idxDirectStart+50; i++){
        if(Number.isInteger(parseInt(data.text[i],10)) || data.text[i]=="."){
          //console.log(data.text[i]);
          arr+=(data.text[i]);
        }
      }
    const direction =  arr;
    //supervisor
    const strStartSup = "Керівник";
    const strEndSup = "_";
    const idxStartSup =  data.text.indexOf(strStartSup);
    const featurestr = data.text.slice(idxStartSup);
    const idxEndSup = featurestr.indexOf(strEndSup);
    const idxStartSup2 =  featurestr.indexOf(strStartSup);
    const supervisor = featurestr.slice(idxStartSup2,idxEndSup)

    res.send(supervisor);
   //console.log();
    //res.send(name);
    //res.send(content);
    //res.send(direction);
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


