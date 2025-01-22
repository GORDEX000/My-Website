const express = require('express');
const axios = require('axios');
const app = express();

app.get('/stream', async (req, res) => {
    const url = req.query.url;  // Get the URL from the query parameter

    if (!url) {
        return res.status(400).send('Missing stream URL parameter');
    }

    try {
        // Adding headers with Authorization token or Referer as needed
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'YourCustomUserAgent',  // Custom user agent if needed
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',  // Add your token here if necessary
                'Referer': 'https://www.aparatchi.com',  // Ensure this header is correct for the stream
            },
            responseType: 'stream',
        });

        // Set content-type for HLS streams
        res.setHeader('Content-Type', 'application/x-mpegURL');  // For .m3u8 streams
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching stream:', error);
        res.status(500).send('Error fetching stream');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
