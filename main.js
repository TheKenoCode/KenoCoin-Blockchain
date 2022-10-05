/** @format */
const SHA256 = require("crypto-js/sha256")

//Block class
class Block {
	constructor(index, timestamp, data, previousHash = "") {
		this.index = index
		this.timestamp = timestamp
		this.data = data
		this.previousHash = previousHash
		this.hash = this.calculateHash()
	}
	//Hashing function
	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				this.timestamp +
				JSON.stringify(this.data)
		).toString()
	}
}

//Blockchain class
class Blockchain {
	//chain constructor
	constructor() {
		this.chain = [this.createGenesisBlock()]
	}
	//Genesis block function
	createGenesisBlock() {
		return new Block(0, "10/04/2022", "Genesis Block", "0")
	}
	//Get the latest block from the chain
	getLatestBlock() {
		return this.chain[this.chain.length - 1]
	}
	//Add a block to the chain
	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash
		newBlock.hash = newBlock.calculateHash()
		this.chain.push(newBlock)
	}
	//Check if a block is valid inside the chain
	isChainValid() {
		//loop through the chain
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i]
			const previousBlock = this.chain[i - 1]

			//if the current block hash doesn't match the hash return false
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false
			}
			//if current block previous hash doesn't match the hash of the previous block return false
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false
			}
		}

		return true
	}
}
//chain instance
let kenoCoin = new Blockchain()
//adding blocks to the chain
kenoCoin.addBlock(new Block(1, "10/04/2022", { amount: 4 }))
kenoCoin.addBlock(new Block(2, "10/04/2022", { amount: 10 }))
kenoCoin.addBlock(new Block(3, "10/04/2022", { amount: 20 }))

console.log("is Blockchain valid? " + kenoCoin.isChainValid())

// kenoCoin.chain[1].data = { amount: 100 }
// kenoCoin.chain[1].hash = kenoCoin.chain[1].calculateHash()
// console.log("is Blockchain valid? " + kenoCoin.isChainValid())

console.log(JSON.stringify(kenoCoin, null, 4))
