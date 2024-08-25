'use client'
import React, { useState } from 'react'
import { AccountSelector } from './components/AccountSelector'
import { AccountData, Configuration, DefaultApi } from '@/openapi'
import { TransactionSummary } from './components/TransactionSummary'

export default function Home() {
    const [api, setAPI] = useState<DefaultApi>(
        new DefaultApi(new Configuration({ basePath: 'http://localhost:8000' }))
    )
    const [account, setAccount] = useState<AccountData | null>(null)

    const selectAccount = (account: AccountData) => {
        console.log(`Selecting account ${account.name}`)
        setAccount(account)
    }

    return (
        <main className="flex min-h-screen flex-row items-center justify-between">
            <div className="p-24">Left</div>
            <div className="flex min-h-screen flex-col items-center justify-between p-6">
                <div>
                    <AccountSelector
                        api={api}
                        onSelectAccount={selectAccount}
                        selectedAccount={account}
                    />
                </div>
                {account ? (
                    <div>
                        <div className="flex flex-col items-center justify-between">
                            <span>Account details</span>
                        </div>
                        <TransactionSummary api={api} account={account} />
                    </div>
                ) : (
                    <div>Select an account above to begin</div>
                )}
                <div>
                    <span>You need a budget!</span>
                </div>
            </div>
            <div>{/* <span>Right column hidden</span> */}</div>
        </main>
    )
}
