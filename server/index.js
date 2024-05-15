"use strict";
const axios = require ('axios');
const cheerio = require('cheerio');  // new addition
const express = require('express');
const { get } = require('jquery');
const PORT = 8000;
const puppeteer = require('puppeteer');
const app = express();


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
    return $("div[class*='ingredient'] li").text();
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
    console.log(stepsArr);
    return stepsArr;
}

getDirections("https://www.allrecipes.com/recipe/275576/easy-air-fryer-pork-chops/");
app.get('/title', function(req,res) {
    getTitle("https://www.allrecipes.com/recipe/275576/easy-air-fryer-pork-chops/").then(result => {
    res.send(result);
}).catch(err => console.log(err));
})

app.get('/ingredients', function(req,res) {
    getIngredients("https://www.allrecipes.com/recipe/275576/easy-air-fryer-pork-chops/").then(result => {
    res.send(result);
}).catch(err => console.log(err));
})


app.get('directions', function(req,res) {
  getDirections("https://www.recipetineats.com/crispy-pork-belly-banh-mi/#wprm-recipe-container-141765").then(result => {
    res.send(result);
}).catch(err => console.log(err));

})


//app.listen(PORT, () => console.log('App available on http://localhost:3000'))