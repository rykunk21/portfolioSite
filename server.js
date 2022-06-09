const express = require('express');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.post('/contact', (req, res) => {
    console.log(req.body)
    // redirect to thank you
})

app.listen(process.env.PORT || '8080', () => {
    console.log(`App listening on port: ${process.env.PORT? process.env.PORT: '8080'}`);

});


