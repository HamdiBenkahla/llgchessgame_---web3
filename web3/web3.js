var contractABI = require('../config/abi.json');

const Web3  = require('web3');

const web3 = new Web3('https://bsc-dataseed.binance.org/');//connect to bsc node

const contractAddress = '0x4691f60c894d3f16047824004420542e4674e621';
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getMainBnbPoolSize() {
    try {
        const result = await contract.methods.mainBnbPoolSize().call();
        return result;
    } catch (error) {
        throw new Error('Error fetching main BNB pool size');
    }
}

module.exports = { getMainBnbPoolSize };