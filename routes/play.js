var express = require('express');
var util = require('../config/util.js');
const { getMainBnbPoolSize } = require('../web3/web3.js');
var router = express.Router();



router.get('/mainBnbPoolSize', async (req, res) => {
    try {
        // Call the mainBnbPoolSize() function from the smart contract
        const result = await getMainBnbPoolSize();
        res.json({ mainBnbPoolSize: result });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching main BNB pool size' });
    }
});


router.get('/', function(req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function(req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

module.exports = router;