import {Avatar, Button, Menu, Modal, Space} from "antd";
import {useState} from "react";
import {formatAddress} from "utils";
import {Link} from "react-router-dom";
import {useAccount, useConnect, useDisconnect} from "wagmi";

export default function WalletMenu()
{
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    const [modalOpen, setModalOpen] = useState(false);

    if (address) {
        const top = [
            {
                key: address,
                label: address && <Space>
                    <Avatar src={'https://effigy.im/a/'+address+'.svg'} draggable={false}/>
                    <b>{formatAddress(address)}</b>
                </Space>,
                children: [
                    {label: <Link to={'/trade/offer/new'}>Create Offer</Link>, key: 'create-offer'},
                    {label: <Link to={'/me/offers'}>My Offers</Link>, key: 'my-offers'},
                    {label: <Link to={'/me/deals'}>My Deals</Link>, key: 'my-deals'},
                    {label: <Link to={'/me'}>Profile</Link>, key: 'profile'},
                    {type: 'divider'},
                    {label: 'Disconnect', key: 'disconnect', onClick: disconnect}
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
            <Button onClick={() => setModalOpen(true)}>
                Connect Wallet
            </Button>
            {modalOpen && (
                <Modal open={modalOpen}
                       onCancel={() => setModalOpen(false)}
                       title={"Your Browser Wallets"}
                       footer={null}
                >
                {connectors.length > 0
                    ? connectors.map((connector) => (
                        <Button type={"primary"} key={connector.uid} onClick={() => {
                            connect({ connector });
                            setModalOpen(false);
                        }}>
                            {connector.name}
                        </Button>
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
