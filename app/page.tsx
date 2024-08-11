'use client';
import Image from "next/image";
import { UploadCSVElement } from "./components/ReportOverview";
import React, { useState } from "react";
import { AccountSelector } from "./components/AccountSelector";
import { AccountData, Configuration, DefaultApi } from "@/openapi";

export default function Home() {
  const [api, setAPI] = useState<DefaultApi>(new DefaultApi(new Configuration({basePath:"http://localhost:8000"})))
  const [account, setAccount] = useState<AccountData|null>(null)

  const selectAccount = (account: AccountData) => {
    console.log(`Selecting account ${account.name}`)
    setAccount(account)
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
      <div className="p-24">Left</div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AccountSelector api={api} onSelectAccount={selectAccount} selectedAccount={account} />
      </div>
      {account ? <div>
        <span>Account details</span>
        <div>
          <span>Import transactions</span>
          <UploadCSVElement api={api} account={account}/>
        </div>
      </div> : <div>Select an account above to begin</div>}
      <div>
        <span>Footer</span>
      </div>
      </div>
      <div>
        {/* <span>Right column hidden</span> */}
      </div>
    </main>
  );
}
