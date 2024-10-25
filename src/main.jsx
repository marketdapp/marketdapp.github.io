import React from 'react'
import ReactDOM from 'react-dom/client'
import {createHashRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";

import './main.css'
import {WalletProvider} from "./hooks/WalletProvider";
import Layout from "./Layout";
import Home from "./pages/Home/Home.jsx";
import Profile from "@/Me/Profile.jsx";
import DealPage from "@/Trade/Deal/Deal.jsx";
import UserDeals from "@/Me/UserDeals.jsx";
import OfferNew from "@/Trade/Offer/New/OfferNew.jsx";
import TradeLayout from "@/Trade/TradeLayout.jsx";
import Offers from "@/Trade/Offers/Offers.jsx";
import UserOffers from "@/Me/Offers/UserOffers.jsx";
import {WagmiProvider} from "wagmi";
import {config} from "@/wagmi.config.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import OfferPage from "@/Trade/Offer/Offer.jsx";

const router = createHashRouter( createRoutesFromElements(
    <Route element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path={"/trade"} element={<TradeLayout/>}>
            <Route index element={<Navigate to={"/trade/sell"} />} />
            <Route path=":side/:token?/:fiat?/:method?" element={<Offers />}/>
            <Route path={"offer/:offerId"} element={<OfferPage />} />
            <Route path={"offer/new" } element={<OfferNew/>} />
            <Route path={"deal/:dealId"} element={<DealPage />} />
        </Route>
        <Route path={"/me"} element={<TradeLayout/>}>
            <Route index element={<Profile />} />
            <Route path={"offers"} element={<UserOffers />}/>
            <Route path={"deals"} element={<UserDeals/>} />
        </Route>
    </Route>
));

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
              <WalletProvider>
                  <RouterProvider router={router} />
              </WalletProvider>
          </QueryClientProvider>
      </WagmiProvider>
  </React.StrictMode>,
)
