'use client';
import { AccountData, DefaultApi } from "@/openapi"
import { operationServerMap } from "@/openapi/base";
import React, { useEffect, useRef, useState } from "react"

const DEFAULT_OPTION = -1
const CREATE_ACCOUNT = -2
 
export function AccountSelector(props: {
    api: DefaultApi,
    selectedAccount: AccountData | null,
    onSelectAccount: (acct: AccountData) => void
}): React.ReactElement {
    const [newAccount, setNewAccount] = useState<boolean>(false)
    const [newAccountName, setNewAccountName] = useState<string>("")
    const [accounts, setAccounts] = useState<AccountData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedAccountId, setSelectedAccountId] = useState<number>(DEFAULT_OPTION)

    useEffect(() => {
        setSelectedAccountId(props.selectedAccount?.id || DEFAULT_OPTION)
    }, [props.selectedAccount])


    useEffect(() => {
        async function fetchAccounts() {
            setLoading(true)
            const accounts = await props.api.getAccountsAccountsGet()
            setAccounts(accounts.data)
            setLoading(false)
        }
        
        fetchAccounts();
    }, [props.api])

    const onNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAccountName(e.target.value)
    }

    const createNewAccount = async () => {
        const result = await props.api.postAccountAccountPost({
            name: newAccountName
        })
        console.log(`Result is ${result}`)
        props.onSelectAccount(result.data)
        setNewAccount(false)
    }

    const chooseAccount = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const chosenOption = parseInt(event.target.value)
        if (chosenOption == CREATE_ACCOUNT){
            setNewAccount(true);
            event.preventDefault();
        } else if (chosenOption != DEFAULT_OPTION) {
            const chosenAccount = accounts.filter(account => account.id == chosenOption)[0]
            props.onSelectAccount(chosenAccount)
        }
    }

    const getAccountElements = () => {
        const options = []
        options.push(<option key={`list-${DEFAULT_OPTION}`} value={DEFAULT_OPTION} disabled>Select an account</option>)
        if (loading){
            options.push(<option key={`list-loading`} disabled>Loading accounts...</option>)
        }
        for(const account of accounts) {
            options.push(<option key={`list-${account.id}`} value={account.id}>{account.name}</option>)
        }
        options.push(<option key={`list-${CREATE_ACCOUNT}`} value={CREATE_ACCOUNT}>Create new account</option>)
        return options
    }

    return (
        <div>
            <label>Account:</label>
            <select onChange={(e)=>chooseAccount(e)} value={selectedAccountId}>
                {getAccountElements()}
            </select>
            {newAccount && (
                <div>
                    <div className="modal-popup-background absolute p-24 opacity-50"></div>
                    <div className="modal-popup-foreground absolute flex flex-col items-center justify-between p-6 gap-3">
                        <label>Account Name:</label>
                        <input type="text" value={newAccountName} onInput={onNameInput}></input>
                        <div className="flex flex-row justify-between gap-3">
                            <button className="button-confirm" onClick={createNewAccount}>Submit</button>
                            <button className="button-cancel" onClick={()=>setNewAccount(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}