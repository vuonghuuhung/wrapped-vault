import { DepositWithdrawLog } from 'src/types/vault.type';

const UserHistory = ({ txHistory }: { txHistory: DepositWithdrawLog }) => {
    return (
        <div>
            <h3>
                Receiver: {txHistory.depositor}
                <br />
                Assets: {txHistory.assets} {txHistory.assetSymbol}
                <br />
                Shares: {txHistory.shares} {txHistory.shareSymbol}
            </h3>
        </div>
    );
};

export default UserHistory;
