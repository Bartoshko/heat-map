const express = require('express');

const app = express();

app.use('/public', express.static('static'));

app.get('/', (req, res) => {
	const options = {
    root: __dirname + '/static/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  }
	res.sendFile('index.html', options);
});

app.listen(8080, () => {
	console.log('Server is running on: http://localhost:8080');
});

