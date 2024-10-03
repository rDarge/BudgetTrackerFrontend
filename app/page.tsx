'use client'
import React, { useState } from 'react'
import { AccountSelector } from './components/AccountSelector'
import { AccountData, Configuration, DefaultApi } from '@/openapi'
import { TransactionTable } from './components/TransactionTable'

export default function Home() {
    const [api, setAPI] = useState<DefaultApi>(
        new DefaultApi(new Configuration({ basePath: 'http://localhost:8000' }))
    )
    const [account, setAccount] = useState<AccountData | null>(null)
    const [viewPanel, setViewPanel] = useState<Number>(1)

    const selectAccount = (account: AccountData) => {
        console.log(`Selecting account ${account.name}`)
        setAccount(account)
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div>
                <AccountSelector
                    api={api}
                    onSelectAccount={selectAccount}
                    selectedAccount={account}
                />
            </div>
            {account ? (
                <div className="w-full p-3">
                    <div className="flex flex-row w-full items-center justify-around p-3 text-center">
                        <div
                            className="hover:bg-amber-200 w-full"
                            onClick={() => setViewPanel(0)}
                        >
                            Reports
                        </div>
                        <div
                            className={`hover:bg-amber-200 w-full ${
                                viewPanel == 1 && 'font-bold bg-slate-300'
                            }`}
                            onClick={() => setViewPanel(1)}
                        >
                            Transactions
                        </div>
                        <div
                            className="hover:bg-amber-200 w-full"
                            onClick={() => setViewPanel(2)}
                        >
                            Settings
                        </div>
                    </div>
                    {viewPanel == 0 && (
                        <div>
                            Reports: Roll-up spending for individual account or
                            by account group
                        </div>
                    )}
                    {viewPanel == 1 && (
                        <TransactionTable api={api} account={account} />
                    )}
                    {viewPanel == 2 && <div>Settings</div>}
                </div>
            ) : (
                <div>Select an account above to begin</div>
            )}
        </main>
    )
}
