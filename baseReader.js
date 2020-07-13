var companies = require("./base.json");


// const farm = companies.filter((comp) => {
//    return comp["Профиль деятельности"]&&comp["Профиль деятельности"].match(/растениеводство/ig);
// });

const farm = companies.filter((comp) => {
   return comp["Адрес"]&&comp["Адрес"].match(/Воронежская/ig);
});

farm.forEach((farm) => console.log("farm :>> ", farm));

console.log("Количество предприятий :>> ", farm.length);
