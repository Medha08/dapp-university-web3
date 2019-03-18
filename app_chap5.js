var Web3 = require('web3')
var web3 = new Web3('https://ropsten.infura.io/v3/a55fba2fccc0495b97c84c0fed5889b0')
var Tx = require('ethereumjs-tx')
//Interacting with the deployed Smart Contract
var account1 = '0x06CEAc90b1B1ff32b5e709E29F31443daB03aA8C'
var account2 = '0xdeeF8ADDDa586f61267Bb0f63FA1AbB341080DD6'

const privateKey1= Buffer.from(process.env.PRIVATE_KEY1,'hex');//convert private key to string of binary data
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY2,'hex');
const contractAddress = '0xfd860b55e113e27cb76036f917f43aae36788e6b' //error: Failed to decode output: TypeError: Cannot read property 'length' of undefined due to incorrect deployment gas issue needs fix
const contractAbi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTask",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_content",
				"type": "string"
			},
			{
				"name": "_author",
				"type": "string"
			}
		],
		"name": "createTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "content",
				"type": "string"
			},
			{
				"name": "author",
				"type": "string"
			},
			{
				"name": "done",
				"type": "bool"
			},
			{
				"name": "dateCompleted",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTaskIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "toggleDone",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTaskFixtures",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "date",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "author",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "done",
				"type": "bool"
			}
		],
		"name": "CreateTask",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "done",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "TaskStatusToggled",
		"type": "event"
	}
]

//initiate a new Web3 contract (abstraction of SC or JS representation of our contract)
const deployedContract = new web3.eth.Contract(contractAbi,contractAddress)

const data =  deployedContract.methods.createTask("Complete HomeWork","Medha").encodeABI()//hexadecimal encoded representation of actual function and it's argumnets which txn understands

//Create Txn Object
web3.eth.getTransactionCount(account1).then(_nonce =>{
    const txObject ={
        nonce:'0x'+_nonce.toString(16),
        gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to:contractAddress,//sending the txn to SC addr
        data: data//hexadecimal encoded representation of actual function name of SCthat we are trying to call along with function arguments that function requires to send the txn 
        //we get the data that represent SC func with web3 by get(ting an abstrantion of SC ie web3 gives us a way to read the data the func req to generate the txn 
        //as we have abi and address now we want to find the func(as we have abi so we know all function and we know where is the contract via addr) we want to call and convert it into data that this txn can understand
    }
    //Sign a Txn
    var tx = new Tx(txObject)
    tx.sign(privateKey1)
    
    const serializedTxn= tx.serialize()
    const raw = "0x"+ serializedTxn.toString('hex')//serialises to raw signed txn after signing
    //Broadcast the Txn
    var call = async function (){
        try {
            await web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
                console.log("txHash",txHash);
            })}catch(err) {
            console.log(err)
            }
        }//expects a signed transaction
        
        call().then(call2);
})

var call2 = async function(){
    let task = await deployedContract.methods.tasks(0).call()
    console.log(task)
}


