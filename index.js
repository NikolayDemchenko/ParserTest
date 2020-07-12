const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const fs = require("fs");
const nightmare = Nightmare({ show: true });

// var urls = require("./URLagrovesti.json");
var urls = require("./urlsTest.json");

// console.log('urls', urls)

// const url =
//   "https://agrovesti.net/lib/regionals/region-22/perechen-krupnejshikh-selskokhozyajstvennykh-i-pererabatyvayushchikh-predpriyatij-altajskogo-kraya.html/";

let allBase = [];
urls.forEach((url) => {
  // console.log('url', url)
  nightmare
  .goto(url)
  .wait("body")
  .evaluate(() => document.querySelector("body").innerHTML)
  .end()
  .then((resp) => {
    getData(resp);
  }).then(() => {
    console.log("Ну охуеть теперь!");
  })
  .catch((err) => {
    console.log(err);
  });
  let base = [];

  const getData = (html) => {
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
      console.log("base", base);
  };
  base && allBase.push(...base);
});

//  fs.writeFile("base.json", JSON.stringify(allBase), (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });

// console.log("allBase :>> ", allBase);
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
