'use client'

import { AccountData, ApplyRulesResponse, DefaultApi } from '@/openapi'
import React, { ReactNode, useState } from 'react'
import { ModalPopup } from './ModalPopup'
import { formatter } from './TransactionSummary'

export function CategorizeTransactionsButton(props: {
    api: DefaultApi
    account: AccountData
    onApply: () => void
}): React.ReactElement {
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [isPreview, setIsPreview] = useState<boolean>(true)
    const [results, setResults] = useState<ApplyRulesResponse | null>(null)

    const preview = async () => {
        const result = await props.api.applyRulesAccountAccountIdApplyRulesPost(
            props.account.id,
            { preview: true }
        )
        setIsPreview(false)
        setResults(result.data)
        console.log(result)
    }

    const submit = async () => {
        const result = await props.api.applyRulesAccountAccountIdApplyRulesPost(
            props.account.id,
            { preview: false }
        )
        setIsPreview(false)
        console.log(result)
        props.onApply()
        close()
    }

    const close = () => {
        setIsPreview(true)
        setShowPopup(false)
        setResults(null)
    }

    const getUpdatedTransactions = () => {
        const elements: ReactNode[] = []
        results?.updated_transactions.forEach((update, idx) => {
            elements.push(
                <tr key={`update-${idx}`}>
                    <td>{update.transaction.post_date}</td>
                    <td>{update.transaction.description}</td>
                    <td className="text-right">
                        {formatter.format(update.transaction.amount)}
                    </td>
                    <td>
                        {`${update.old_category} => ${update.new_category}`}
                    </td>
                </tr>
            )
        })
        if (elements.length == 0) {
            elements.push(
                <tr key={'t-placeholder'}>
                    <td colSpan={4}>No updates to be made to this account</td>
                </tr>
            )
        }
        return elements
    }

    return (
        <>
            <button
                className="button-action"
                onClick={() => setShowPopup(true)}
            >
                Categorize
            </button>
            {showPopup && (
                <ModalPopup>
                    <label>Categorize Transactions</label>
                    {results && (
                        <>
                            <div className="max-h-100 overflow-auto">
                                <table className="text-sm">
                                    <thead>
                                        <tr key={'transaction-headers'}>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&>*:nth-child(odd)]:bg-white">
                                        {getUpdatedTransactions()}
                                    </tbody>
                                </table>
                            </div>
                            <span>
                                Total Transactions:{' '}
                                {results.updated_transactions.length}
                            </span>
                        </>
                    )}
                    <div className="flex flex-row gap-3">
                        {isPreview && (
                            <button className="button-action" onClick={preview}>
                                Preview
                            </button>
                        )}
                        {!isPreview && (
                            <button className="button-action" onClick={submit}>
                                Submit
                            </button>
                        )}

                        <button className="button-cancel" onClick={close}>
                            Cancel
                        </button>
                    </div>
                </ModalPopup>
            )}
        </>
    )
}
