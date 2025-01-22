const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Serve the HTML page (index.html) when the base URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Ensure 'index.html' is in the same directory as the server
});

// Serve the stream with custom headers
app.get('/stream', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing stream URL parameter');
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'YourCustomUserAgent',
                'Referer': 'https://www.aparatchi.com',
            },
            responseType: 'stream',
        });

        // Pipe the stream to the response
        response.data.pipe(res);

    } catch (error) {
        console.error('Error fetching stream:', error);
        res.status(500).send('Error fetching stream');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});
