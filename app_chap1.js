var Web3 = require('web3');

//connect to Blockchain 
var url = 'https://mainnet.infura.io/v3/c2415b10ff954998aba574eee89d82b5';
 

//Step1: Read Data from an account via Web3

//instantiate a Web3 object
var web3 = new Web3(url); //see func and properties for web3 obj via console.log

//add from etherscan
var addr = '0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67';

web3.eth.getBalance(addr,(err,bal)=>{
    balance = bal;
    console.log(web3.utils.fromWei(balance,'ether'));
}); //eth object contains lot of func to interact with Ethereum

//Step2 : Create an account using Web3(this one is on main ethereum network)

web3.eth.accounts.create();

//Step3: Connect to a local private ethereum network(can be done via geth as well bute here we use ganache)

var web3_local = new Web3('http://127.0.0.1:8545');

var ganache_addr = '0x342d1cb438ce92d95ddaef01420b1e3ed7f5bd60';
web3_local.eth.getBalance(ganache_addr,(error,balance)=>{
    var balance  = balance;
    console.log(web3_local.utils.fromWei(balance,'ether'));
})