//how to broadcast a transaction manually via web3 and what happens when a transaction is created

//writes data on BC triggers txn, cost gas and change state of blockchain

//Step1: start ganache(local in memory BC)
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');
const acc1 = '0xe963a7128e58ceaa3f97efe10577f02996888206'
const acc2 = '0x3ae6ef047e70676595688c6434053843008112a7'

//check balance  all accounts come unlocked on ganache no need to sign
web3.eth.getBalance(acct1,(err,result)=> { console.log(result)});

//send ether to account 2 
web3.eth.sendTransaction({from: acct1, to: acct2, value: web3.utils.toWei('1','ether')})

//check balance of acc1
web3.eth.getBalance(acct1,(err,result)=> { console.log(result)});

//check balance of acc2 
web3.eth.getBalance(acct2,(err,result)=> { console.log(result)});




