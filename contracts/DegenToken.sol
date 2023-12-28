// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    address private _owner;
    constructor() ERC20("Degen", "DGN") {
        _transferOwnership(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public view virtual override returns(uint) {
        return 0;
    }

    function transferTokens(address to, uint256 amount) public {
        transfer(to, amount)
    }

    function getAccountBalance(address account) public view returns (uint256) {
        return balanceOf(account)
    }
}
