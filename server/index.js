const fetch = require('node-fetch');
const express = require('express');
const PORT = 8000;
const app = express();
const cors = require('cors');
const token = require('./config.js');
app.use(cors());
app.use(express.json());

var url = 'https://api.diffbot.com/v3/analyze?token=' + token.diffbotToken+ '&url=';
const options = {method: 'GET', headers: {accept: 'application/json'}};

async function getPage(page) {
  const urlWithPage = url + page; // Assuming `url` is defined elsewhere
  try {
    const response = await fetch(urlWithPage, options);
    const json = await response.json();
    return json; // Return the parsed JSON
  } catch (err) {
    console.error('Error:', err);
    throw err; // Rethrow the error to handle it in the calling function
  }
}
async function getInfo(page) {
  const urlWithPage = url + page; // Assuming `url` is defined elsewhere
  try {
    const response = await fetch(urlWithPage, options);
    const json = await response.json();
    const info = {
      title: json.objects[0].title,
      ingredients: json.objects[0].ingredients,
      servings : json.objects[0].servings,
      instructions : json.objects[0].instructions,
      notes: json.objects[0].notes,
      nutrition: json.objects[0].nutrition,
      recipe: json.objects[0].recipe,
      time: json.objects[0].time,
      prep: json.objects[0].prep,
      cook: json.objects[0].cook,
      total: json.objects[0].total
      }
    return info; // Return the parsed JSON
  } catch (err) {
    console.error('Error:', err);
    throw err; // Rethrow the error to handle it in the calling function
  }
}

app.get('/', async(req,res)=> {
  try {
    const result = await getInfo('https://www.recipetineats.com/honey-mustard-baked-chicken-drumsticks/#wprm-recipe-container-29187');
    console.log(result); // This should now log the fetched JSON
    res.send(result); // Send the result as the response
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the page');
  }
})


app.listen(PORT, () => console.log('App available on http://localhost:8000'))