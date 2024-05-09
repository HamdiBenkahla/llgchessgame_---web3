var express = require('express');
var util = require('../config/util.js');
var contractABI = require('../config/abi.json');
var router = express.Router();
const Web3  = require('web3');

const web3 = new Web3('https://bsc-dataseed.binance.org/');


const contractAddress = '0x4691f60c894d3f16047824004420542e4674e621';
const contract = new web3.eth.Contract(contractABI, contractAddress);

router.get('/mainBnbPoolSize', async (req, res) => {
    try {
        // Call the mainBnbPoolSize() function from the smart contract
        const result = await contract.methods.mainBnbPoolSize().call();
        console.log(result);
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