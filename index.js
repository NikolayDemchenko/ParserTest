const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const fs = require("fs");
const nightmare = Nightmare({ show: true });

var urls = require("./URLagrovesti.json");
// var urls = require("./urlsTest.json");


// Настройка выборки
const getData = (html) => {
  let base = [];
  const $ = cheerio.load(html);
  $("article")
    .find("tr")
    .each((i, e) => {
      let org;
      $(e)
        .find("td")
        .each((i, e) => {
          org = { ...org, [nameSelect(i)]: $(e).text() };
        });
      org && base.push(org);
    });
  // console.log("base", base);
  return base;
};
// Выборка наименований
const nameSelect = (index) => {
  switch (index) {
    case 0:
      return "Наименование";
    case 1:
      return "Адрес";
    case 2:
      return "Контакты";
    case 3:
      return "Профиль деятельности";
  }
};
// Метод сохранения
const fileSave=(base)=>{
  fs.writeFile("base.json", JSON.stringify(base), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
// Парсинг
const parse = (url) => {
  return (
    nightmare
      .goto(url)
      .wait("body")
      .evaluate(() => document.querySelector("body").innerHTML)
      // .end()
      .then((resp) => getData(resp))
      .catch((err) => {
        console.log(err);
      })
  );
};

// Рекурсивный парсинг
const parser = async (urls, i, arr) => {
  arr.push(...(await parse(urls[i])));

  if (urls.length > i + 1) {
    return parser(urls, i + 1, arr);
  }
  return arr;
};

// Сохранение данных
(async () => {
  fileSave(await parser(urls, 0, []))
  // console.log("parser :>> ", await parser(urls, 0, []));
})();



