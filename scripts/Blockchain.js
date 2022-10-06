/** @format */

const Block = require("./Block.js")
// import * as Block from "./Block.js"
const blockIndex = require("./main.js")

//Block class

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
		blockIndex + 1
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
module.exports = Blockchain
