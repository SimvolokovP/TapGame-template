import { TonConnectButton } from '@tonconnect/ui-react'
import "react-toastify/dist/ReactToastify.css";

const WalletPage = () => {
  return (
    <div className="wallet-page__container container">
      <h3 className="page-title tasks-page__title">Wallet</h3>
      <TonConnectButton style={{margin: '0 auto'}} />
    </div>
  );
};

export default WalletPage;
