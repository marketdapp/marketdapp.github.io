import {Button, Card, Dropdown, Modal} from "antd";
import React, {useState} from "react";
import {useWalletProvider} from "../hooks/useWalletProvider";
import {DownOutlined} from "@ant-design/icons";
import {formatAddress} from "../utils";
import {Link} from "react-router-dom";

export default function WalletConnector()
{
    const {
        wallets,
        selectedAccount,
        connectWallet,
        disconnectWallet,
    } = useWalletProvider();

    const [modalOpen, setModalOpen] = useState(false);

    const menu = {
        items: [
            {label: <Link to={'/me'}>Profile</Link>, key: 'profile'},
            {type: 'divider'},
            {label: 'Disconnect', key: 'disconnect', onClick: disconnectWallet}
        ]
    };

    return (<>
    {selectedAccount ?
        <Dropdown menu={menu}>
            <Button>
                {formatAddress(selectedAccount)}
                <DownOutlined />
            </Button>
        </Dropdown>
        :
        <Button onClick={() => setModalOpen(true)}>Connect Wallet</Button>
    }

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
    </>)
}