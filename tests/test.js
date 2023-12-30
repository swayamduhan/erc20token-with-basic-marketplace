const { assert, expect } = require("chai")
const { ethers } = require("hardhat");
const { assertHardhatInvariant } = require("hardhat/internal/core/errors");

describe("Degen Token", function(){
    let degen;
    let tokenBalance;
    let owner;
    let player1;
    let player2;
    beforeEach(async()=>{
        [owner, player1, player2] = await ethers.getSigners()
        const DegenToken = await ethers.getContractFactory("DegenToken")
        degen = await DegenToken.deploy()
        await degen.deployed()
    })

    it("should mint tokens", async function(){
        const TxResponse = await degen.mint(owner.address, 100000)
        await TxResponse.wait()
        // Get the token balance of user
        tokenBalance = await degen.balanceOf(owner.address)
        assert(tokenBalance.toString(), "100000")
    })

    describe("further implementations after minting", function(){
        beforeEach(async function(){
            const TxResponse = await degen.connect(owner).mint(owner.address, 10000)
            await TxResponse.wait()
            const TxResponse1 = await degen.connect(owner).mint(player1.address, 10000)
            await TxResponse1.wait()
            const TxResponse2 = await degen.connect(owner).mint(player2.address, 10000)
            await TxResponse2.wait()
        })

        it("should check balance", async function(){
            const ownerBalance = await degen.balanceOf(owner.address)
            assert(ownerBalance, 10000)
        })

        it("should burn tokens", async function(){
            const burnTxResponse = await degen.burnTokens(1000)
            await burnTxResponse.wait()
            const newTokenBalance = await degen.balanceOf(owner.address)
            assert(newTokenBalance, tokenBalance - 1000)
        })

        it("should create new shop item", async function(){
            const createItemTxResponse = await degen.connect(owner).createNewItem("Degen NFT", 1000);
            createItemTxResponse.wait()
            const createdItem = await degen.shopItems(0)
            assert(createdItem.name, "Degen NFT")
            assert(createdItem.price, "1000")
            assert(createdItem.itemId, "1")
        })

        it("should transfer tokens from p1 to p2", async function(){
            const transferTxResponse = await degen.connect(player1).transfer(player2.address, 1000)
            await transferTxResponse.wait()
            const player1Balance = await degen.balanceOf(player1.address)
            const player2Balance = await degen.balanceOf(player2.address)
            assert(player1Balance, 9000)
            assert(player2Balance, 11000)
        })

        it("should purchase item from shop", async function(){
            const createItemTxResponse = await degen.connect(owner).createNewItem("Degen NFT", 1000);
            createItemTxResponse.wait()
            const buyTxResponse = await degen.connect(player1).purchaseItem(1, 5)
            await buyTxResponse.wait()
            const remainingBalance = await degen.balanceOf(player1.address)
            const purchasedItems = await degen.getItemsPurchasedByAddress(player1.address)
            assert(purchasedItems, ("NFT","5"))
            assert(remainingBalance, 5000)
        })
    })
})