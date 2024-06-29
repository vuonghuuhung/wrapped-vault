// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import "../interface/IStrategyFactory.sol";
import "../../upgradability/StrategyProxy.sol";
import "../../inheritance/OwnableWhitelist.sol";

interface IInitializableStrategy {
    function initializeStrategy(address _storage, address _vault) external;
}

contract UpgradableStrategyFactory is OwnableWhitelist, IStrategyFactory {
    function deploy(
        address actualStorage,
        address vault,
        address upgradableStrategyImplementation
    ) external override onlyWhitelisted returns (address) {
        StrategyProxy proxy = new StrategyProxy(
            upgradableStrategyImplementation
        );
        IInitializableStrategy strategy = IInitializableStrategy(
            address(proxy)
        );
        strategy.initializeStrategy(actualStorage, vault);
        return address(proxy);
    }
}
