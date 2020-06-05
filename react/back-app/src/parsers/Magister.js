const fs = require('fs')
const pdf = require('pdf-parse')

function parseMagister(path) {
  let dataBuffer = fs.readFileSync(path);
  return pdf(dataBuffer).then(function (data) {
    //content
    // контен: "Загальна політика інформатизації є складовою частиною соціально-економічної  "
    const start = "ВСТУП \n";
    const end = "СПИСОК ВИКОРИСТАНИХ ДЖЕРЕЛ \n";
    const idxStart = data.text.indexOf(start);
    const idxEnd = data.text.indexOf(end);
    const content = data.text.slice(idxStart + 5, idxEnd);

    //author  
    // тот глэк который делал : " Гумінський Артем Миколайович "
    const regName = new RegExp(/[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{0,}\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,}(\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,})/);
    const strNameEnd = "(прізвище, ім’я, по батькові)";
    const idxNameEnd = data.text.indexOf(strNameEnd);
    const str = data.text.slice(idxNameEnd - 150, idxNameEnd);
    const author = regName.exec(str);

    // subAutor
    // дипрук:" к.т.н., доцент  Коваль О.В. "
    const regSup = new RegExp(/[\p{Lu}\.\p{Ll},\s]{1,}/gu);
    const strStartSup = "керівник";
    const endSup = "(";
    const idxStartSup = data.text.indexOf(strStartSup);
    var strSup = data.text.slice(idxStartSup);
    const idxEndSup = strSup.indexOf(endSup);
    var strSup2 = strSup.slice(9, idxEndSup);
    const subAutor = strSup2.match(regSup).join('').trim();  //regSup.exec(strSup2).join('').trim();


    //profession
    //  зі спеціальності : " 122 Комп’ютерні науки "
    const startProf = "зі спеціальності -";
    const endProf = "\n";
    const idxStartProf = data.text.indexOf(startProf);
    const strProf = data.text.slice(idxStartProf);
    const idxEndProf = strProf.indexOf(endProf);
    const profession = strProf.slice(18, idxEndProf);


    //specialization
    // за спеціалізацією : "Комп'ютерний моніторинг та геометричне моделювання процесів і систем"
    const startSpec = "за спеціалізацією -";
    const endSpec = "\n";
    const idxStartSpec = data.text.indexOf(startSpec);
    const strSpec = data.text.slice(idxStartSpec);
    const idxEndSpec = strSpec.indexOf(endSpec);
    const specialization = strSpec.slice(19, idxEndSpec);

    //title
    //тема:" Розробка системи супроводження та аналізу навчального процесу спеціалістів науково-педагогічни"
    const regTit = new RegExp(/[\p{Lu} \. \- \p{Ll},\s]{1,}/gu);
    const startTit = "тему";
    const endTit = "Виконав";
    const idxStartTit = data.text.indexOf(startTit);
    var strTit = data.text.slice(idxStartTit);
    const idxEndTit = strTit.indexOf(endTit);
    var strTit2 = strTit.slice(5, idxEndTit);
    const title = strTit2.match(regTit).join('').trim();

    return { author: author[0], subAutor, specialization, profession, content }
  });
}

module.exports = {
  parseMagister
}