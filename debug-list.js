
const http = require('http');

const url = `http://localhost:5000/api/products`;

console.log(`Fetching ${url}...`);

http.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body length:', data.length);
        try {
            const json = JSON.parse(data);
            console.log('Products count:', Array.isArray(json) ? json.length : (json.data ? json.data.length : 'unknown'));
            if (json.data && Array.isArray(json.data)) {
                console.log('IDs:', json.data.map(p => p._id || p.id));
            } else if (Array.isArray(json)) {
                console.log('IDs:', json.map(p => p._id || p.id));
            } else {
                console.log('Structure:', Object.keys(json));
            }
        } catch (e) {
            console.log('Not JSON');
            console.log(data.substring(0, 500));
        }
    });

}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
