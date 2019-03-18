var Web3 = require('web3');
var web3 = new Web3('https://ropsten.infura.io/v3/a55fba2fccc0495b97c84c0fed5889b0')
console.log(Web3)

//interacting with Smart Contract
const contractAddress = '0x8750c8259Be6c3eda86C245427c8326B148176BA'
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

var deployedContract = new web3.eth.Contract(contractAbi,contractAddress);
var call = async function(){
    let task = await deployedContract.methods.tasks(0).call()
    console.log(task)
}
call();
//console.log(deployedContract);
