"use strict";
const axios = require ('axios');
const cheerio = require('cheerio');  // new addition
const express = require('express');
const PORT = 8000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


/**
 * 
 * @param {*} url url to scrape
 * @returns title of page
 */
async function getTitle(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('h1').text();
}
/**
 * 
 * @param {*} url url to scrape
 * @returns ingredients of recipe
 */
async function getIngredients(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ingredientArr = [];
    let ingredients = $("div[class*='ingredient'] li");
    ingredients.each(function() {
      ingredientArr.push($(this).text().replaceAll('\n',''));
    })
    return ingredientArr;
}

async function getDirections(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Select all text & list items within div elements with class containing "steps", "directions", or "instructions",
    let steps = $('div[class*="steps"] p, div[class*="directions"] p, div[class*="instructions"] p, div[class*="steps"] li, div[class*="directions"] li, div[class*="instructions"] li');
    
    const stepsArr = [];
    steps.each(function() {
      if (!$(this).text().includes('img')) {
        stepsArr.push($(this).text().replaceAll('\n', ''));
      }

    })
    return stepsArr;
}

app.get('/', (req,res)=> {
  getIngredients("https://www.recipetineats.com/crispy-pork-belly-banh-mi/#wprm-recipe-container-141765").then(result => {
  res.send(result);
}).catch(err => console.log(err));}
)
app.post('/name', async(req,res) => {
    let url = req.body.url;
    console.log('here');
    await getTitle(url).then(result => {
    res.send(result);
}).catch(err => console.log(err));
})

app.post('/ingredients', async(req,res)  =>{
  let url = req.body.url;
  await getIngredients(url).then(result => {
    res.send(result);
}).catch(err => console.log(err));
})


app.post('/directions', async(req,res) => {
  let url = req.body.url;
  await getDirections(url).then(result => {
    res.send(result);
}).catch(err => console.log(err));

})


app.listen(PORT, () => console.log('App available on http://localhost:8000'))