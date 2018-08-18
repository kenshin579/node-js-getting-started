const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');

// CONNECT TO MONGODB SERVER
MONGODB_URI='mongodb://heroku_vfwj5vcl:spb8kerqhucborfd974cdbiqe8@ds125862.mlab.com:25862/heroku_vfwj5vcl'
mongoose.connect(MONGODB_URI);

// DEFINE MODEL
const Timers = require('./models/timer');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/timers', (req, res) => {
        Timers.find((err, timers) => {
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(timers);
        })
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
