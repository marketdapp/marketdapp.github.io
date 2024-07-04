import {Await, useLoaderData} from "react-router-dom";
import {InventoryProvider} from "../../hooks/InventoryProvider.jsx";
import React from "react";
import {Skeleton} from "antd";
import NavTokens from "./NavTokens.jsx";
import OffersList from "./OffersList.jsx";

export default function Offers() {
    const { offers } = useLoaderData();

    return (
        <>
        <InventoryProvider>
            <NavTokens />

            <React.Suspense fallback={<Skeleton active />}>
                <Await resolve={offers}>
                {({offers, price}) => (
                    <OffersList offers={offers} price={price} />
                )}
                </Await>
            </React.Suspense>
        </InventoryProvider>
        </>
    );
}