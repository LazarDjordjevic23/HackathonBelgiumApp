// Sources flattened with hardhat v2.22.6 https://hardhat.org


// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v5.0.2

// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}


// File contracts/interfaces/IFlashLoan.sol

pragma solidity 0.8.24;

interface IFlashLoan {
    function executeFlashLoan(uint256 amount, uint256 expected_earnings) external;
}


// File contracts/Arbitrage.sol

pragma solidity 0.8.24;


interface IERC20Helper {
    function mint(uint256 amount) external;
}

contract Arbitrage {
    IFlashLoan public flashLoanContract;
    mapping(address => uint256) public earnedAmount;
    address[] public loaners;
    uint256 expected_earnings;
    address executor;

    constructor(address _flashLoanContract)
    { flashLoanContract = IFlashLoan(_flashLoanContract); }

    function executeOperation(
        address token,
        uint256 amount,
        uint256 feeAmount,
        uint256 totalAmount
    ) external returns (bool){
        // This is replacement for arbitrage
        // Send earned money to the user address
        IERC20Helper(token).mint(expected_earnings);
        earnedAmount[executor] = expected_earnings;
        loaners.push(executor);

        IERC20(token).transfer(executor, expected_earnings - feeAmount);
        expected_earnings = 0;
        executor = address(0);

        IERC20(token).approve(address(flashLoanContract), totalAmount);
        IERC20(token).transfer(address(flashLoanContract), totalAmount);
        return true;
    }

    function borrow(
        uint256 amount,
        uint256 _expected_earnings
    ) external {
        expected_earnings = _expected_earnings;
        executor = msg.sender;
        flashLoanContract.executeFlashLoan(amount, expected_earnings);
    }

    function get_loaners() external view returns(address[] memory){
        return loaners;
    }
}
