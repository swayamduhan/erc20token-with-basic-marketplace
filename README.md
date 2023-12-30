# Token Degen

Degen is an ERC20 Token designed for gaming purposes. It is deployed on the Avalanche C-Chain Testnet for speed and security.  
You can check the source code and explore transactions at [0x96503cdD06CBD98bb970B346E67e52d254D1d745](https://testnet.snowtrace.io/address/0x96503cdD06CBD98bb970B346E67e52d254D1d745)

## Description

The users can -  
1. Transfer their tokens to friends
2. Redeem their tokens for shop items
3. Burn their unused tokens
4. Check their account balance  

**NOTE** : The owner has access to mint new tokens as the token doesn't have any real life monetary value.

## Getting Started

### Installing

* Clone the repo locally 
* Install all dependencies using `npm i` or `yarn`
* run `npx hardhat run ./scripts/deploy.js` to deploy the code on hardhat locally

### Executing program

**For ease, you can connect to this contract on Remix**  
Steps -  
- Compile the code on Remix or upload the ABI at Remix
- Select the Injected Provider - Metamask option from ENVIRONMENT
- Paste the Avalanche Testnet deployed address provided above
- You can now simply start interacting

## Help

Only the `burnTokens`, `createNewItem`, `purchaseItem`, `transfer`, `addressToItemsOwned`, `balanceOf`, `decimals`, `name`, `owner`, `totalSupply`, `symbol`, `shopItems`, `getItemsPurchasedByAddress` buttons can be called by the user.

## Authors

Swayam Duhan
[@swxyamfr on X](https://x.com/swxyamfr?s=20)
@swayamwins on Discord


## License

This project is licensed under the MIT License
