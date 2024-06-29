// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import "./interface/IUpgradeSource.sol";
import "./upgradability/BaseUpgradeabilityProxy.sol";

contract VaultProxy is BaseUpgradeabilityProxy {
    constructor(address _implementation) {
        _setImplementation(_implementation);
    }

    /**
     * The main logic. If the timer has elapsed and there is a schedule upgrade,
     * the governance can upgrade the vault
     */
    function upgrade() external {
        (bool should, address newImplementation) = IUpgradeSource(address(this))
            .shouldUpgrade();
        require(should, "Upgrade not scheduled");
        _upgradeTo(newImplementation);

        // the finalization needs to be executed on itself to update the storage of this proxy
        // it also needs to be invoked by the governance, not by address(this), so delegatecall is needed
        (bool success, ) = address(this).delegatecall(
            abi.encodeWithSignature("finalizeUpgrade()")
        );

        require(success, "Issue when finalizing the upgrade");
    }

    function implementation() external view returns (address) {
        return _implementation();
    }
}
