
const fetch = require('node-fetch'); // Assuming node-fetch might be available or I can use native fetch if node version is high enough. 
// actually, let's use standard http if we are not sure about node-fetch.
// But wait, this is a react project, so I can't easily run a node script that uses 'fetch' unless node 18+.
// Let's assume node 18+ or use http.

const http = require('http');

const id = '69243619a411ac9080067b95';
const url = `http://localhost:5000/api/products/${id}`;

console.log(`Fetching ${url}...`);

http.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body:');
        console.log(data);
    });

}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
