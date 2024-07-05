// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create an instance of express
const app = express();

// Implementing CORS
const corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the root URL to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to interact with the Shazam API
app.post('/search', async (req, res) => {
    const { term } = req.body; // Get search term from request body

    if (!term) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: { term, locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'x-rapidapi-key': process.env.SHAZAM_API_KEY,
            'x-rapidapi-host': 'shazam.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Shazam API' });
    }
});

// Define a port number
const PORT = 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

