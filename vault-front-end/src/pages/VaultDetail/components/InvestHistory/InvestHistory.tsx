import { InvestLog } from 'src/types/vault.type';

const InvestHistory = ({ txHistory }: { txHistory: InvestLog }) => {
    return (
        <div className="mb-4">
            <h3>Time: {txHistory.vaultInfo.timestamp}</h3>
            <h3>Reward Balance: {txHistory.rewardBalance} {txHistory.rewardSymbol}</h3>
            <hr className="border-t border-gray-600 my-2" />
            <span>Vault Changes: </span>
            <p className="mb-2">
                Share price change: from {txHistory.vaultInfo.oldSharePrice} to {txHistory.vaultInfo.newSharePrice}
            </p>
            <hr className="border-t border-gray-600 my-2" />
            <span>Platform Fee Received: </span>
            <p className="mb-2">
                Address {txHistory.platformInfo.platformFeeRecipient} received {txHistory.platformInfo.platformFee} {txHistory.rewardSymbol}
            </p>
            <hr className="border-t border-gray-600 my-2" />
            <span>Strategist Fee Received: </span>
            <p className="mb-2">
                Address {txHistory.strategistInfo.strategist} received {txHistory.strategistInfo.strategistFee} {txHistory.rewardSymbol}
            </p>
        </div>
    );
};

export default InvestHistory;
