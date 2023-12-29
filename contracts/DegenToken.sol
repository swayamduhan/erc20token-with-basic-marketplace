// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    event itemPurchased(address indexed buyer, uint256 itemId, uint256 quantity);
    
    struct Item {
        uint8 itemId;
        string name;
        uint256 price;
    }

    Item[] public shopItems;
    
    constructor() Ownable(msg.sender) ERC20("Degen", "DGN") {}

    function createNewItem(string memory _name, uint256 _price) public onlyOwner{
        shopItems.push(Item(uint8(shopItems.length + 1), _name, _price));
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public view virtual override returns(uint8) {
        return 0;
    }

    function burnTokens(uint256 _value) public {
        require(balanceOf(msg.sender) >= _value, "Insufficient Funds!");
        _burn(msg.sender, _value);
    }

     function purchaseItem(uint8 _itemId, uint256 _quantity) public {
        require(_itemId > 0 && _itemId <= shopItems.length, "Invalid item ID");
        uint256 totalPrice = shopItems[_itemId - 1].price * _quantity;
        require(balanceOf(_msgSender()) >= totalPrice, "Insufficient balance :(");
        _burn(_msgSender(), totalPrice);
        emit itemPurchased(_msgSender(), _itemId, _quantity);
    }
    
}
