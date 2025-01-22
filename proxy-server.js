const express = require('express');
const axios = require('axios');
const app = express();

// Set headers for the stream request
app.get('/stream', async (req, res) => {
    const url = req.query.url;  // Get the stream URL from query parameter
    if (!url) {
        return res.status(400).send('Missing stream URL parameter');
    }

    try {
        // Get the stream from the original URL with custom headers
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'YourCustomUserAgent',  // Your custom User-Agent
                'Referer': 'https://www.aparatchi.com',  // Add the Referer header if needed
            },
            responseType: 'stream',  // Stream the response
        });

        // Pipe the stream from the source to the client (your TV)
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
