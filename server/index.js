"use strict";
const axios = require ('axios');
const cheerio = require('cheerio');  // new addition
const express = require('express');
const PORT = 8000;
const app = express();

/**
 * 
 * @param {*} url url to scrape
 * @returns title of page
 */
async function getTitle(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    console.log($('h1').text()); // prints title of page (name of recipe)
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
    // prints list of ingredients 
    $("div[class*='ingredient'] li").each(function() {
       console.log($(this).text());
    });
    return $("div[class*='ingredient'] li").text();
}
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

console.log('---------');

getTitle("https://www.recipetineats.com/crispy-pork-belly-banh-mi/#wprm-recipe-container-141765").then(result => {
    //console.log(result)
}).catch(err => console.log(err));

app.listen(PORT, () => console.log('App available on http://localhost:3000'))