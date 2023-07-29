const http = require('http');

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Get the URL from the request
    const url = req.url;

    // Set the content type of the response to plain text
    res.setHeader('Content-Type', 'text/plain');

    // Handle different URL routes
    if (url === '/home') {
        res.end('Welcome home');
    } else if (url === '/about') {
        res.end('Welcome to About Us page');
    } else if (url === '/node') {
        res.end('Welcome to my Node Js project');
    } else {
        res.end('Invalid URL');
    }
});

// Start the server and listen on a specific port (e.g., 3000)
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
