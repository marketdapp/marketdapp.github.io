import {Avatar, Button, Card, Menu, Modal, Space} from "antd";
import {useState} from "react";
import {useWalletProvider} from "../hooks/useWalletProvider";
import {formatAddress} from "../utils.js";
import {Link} from "react-router-dom";

export default function WalletMenu()
{
    const {
        wallets,
        account,
        connectWallet,
        disconnectWallet,
    } = useWalletProvider();

    const [modalOpen, setModalOpen] = useState(false);

    if (account) {
        const top = [
            {
                key: account,
                label: account && <Space>
                    <Avatar src={'https://effigy.im/a/'+account+'.svg'} draggable={false}/>
                    <b>{formatAddress(account)}</b>
                </Space>,
                children: [
                    {label: <Link to={'/me'}>Profile</Link>, key: 'profile'},
                    {label: <Link to={'/me/offers'}>My Offers</Link>, key: 'my-offers'},
                    {label: <Link to={'/me/deals'}>My Deals</Link>, key: 'my-deals'},
                    {type: 'divider'},
                    {label: 'Disconnect', key: 'disconnect', onClick: disconnectWallet}
                ]
            },
        ];

        return (
            <Menu items={top} theme={"dark"} mode={"horizontal"} style={{minWidth: 200, flex: 'auto'}} />
        );
    }
    else {
        return (
        <>
            <Space style={{paddingRight: 20}}>
            <Button onClick={() => setModalOpen(true)}>
                Connect Wallet
            </Button>
            </Space>
            {modalOpen && (
                <Modal open={modalOpen}
                       onCancel={() => setModalOpen(false)}
                       title={"Your Browser Wallets"}
                       footer={null}
                >
                {
                    Object.keys(wallets).length > 0
                        ? Object.values(wallets).map((provider) => (
                            <Card hoverable key={provider.info.uuid}
                                  style={{width: 80}}
                                  cover={<img src={provider.info.icon} alt={provider.info.name}/>}
                                  onClick={() => connectWallet(provider.info.rdns) && setModalOpen(false)}
                            />
                        ))
                        :   <div>
                            There are no wallet extensions in your browser.<br />
                            We recommend <a target="_blank" href="https://metamask.io">MetaMask</a>.
                        </div>
                }
                </Modal>)
            }
        </>
        );
    }
}
