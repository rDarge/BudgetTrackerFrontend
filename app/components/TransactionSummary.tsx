import {
    AccountData,
    CategoryData,
    DefaultApi,
    GetCategoriesResponse,
    SupercategoryData,
    TransactionData,
} from '@/openapi'
import React, { ReactNode, useEffect, useState } from 'react'
import { ModalPopup } from './ModalPopup'
import { CategoryUpdate, TransactionDetail } from './TransactionDetail'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

type categoryMap = Map<number, CategoryData>
type superMap = Map<number, SupercategoryData>

export function TransactionSummary(props: {
    api: DefaultApi
    account: AccountData | null
}): React.ReactElement {
    const [categories, setCategories] = useState<categoryMap>(new Map())
    const [superCategories, setSupercategories] = useState<superMap>(new Map())
    const [transactions, setTransactions] = useState<TransactionData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [curTransaction, setCurTransaction] =
        useState<TransactionData | null>(null)

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true)
            const response = await props.api.getCategoriesCategoriesGet()
            updateCategories(response.data)
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

    const updateCategories = (response: GetCategoriesResponse) => {
        const categories = response.categories
        const supers = response.superCategories
        setCategories(new Map(categories.map((cat) => [cat.id, cat])))
        setSupercategories(new Map(supers.map((cat) => [cat.id, cat])))
    }

    const refreshState = async () => {
        if (props.account) {
            setLoading(true)
            const transactions =
                await props.api.getTransactionsAccountAccountIdTransactionsGet(
                    props.account.id
                )
            setTransactions(transactions.data.transactions)
            const categories = await props.api.getCategoriesCategoriesGet()
            updateCategories(categories.data)
            setLoading(false)
        }
    }

    const saveCurTransaction = async (args: CategoryUpdate) => {
        const updatedTransaction = {
            ...curTransaction!,
            category_id: args.categoryId,
        }
        await props.api.updateTransactionTransactionsPut({
            transaction: updatedTransaction,
            newCategoryName: args.categoryName,
            superId: args.superId,
            newSuperName: args.superName,
        })
        await refreshState()
        setCurTransaction(null)
    }

    const presentTransactionDetails = (transaction: TransactionData) => {
        setCurTransaction(transaction)
    }

    const getTransactionElements = () => {
        const elements: ReactNode[] = []
        for (const transaction of transactions) {
            elements.push(
                <tr
                    key={transaction.id}
                    onClick={() => presentTransactionDetails(transaction)}
                >
                    <td>{transaction.post_date}</td>
                    <td>{transaction.description}</td>
                    <td className="text-right">
                        {formatter.format(transaction.amount)}
                    </td>
                    {/* TODO replace stopPropagation with new dialog to create rules for category based on transaction description */}
                    <td onClick={(e) => e.stopPropagation()}>
                        {transaction.category_id
                            ? categories.get(transaction.category_id)?.name
                            : 'Unclassified'}
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
                    <TransactionDetail
                        transaction={curTransaction}
                        categories={categories}
                        supercategories={superCategories}
                        onUpdate={saveCurTransaction}
                        onCancel={() => setCurTransaction(null)}
                    />
                </ModalPopup>
            )}
        </div>
    )
}
