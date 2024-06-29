// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/IVault.sol";

contract Reader {
    function getAllInformation(
        address who,
        address[] memory vaults,
        address[] memory pools
    )
        public
        view
        returns (uint256[] memory, uint256[] memory, uint256[] memory)
    {
        return (
            unstakedBalances(who, vaults),
            stakedBalances(who, pools),
            vaultSharePrices(vaults)
        );
    }

    function unstakedBalances(
        address who,
        address[] memory vaults
    ) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](vaults.length);
        for (uint256 i = 0; i < vaults.length; i++) {
            result[i] = IERC20(vaults[i]).balanceOf(who);
        }
        return result;
    }

    function stakedBalances(
        address who,
        address[] memory pools
    ) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](pools.length);
        for (uint256 i = 0; i < pools.length; i++) {
            result[i] = IERC20(pools[i]).balanceOf(who);
        }
        return result;
    }

    function underlyingBalances(
        address who,
        address[] memory vaults
    ) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](vaults.length);
        for (uint256 i = 0; i < vaults.length; i++) {
            result[i] = IERC20(IVault(vaults[i]).underlying())
                .balanceOf(who);
        }
        return result;
    }

    function vaultSharePrices(
        address[] memory vaults
    ) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](vaults.length);
        for (uint256 i = 0; i < vaults.length; i++) {
            result[i] = IVault(vaults[i]).getPricePerFullShare();
        }
        return result;
    }

    function underlyingBalanceWithInvestmentForHolder(
        address who,
        address[] memory vaults
    ) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](vaults.length);
        for (uint256 i = 0; i < vaults.length; i++) {
            result[i] = IVault(vaults[i])
                .underlyingBalanceWithInvestmentForHolder(who);
        }
        return result;
    }

    function totalSupplies(address[] memory vaults) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](vaults.length);
        for (uint256 i = 0; i < vaults.length; i++) {
            result[i] = IERC20(vaults[i]).totalSupply();
        }
        return result;
    }

    function underlyingBalancesWithInvestment(
        address[] memory vaults
    ) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](vaults.length);
        for (uint256 i = 0; i < vaults.length; i++) {
            result[i] = IVault(vaults[i]).underlyingBalanceWithInvestment();
        }
        return result;
    }
}
