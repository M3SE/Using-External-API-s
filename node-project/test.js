const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: { term: 'test', locale: 'en-US', offset: '0', limit: '5' },
    headers: {
        'x-rapidapi-key': process.env.SHAZAM_API_KEY,
        'x-rapidapi-host': 'shazam.p.rapidapi.com'
    }
};

axios.request(options)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
