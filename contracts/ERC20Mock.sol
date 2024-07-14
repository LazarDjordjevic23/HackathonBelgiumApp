// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ERC20Mock is ERC20 {
    constructor (
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) public payable ERC20(name, symbol) {
        _mint(msg.sender, initialBalance);
    }

    function transferInternal(address from, address to, uint256 value) public {
        _transfer(from, to, value);
    }

    function approveInternal(address owner, address spender, uint256 value) public {
        _approve(owner, spender, value);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
