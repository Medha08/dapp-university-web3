//can unlock an account before using personal (web3.eth.personal.unlockAccount) so no need to sign every transaction 
//but if you don't want to trust the eth node or want the node it to have access to any account or key store files and want to have account local ie private keys etc ie 
//you want to sign txn locally then you sign each transaction before sending.

//Step2 Using web3 Create a transaction, Sign and send transaction and broadcast to the network
var Tx = require('ethereumjs-tx')//library used to sign the trxn that we will broadcast to ethereum network
const Web3 = require('web3')
//Infura holding remote node and we don;t want to give access of our account to infura thus we sign and broadcast these txns locally using web3
const web3 = new Web3('https://ropsten.infura.io/v3/a55fba2fccc0495b97c84c0fed5889b0')


// create accounts via web3 or metamask gui

// var account3 = web3.eth.accounts.create().address;
// var account4 = web3.eth.accounts.create().address;

var account1 = '0x06CEAc90b1B1ff32b5e709E29F31443daB03aA8C'

var account2 = '0xdeeF8ADDDa586f61267Bb0f63FA1AbB341080DD6'

//F3FE6A7F97585471D9D24C817F791118531009D87FEEA34F8D135547DBDC5C65 //acc2
//AA9FE128FE6CDAB44B2CBF0E9436B9CC2A34AA361D994C0E1D7B83F06D93CF53 //acct1

//Save private keys in env varies

//export PRIVATE_KEY_1=web3.eth.accounts.create().privateKey;// or enter directly in node console;shell doesn't like extra space along side =
// export PRiVATE_KEY_2=web3.eth.accounts.create().privateKey;
//console.log(process.env.PRIVATE_KEY1,process.env.PRIVATE_KEY2);//in console echo $PRIVATE_KEY1 or echo $PRIVATE_KEY2


const privateKey1= Buffer.from(process.env.PRIVATE_KEY1,'hex');//convert private key to string of binary data
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY2,'hex');

web3.eth.getBalance(account1,(err,bal)=>{
    console.log("Account1 balance",web3.utils.fromWei(bal,'ether'))
})

web3.eth.getBalance(account2,(err,bal)=>{
    console.log("Account2 balance",web3.utils.fromWei(bal,'ether'))
})



//Build a transaction to be sent to ethereum BC with a function call that sends a Signed transaction

//web3.eth.getTransactionCount(account1,(err,txCount)=>{
web3.eth.getTransactionCount(account1).then(_nonce => {
    //Build the transaction
    const txObject = {
        nonce:'0x'+_nonce.toString(16),//web3.utils.toHex(txCount),//account's txn count ;accounts's prevents double spend
        to:account2,
        value:web3.utils.toHex(web3.utils.toWei('0.1','ether')),
        gasLimit: 1000000,//web3.utils.toHex(21000),
        gasPrice:100000//web3.eth.gasPrice//web3.utils.toHex(web3.utils.toWei('10','gwei')) //*solved the issue 0x910266f8e995e2c1fe50ed68f4f8165f06f7583b97f27c9066d2de9c6444001f txn hash
    }
    //console.log(txObject);
    // //Sign the transaction // from field irrelevant as we are signing with private key and public key is representn of our private key so no need of from
    const tx = new Tx(txObject)//create Txn Object
    tx.sign(privateKey1) //Sign it

    //console.log(tx);

    const serializedTransaction = tx.serialize()
    const raw = '0x'+ serializedTransaction.toString('hex');
    
    console.log("raw",raw);
    var call = async function (){
        try {
    // Broadcast the transaction
      await web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
         console.log("txHash",txHash);
      })}catch(err) {
        console.log(err)
      }
    }//expectes a signed transaction
    call();
    web3.eth.getBalance(account1,(err,bal)=>{
        console.log("Account1 balance",web3.utils.fromWei(bal,'ether'))
    })
    
    web3.eth.getBalance(account2,(err,bal)=>{
        console.log("Account2 balance",web3.utils.fromWei(bal,'ether'))
    })
})
