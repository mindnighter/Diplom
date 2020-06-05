const fs = require('fs')
const pdf = require('pdf-parse')

function parseBakalavr(path) {
  let dataBuffer = fs.readFileSync(path);
  return pdf(dataBuffer).then(function (data) {
    //content    
    // контен: "В сучасних економічних умовах для успішної конкуренції компаній "
    const start = "ВСТУП \n";
    const end = "СПИСОК ВИКОРИСТАНИХ ДЖЕРЕЛ \n";
    const idxStart = data.text.indexOf(start);
    const idxEnd = data.text.indexOf(end);
    const content = data.text.slice(idxStart + 5, idxEnd);
    //author  
    // тот кто сделал это говно: "Кисельов Юрій Юрійович "
    const regName = new RegExp(/[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{0,}\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,}(\s[А-ЯЮЩЇІЄҐЬ][а-яющїієґь\-]{1,})/);
    const strNameEnd = "(прізвище, ім’я, по батькові)";
    const idxNameEnd = data.text.indexOf(strNameEnd);
    var str = data.text.slice(idxNameEnd - 150, idxNameEnd);
    const author = regName.exec(str);
    //direction
    // направление подготовки (только числа): " 6.050103 "
    const strDirect = "підготовки";
    const idxDirectStart = data.text.indexOf(strDirect);
    let arr = "";
    for (i = idxDirectStart; i < idxDirectStart + 50; i++) {
      if (Number.isInteger(parseInt(data.text[i], 10)) || data.text[i] == ".") {
        arr += (data.text[i]);
      }
    }
    const direction = arr;
    //subAutor
    // дипрук: " к.е.н., доцент Сегеда І.В. "
    const regSup = new RegExp(/[\p{Lu}\.\p{Ll},\s]{1,}/gu);
    const strStartSup = "Керівник";
    const endSup = "(";
    const idxStartSup = data.text.indexOf(strStartSup);
    var strSup = data.text.slice(idxStartSup);
    const idxEndSup = strSup.indexOf(endSup);
    var strSup2 = strSup.slice(9, idxEndSup);
    const subAutor = strSup2.match(regSup).join('').trim();  //regSup.exec(strSup2).join('').trim();

    //title
    // тема: "Автоматизована система розрахунку вартості програмного забезпечення"
    const regTit = new RegExp(/[\p{Lu} \. \- \p{Ll},\s]{1,}/gu);
    const startTit = "тему";
    const endTit = "Виконав";
    const idxStartTit = data.text.indexOf(startTit);
    var strTit = data.text.slice(idxStartTit);
    const idxEndTit = strTit.indexOf(endTit);
    var strTit2 = strTit.slice(5, idxEndTit);
    const title = strTit2.match(regTit).join('').trim();

    return { title, author: author[0], subAutor, direction, content }

  });
}

module.exports = {
  parseBakalavr
}