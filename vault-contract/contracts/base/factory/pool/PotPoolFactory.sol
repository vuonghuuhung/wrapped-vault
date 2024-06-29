// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../inheritance/Governable.sol";
import "../../inheritance/OwnableWhitelist.sol";
import "../interface/IPoolFactory.sol";
import "../../PotPool.sol";

contract PotPoolFactory is OwnableWhitelist, IPoolFactory {
    // TODO: do nothing here, cause dont use this token
    address public iFARM = 0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651;
    uint256 public poolDefaultDuration = 604800; // 7 days

    function setPoolDefaultDuration(uint256 _value) external onlyOwner {
        poolDefaultDuration = _value;
    }

    function deploy(
        address actualStorage,
        address vault
    ) external override onlyWhitelisted returns (address) {
        address actualGovernance = Governable(vault).governance();

        string memory tokenSymbol = ERC20(vault).symbol();
        address[] memory rewardDistribution = new address[](1);
        rewardDistribution[0] = actualGovernance;
        address[] memory rewardTokens = new address[](1);
        rewardTokens[0] = iFARM;
        PotPool pool = new PotPool(
            rewardTokens,
            vault,
            poolDefaultDuration,
            rewardDistribution,
            actualStorage,
            string(abi.encodePacked("p", tokenSymbol)),
            string(abi.encodePacked("p", tokenSymbol)),
            ERC20(vault).decimals()
        );

        Ownable(pool).transferOwnership(actualGovernance);

        return address(pool);
    }
}
