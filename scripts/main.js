/** @format */

const Blockchain = require("./Blockchain.js")
const Block = require("./Block.js")
//chain instance
let kenoCoin = new Blockchain()

//adding blocks to the chain
kenoCoin.addBlock(new Block(1, "10/04/2022", 4))
kenoCoin.addBlock(new Block(2, "10/04/2022", 10))
kenoCoin.addBlock(new Block(3, "10/04/2022", 20))
kenoCoin.addBlock(new Block(4, "10/04/2022", 20))
let newBlockButton = document.getElementById("createNewBlockButton")
newBlockButton.onclick = function () {
	kenoCoin.addBlock(new Block(6, "10/04/2022", 4))
	console.log("I was clicked")
}

let Container = document.getElementById("grid-container")
var arr = []
for (key in kenoCoin) {
	arr.push(Object.assign(kenoCoin[key], { index: key }))
}
const mappedBlocks = kenoCoin.chain.map((block, index) => {
	return `<div id="block" key=${index}>

        <p id="index">Index: ${block.index}</p>

    <p id="timeStamp"><span>Timestamp:</span> ${block.timeStamp}</p>
    <p id="data"><span>Data:</span> ${block.data}</p>
    <p id="previousHash"><span>prevHash:</span> ${block.previousHash}</p>
    <p id="hash"><span>hash:</span> ${block.hash}</p>
    <img src="./assets//link.png" />

</div>`
})

Container.innerHTML = mappedBlocks

console.log(kenoCoin.chain)
console.log(mappedBlocks)
