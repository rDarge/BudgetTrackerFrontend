import {
    AccountData,
    CategoryData,
    DefaultApi,
    SupercategoryData,
    TransactionData,
} from '@/openapi'
import { ReactNode, useEffect, useState } from 'react'
import { ModalPopup } from './ModalPopup'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export function TransactionSummary(props: {
    api: DefaultApi
    account: AccountData | null
}): React.ReactElement {
    const [categories, setCategories] = useState<Map<number, CategoryData>>(
        new Map()
    )
    const [superCategories, setSupercategories] = useState<
        Map<number, SupercategoryData>
    >(new Map())
    const [transactions, setTransactions] = useState<TransactionData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [curTransaction, setCurTransaction] =
        useState<TransactionData | null>(null)

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true)
            const response = await props.api.getCategoriesCategoriesGet()
            const categories = response.data.categories
            const supers = response.data.superCategories
            setCategories(new Map(categories.map((cat) => [cat.id, cat])))
            setSupercategories(new Map(supers.map((cat) => [cat.id, cat])))
            setLoading(false)
        }

        fetchCategories()
    }, [props.api])

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

    const categorizeTransaction = (transaction: TransactionData) => {
        setCurTransaction(transaction)
    }

    const getCategory = (categoryId: number | null | undefined) => {
        return categoryId ? categories.get(categoryId)?.name : 'Uncategorized'
    }

    const getTransactionElements = () => {
        const elements: ReactNode[] = []
        for (const transaction of transactions) {
            elements.push(
                <tr key={transaction.id}>
                    <td>{transaction.post_date}</td>
                    <td>{transaction.description}</td>
                    <td className="text-right">
                        {formatter.format(transaction.amount)}
                    </td>
                    <td onClick={() => categorizeTransaction(transaction)}>
                        {getCategory(transaction.category_id)}
                    </td>
                </tr>
            )
        }
        if (elements.length == 0) {
            elements.push(
                <tr key={'t-placeholder'}>
                    <td colSpan={5}>{getPlaceholderText()}</td>
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
                    {getTransactionElements()}
                </tbody>
            </table>
            {curTransaction && (
                <ModalPopup>
                    <span>Transaction Details</span>
                    <table>
                        <tr>
                            <td>Date</td>
                            <td>{curTransaction.post_date}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{curTransaction.description}</td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td>{curTransaction.amount}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{getCategory(curTransaction.category_id)}</td>
                            {/* TODO finish allowing users to set categories, add as rule */}
                        </tr>
                    </table>
                </ModalPopup>
            )}
        </div>
    )
}
