const axios = require ('axios');
const cheerio = require('cheerio');  // new addition


/**
 * 
 * @param {*} url url to scrape
 * @returns HTML of url
 */
async function scrapeWebsite(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    console.log($('title').text()); // gets title of page (name of recipe)

    // prints list of ingredients 
    $("div[class*='ingredient'] li").each(function() {
        console.log($(this).text());
    });

    return $;
}


scrapeWebsite("https://www.allrecipes.com/recipe/275576/easy-air-fryer-pork-chops/").then(result => {
    //console.log(result)
}).catch(err => console.log(err));

console.log('---------');

scrapeWebsite("https://www.recipetineats.com/crispy-pork-belly-banh-mi/#wprm-recipe-container-141765").then(result => {
    //console.log(result)
}).catch(err => console.log(err));