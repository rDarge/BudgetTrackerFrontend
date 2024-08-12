import { AccountData, DefaultApi, TransactionData } from '@/openapi'
import { ReactNode, useEffect, useState } from 'react'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

export function TransactionSummary(props: {
    api: DefaultApi
    account: AccountData | null
}): React.ReactElement {
    const [transactions, setTransactions] = useState<TransactionData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchTransactions(accountId: number) {
            setLoading(true)
            const response =
                await props.api.getTransactionsAccountAccountIdTransactionsGet(
                    accountId
                )
            setTransactions(response.data.transactions)
            setLoading(false)
        }

        if (props.account) {
            fetchTransactions(props.account.id)
        }
    }, [props.api, props.account])

    const getTransactionElements = () => {
        const elements: ReactNode[] = []
        for (const transaction of transactions) {
            elements.push(
                <tr>
                    <td>{transaction.post_date}</td>
                    <td>{transaction.description}</td>
                    <td className="text-right">
                        {formatter.format(transaction.amount)}
                    </td>
                </tr>
            )
        }
        return elements
    }

    const getPlaceholderText = () => {
        if (loading) {
            return 'Loading transactions...'
        } else {
            return 'No transactions to show'
        }
    }

    return (
        <div>
            <table className="[&>*:nth-child(even)]:bg-white">
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                {transactions.length > 0 ? (
                    getTransactionElements()
                ) : (
                    <tr>
                        <td colSpan={5}>{getPlaceholderText()}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}
