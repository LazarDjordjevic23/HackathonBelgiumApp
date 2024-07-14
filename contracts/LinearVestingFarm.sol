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


// File contracts/LinearVestingFarm.sol

pragma solidity 0.8.24;

contract LinearVestingFarm {

    // Info about each user
    struct Reward{
        address user;
        uint256 amount;
    }

    // Time when farm is starting to vest
    uint256 public startTime;
    // Time when farm is finished with vesting
    uint256 public endTime;
    // (endTime - startTime)
    uint256 public farmDurationSec;
    // Mapping with reward amount,
    // that should be paid out for all users
    mapping(address => uint256) public totalUserRewards;
    // Total amount of reward token
    uint256 public totalRewards;
    // Remaining rewards to payout
    uint256 public totalRewardsPendingBalance;
    // Mapping with reward amount,
    // that are paid out for all users
    mapping(address => uint256) public totalUserPayouts;
    // Address of token that is vested
    IERC20 public vestedToken;
    // Array of users
    address[] public participants;
    // Mapping of users id
    mapping(address => uint256) public usersId;
    // Number of users
    uint256 public noOfUsers;
    // Is farm user
    mapping(address => bool) public isFarmUser;
    // Total rewards withdrawn
    uint256 public totalWithdrawn;
    // Is user removed
    mapping(address => bool) public isRemoved;
    // Claim percentage
    uint256 public earlyClaimAvailablePercent;
    // Mapping with burned amount for each user;
    mapping(address => uint256) public totalUserBurned;
    // Total burned tokens
    uint256 public totalBurned;
    // Claim before start percentage
    uint256 public claimAvailableBeforeStartPercent;

    // Events
    event RewardPaid(
        address indexed user,
        uint256 indexed reward
    );
    event EndTimeSet(
        uint256 indexed endTime
    );
    event LeftOverTokensRemoved(
        uint256 indexed amountWithdrawn,
        address indexed collector,
        uint256 indexed balance,
        uint256 pendingAmount
    );
    event RewardPaidWithBurn(
        address indexed user,
        uint256 indexed rewardPaid,
        uint256 indexed rewardBurned
    );
    event StartTimeSet(
        uint256 indexed startTime
    );

    constructor(
        address _vestedToken,
        uint256 _earlyClaimAvailablePer,
        uint256 _beforeStartClaimPer
    )
    {
        vestedToken = IERC20(_vestedToken);
        startTime = block.timestamp + 60;
        endTime = startTime + (60 * 60 * 24 * 2);
        farmDurationSec = endTime - startTime;
        earlyClaimAvailablePercent = _earlyClaimAvailablePer;
        claimAvailableBeforeStartPercent = _beforeStartClaimPer;
    }

    /************************************************ USER FUNCTIONS **************************************************/

    /**
     * @notice function is adding users into the array
     *
     * @dev this is function that creates data,
     * to work with
     *
     * @param _rewards - array of [userAddress, userAmount]
     */
    function addUsersRewards(
        Reward[] calldata _rewards
    )
    external
    {
        for(uint256 i = 0 ; i < _rewards.length; i++){
            Reward calldata r = _rewards[i];
            if(r.amount > 0 && !isFarmUser[r.user]){
                totalRewards = (totalRewards + r.amount) - totalUserRewards[r.user];
                totalRewardsPendingBalance = (totalRewardsPendingBalance + r.amount) - totalUserRewards[r.user];
                usersId[r.user] = noOfUsers;
                noOfUsers++;
                participants.push(r.user);
                totalUserRewards[r.user] = r.amount;
                isFarmUser[r.user] = true;
            }
        }
    }

    /****************************************** ACTIVATION FUNCTIONS **************************************************/

    /**
     * @notice function is funding the farm
     *
     * @param _amount - amount to fund with
     */
    function fundAndOrActivate(
        uint256 _amount
    )
    external
    {
        if(totalRewardsPendingBalance > vestedToken.balanceOf(address(this))) {
            uint256 amount =
            totalRewardsPendingBalance - vestedToken.balanceOf(address(this));

            vestedToken.transferFrom(
                address(msg.sender),
                address(this),
                amount
            );
        }

        require(
            vestedToken.balanceOf(address(this)) >= totalRewardsPendingBalance,
            "There is not enough money to payout all users"
        );
    }

    /********************************************** SETTER FUNCTIONS **************************************************/

    /**
     * @notice function is setting new start time
     *
     * @param _startTime - unix timestamp
     */
    function setStartTime(
        uint256 _startTime
    )
    external
    {
        require(
            block.timestamp < startTime,
            "Start time has already arrived"
        );
        require(
            _startTime > block.timestamp,
            "Start time can not be in the past"
        );
        require(
            endTime > _startTime,
            "start time cannot be after end time"
        );

        startTime = _startTime;
        farmDurationSec = endTime - startTime;
        emit StartTimeSet(startTime);
    }

    /**
     * @notice function is setting new end time
     *
     * @param _endTime - unix timestamp
     */
    function setEndTime(
        uint256 _endTime
    )
    external
    {
        require(
            _endTime > block.timestamp,
            "End time can not be in the past"
        );

        endTime = _endTime;
        farmDurationSec = endTime - startTime;
        emit EndTimeSet(endTime);
    }

    /********************************************** GETTER FUNCTIONS **************************************************/

    /**
     * @notice function is getting last rewardTime
     *
     * @return unix timestamp (now)
     */
    function lastTimeRewardApplicable()
    public
    view
    returns(uint256)
    {
        return block.timestamp < endTime ? block.timestamp : endTime;
    }

    /**
     * @notice returns total amount,
     * that has been rewarded to the user to the current time
     *
     * @param account - user address
     *
     * @return paid rewards
     */
    function earned(
        address account
    )
    public
    view
    returns(uint256)
    {
        if(!_vestingHasStarted()){
            return 0;
        }
        else{
            return (totalUserRewards[account] * (lastTimeRewardApplicable() - startTime)) / farmDurationSec;
        }
    }

    /**
     * @notice returns total rewards,
     * that are locked,unlocked and withdrawn
     *
     * @return totalRewardsLocked,totalRewardsUnlocked
     * and totalWithdrawn and totalBurned
     */
    function getTotalRewardsLockedUnlockedAndWithdrawn()
    external
    view
    returns(uint256, uint256, uint256, uint256)
    {
        if(!_vestingHasStarted()){
            return(
            totalRewards,
            0,
            totalWithdrawn,
            totalBurned
            );
        }
        else{
            uint256 totalRewardsUnlocked = (totalRewards * (lastTimeRewardApplicable() - startTime)) / farmDurationSec;
            uint256 totalRewardsLocked = totalRewards - totalRewardsUnlocked;
            return (
                totalRewardsLocked,
                totalRewardsUnlocked,
                totalWithdrawn,
                totalBurned
            );
        }
    }

    /**
     * @notice function calculating claim percent
     *
     * @return claim percent based on start time
     */
    function _getClaimPercent()
    internal
    view
    returns(uint256)
    {
        if(_vestingHasStarted()){
            return earlyClaimAvailablePercent;
        }
        else{
            return claimAvailableBeforeStartPercent;
        }
    }

    /**
     * @notice function is returning info about assets of user
     *
     * @param user - address of user
     * @param frontEnd - flag who is calling function
     *
     * @return amountEarned - available to claim at this moment
     * @return totalLeftLockedForUser - how many is locked
     * @return claimAmountFromLocked -  how much can be withdrawn from locked
     * @return burnAmount - how much will be burnt
     */
    function getInfoOfUser(
        address user,
        bool frontEnd
    )
    public
    view
    returns(uint256, uint256, uint256, uint256)
    {
        uint256 userTotalRewards = totalUserRewards[user];
        uint256 userTotalPayouts = totalUserPayouts[user];

        if(userTotalRewards == userTotalPayouts){
            return(0, 0, 0, 0);
        }
        else{
            uint256 claimPercent = _getClaimPercent();
            uint256 amountEarned = _withdrawCalculation(user, frontEnd);
            uint256 totalLeftLockedForUser = userTotalRewards - userTotalPayouts - amountEarned;
            uint256 burnPercent = 100 - claimPercent;
            uint256 claimAmountFromLocked = (totalLeftLockedForUser * claimPercent) / 100;
            uint256 burnAmount = (totalLeftLockedForUser * burnPercent) / 100;

            return(
                amountEarned,
                totalLeftLockedForUser,
                claimAmountFromLocked,
                burnAmount
            );
        }
    }

    /**
     * @notice function is returning info about totalEarned
     *
     * @param user - address of user
     *
     * @return amountEarned - amount without burned part
     */
    function getEarnedAmountWithoutBurned(
        address user
    )
    external
    view
    returns(uint256)
    {
        return totalUserPayouts[user] - totalUserBurned[user];
    }

    /**
     * @notice function is calculating available amount for withdrawal
     *
     * @param user - address of user
     * @param frontEnd - flag who is calling function
     */
    function _withdrawCalculation(
        address user,
        bool frontEnd
    )
    internal
    view
    returns (uint256)
    {
        uint256 _earned = earned(address(user));

        if(!frontEnd){
            require(
                _earned <= totalUserRewards[address(user)],
                "Earned is more than reward!"
            );
            require(
                _earned >= totalUserPayouts[address(user)],
                "Earned is less or equal to already paid!"
            );
        }

        uint256 amountEarned = _earned - totalUserPayouts[address(user)];
        return amountEarned;
    }

    /**
     * @notice function is checking if vesting is already started
     *
     * @return boolean - if true then vesting is already started
     */
    function _vestingHasStarted()
    internal
    view
    returns (bool)
    {
        return block.timestamp > startTime;
    }

    /**
     * @notice function is checking if there is enogh funds to pay user
     *
     * @param amount - that needs to be paid
     */
    function _sufficientFunds(
        uint256 amount
    )
    internal
    view
    returns(bool)
    {
        return vestedToken.balanceOf(address(this)) >= amount;
    }

    /************************************************ WITHDRAW FUNCTIONS **********************************************/

    /**
     * @notice function is allowing user to withdraw his rewards,
     * and to finish with vesting
     */
    function claimWholeRewards()
    external
    {
        uint256 amountEarned;
        uint256 totalLeftLockedForUser;
        uint256 claimAmountFromLocked;
        uint256 burnAmount;
        (
            amountEarned,
            totalLeftLockedForUser,
            claimAmountFromLocked,
            burnAmount
        ) = getInfoOfUser(
            address(msg.sender),
            false
        );

        require(
            _getClaimPercent() != 0,
            "This option is not available on this farm"
        );
        require(
            totalUserPayouts[address(msg.sender)] < totalUserRewards[address(msg.sender)],
            "User has been paid out"
        );

        if (amountEarned >= 0) {
            amountEarned = amountEarned + claimAmountFromLocked;

            //update contract data
            totalUserPayouts[address(msg.sender)] = totalUserRewards[address(msg.sender)];
            totalUserBurned[address(msg.sender)] = burnAmount;
            totalRewardsPendingBalance = totalRewardsPendingBalance - (amountEarned + burnAmount);
            //transfer tokens
            vestedToken.transfer(address(msg.sender), amountEarned);
            vestedToken.transfer(address(1), burnAmount);
            //emit event
            emit RewardPaidWithBurn(
                address(msg.sender),
                amountEarned,
                burnAmount
            );
            //update contract data
            totalWithdrawn += amountEarned;
            totalBurned += burnAmount;
        }
    }

    /**
     * @notice function is paying users their rewards back
     */
    function withdraw()
    external
    {
        uint256 rewardAmount = _withdrawCalculation(address(msg.sender), false);

        require(
            block.timestamp > startTime,
            "Farm has not started yet"
        );
        require(
            totalUserPayouts[address(msg.sender)] < totalUserRewards[address(msg.sender)],
            "User has been paid out"
        );

        if (rewardAmount > 0) {
            totalUserPayouts[address(msg.sender)] += rewardAmount;
            totalRewardsPendingBalance -= rewardAmount;
            vestedToken.transfer(address(msg.sender), rewardAmount);
            emit RewardPaid(address(msg.sender), rewardAmount);

            totalWithdrawn += rewardAmount;
        }
    }
}
