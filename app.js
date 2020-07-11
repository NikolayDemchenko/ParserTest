const cheerio = require("cheerio");
const axios = require("axios");

async function makeGetRequest() {
  let res = await axios.get(
    "https://agrovesti.net/lib/regionals/region-22/perechen-krupnejshikh-selskokhozyajstvennykh-i-pererabatyvayushchikh-predpriyatij-altajskogo-kraya.html/"
  );

  let $ = cheerio.load(res.data);

  $("tr").each( (i, e)=> {  
    console.log(i,$(e).text());
  });

  // $("tr").find("td").each( (i, e)=> {  
  //   console.log(i,$(e).text());
  // });
}

makeGetRequest();