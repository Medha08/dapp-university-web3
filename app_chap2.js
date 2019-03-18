
//web3.eth.contract creates an abstraction of SmartContract in JS(representaion of SC in JS) to call functions of SC 
//as SC written in Solidity (completely diff from JS) and are compiled to bytecode  -> executed on EVM  
// to interact that SmartContract  on EVM on the Ethereum Node we must know the Contract Interface(kinds of func , what can we call) ie ABI(JSON file that shows what the contract does and other info) and address

//Connect to Ethereum mainnet
var Web3 = require('web3');
var url = 'https://mainnet.infura.io/v3/c2415b10ff954998aba574eee89d82b5';

var web3 = new Web3(url);

// Create instance of Smart Contract in web3 ie JS Representation of SC

var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"tokenSupply","type":"uint256"}],"name":"SetupToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"adr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
var contractAddress = '0xA3aBD91bE613B61a2ef979C590Db608b012A5867';

//Get connection to SC with Web3 ie create instance of SC in web3  to further call functions of SC

var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract.methods);//methods that this contract responds to
console.log(contract.methods.name());//returns function name but doesn't call it 
var call = async function (){
    try {
        // let val = await contract.methods.name().call()
        // let symb = await contract.methods.symbol().call()
        // let totalSupply = await contract.methods.totalSupply().call()
        let accHolder = '0x21b5d2ac7a67aa18fb197df41137d2f74f035776' //address from etherscan under holders
        let [val, symb,totalSupply,balance] = await Promise.all([contract.methods.name().call(), contract.methods.symbol().call(),contract.methods.totalSupply().call(), contract.methods.balanceOf(accHolder).call()]);
        console.log(val,symb,totalSupply,balance);
      }catch(err) {
        console.log(err)
      }// calling a function,returns a promise but not value as it is async call to read value pass callback function
}

call();
