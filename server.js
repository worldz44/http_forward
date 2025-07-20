const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy WebSocket requests
app.use("/", createProxyMiddleware({
  target: 'https://13.53.129.70', // IP address of your Xray server
  changeOrigin: true,
  ws: true, // Enable WebSocket
  secure: false, // disable SSL verification (in case you're using self-signed certificates)
  headers: {
    host: 'm.youtube.com', // The SNI you're using in Xray
  },
  pathRewrite: {
    '^/': '/', // Ensure the path is correctly rewritten
  },
}));

app.listen(8080, () => {
  console.log('WebSocket proxy listening on port 8080');
});
