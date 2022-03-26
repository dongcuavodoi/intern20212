import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://rapidapi.com'})

var options = {
  method: 'GET',
  url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
  headers: {
    'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
    'x-rapidapi-key': 'da6e3f3cbdmsh556c57bfb493b75p1bdb27jsn15b95419cc8c'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


export {api}