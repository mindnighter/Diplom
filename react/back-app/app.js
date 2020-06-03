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
/* app.get('/', function (req, res) {
  let dataBuffer = fs.readFileSync('./bakalavr_2.pdf');
  pdf(dataBuffer).then(function (data) {
    //content
    const start = "ВСТУП \n";
    const end = "СПИСОК ВИКОРИСТАНИХ ДЖЕРЕЛ \n";
    const idxStart = data.text.indexOf(start);
    const idxEnd = data.text.indexOf(end);
    const content = data.text.slice(idxStart+5,idxEnd);
    //author  
    const regName = new RegExp(/[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{0,}\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,}(\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,})/);
    const strNameEnd = "(прізвище, ім’я, по батькові)";
    const idxNameEnd = data.text.indexOf(strNameEnd);
    var str = data.text.slice(idxNameEnd-150, idxNameEnd);
    const author = regName.exec(str);
    //direction
    const strDirect = "підготовки";
    const idxDirectStart = data.text.indexOf(strDirect);
    let arr = "";
      for(i = idxDirectStart; i<idxDirectStart+50; i++){
        if(Number.isInteger(parseInt(data.text[i],10)) || data.text[i]=="."){
          arr+=(data.text[i]);
        }
      }
    const direction =  arr;
    //subAutor
    const regSup = new RegExp(/[\p{Lu}\.\p{Ll},\s]{1,}/gu);
    const strStartSup = "Керівник";
    const endSup = "(";
    const idxStartSup =  data.text.indexOf(strStartSup);
    var strSup = data.text.slice(idxStartSup);
    const idxEndSup = strSup.indexOf(endSup );
    var strSup2 = strSup.slice(9,idxEndSup);
    const subAutor =strSup2.match(regSup).join('').trim();  //regSup.exec(strSup2).join('').trim();

    //title
    const regTit = new RegExp(/[\p{Lu} \. \- \p{Ll},\s]{1,}/gu);
    const startTit = "тему";
    const endTit = "Виконав";
    const idxStartTit =  data.text.indexOf(startTit);
    var strTit = data.text.slice(idxStartTit);
    const idxEndTit = strTit.indexOf(endTit );
    var strTit2 = strTit.slice(5,idxEndTit);
    const title =strTit2.match(regTit).join('').trim();
    //res.send(title);
    res.send(subAutor);
    //res.send(author[0]);
    //res.send(content);
    //res.send(direction);
  });
});
 */
//magisters
app.get('/', function (req, res) {
  let dataBuffer = fs.readFileSync('./magistr_2.pdf');
  pdf(dataBuffer).then(function (data) {
    //content
    const start = "ВСТУП \n";
    const end = "СПИСОК ВИКОРИСТАНИХ ДЖЕРЕЛ \n";
    const idxStart = data.text.indexOf(start);
    const idxEnd = data.text.indexOf(end);
    const content = data.text.slice(idxStart+5,idxEnd);

    //author  
    const regName = new RegExp(/[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{0,}\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,}(\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,})/);
    const strNameEnd = "(прізвище, ім’я, по батькові)";
    const idxNameEnd = data.text.indexOf(strNameEnd);
    const str = data.text.slice(idxNameEnd-150, idxNameEnd);
    const author  = regName.exec(str);

    // subAutor
    const regSup = new RegExp(/[\p{Lu}\.\p{Ll},\s]{1,}/gu);
    const strStartSup = "керівник";
    const endSup = "(";
    const idxStartSup =  data.text.indexOf(strStartSup);
    var strSup = data.text.slice(idxStartSup);
    const idxEndSup = strSup.indexOf(endSup );
    var strSup2 = strSup.slice(9,idxEndSup);
    const subAutor =strSup2.match(regSup).join('').trim();  //regSup.exec(strSup2).join('').trim();
    

    //profession
    const startProf = "зі спеціальності -";
    const endProf = "\n";
    const idxStartProf = data.text.indexOf(startProf);
    const strProf =  data.text.slice(idxStartProf);
    const idxEndProf = strProf.indexOf(endProf);
    const profession = strProf.slice(18,idxEndProf);
    

    //specialization
    const startSpec = "за спеціалізацією -";
    const endSpec = "\n";
    const idxStartSpec = data.text.indexOf(startSpec);
    const strSpec =  data.text.slice(idxStartSpec);
    const idxEndSpec = strSpec.indexOf(endSpec);
    const specialization = strSpec.slice(19,idxEndSpec);

    //title
    const regTit = new RegExp(/[\p{Lu} \. \- \p{Ll},\s]{1,}/gu);
    const startTit = "тему";
    const endTit = "Виконав";
    const idxStartTit =  data.text.indexOf(startTit);
    var strTit = data.text.slice(idxStartTit);
    const idxEndTit = strTit.indexOf(endTit );
    var strTit2 = strTit.slice(5,idxEndTit);
    const title =strTit2.match(regTit).join('').trim();
    res.send(title);
    //res.send(subAutor);
    //res.send(profession);
    //res.send(specialization);
    //res.send(author[0]);
    //res.send(content);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


