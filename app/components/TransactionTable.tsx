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
import { UpdateTransaction, TransactionDetail } from './TransactionDetail'
import { CategoryDetail, UpdatedCategory } from './CategoryDetail'
import { ImportTransactionsButton } from './ImportTransactions'
import { CategorizeTransactionsButton } from './CategorizeTransactions'

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

type categoryMap = Map<number, CategoryData>
type superMap = Map<number, SupercategoryData>

export function TransactionTable(props: {
    api: DefaultApi
    account: AccountData | null
}): React.ReactElement {
    const [categories, setCategories] = useState<categoryMap>(new Map())
    const [superCategories, setSupercategories] = useState<superMap>(new Map())
    const [transactions, setTransactions] = useState<TransactionData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [curTransaction, setCurTransaction] =
        useState<TransactionData | null>(null)
    const [curCategory, setCurCategory] = useState<CategoryData | null>(null)
    const [page, setPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(20)

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
        //Always load first page when changing accounts
        setPage(0)
    }, [props.account])

    useEffect(() => {
        async function fetchTransactions(accountId: number) {
            setLoading(true)
            const response =
                await props.api.getTransactionsAccountAccountIdTransactionsGet(
                    accountId,
                    page,
                    pageSize
                )
            setTransactions(response.data.transactions)
            setLoading(false)
        }

        if (props.account) {
            fetchTransactions(props.account.id)
        }
    }, [props.api, props.account, page, pageSize])

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
                    props.account.id,
                    page,
                    pageSize
                )
            setTransactions(transactions.data.transactions)
            const categories = await props.api.getCategoriesCategoriesGet()
            updateCategories(categories.data)
            setLoading(false)
        }
    }

    const saveCurTransaction = async (args: UpdateTransaction) => {
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
        clearCurSelections()
    }

    const saveCurCategory = async (category: UpdatedCategory) => {
        await props.api.updateCategoryCategoryPut(category)
        await refreshState()
        clearCurSelections()
    }

    const clearCurSelections = () => {
        setCurTransaction(null)
        setCurCategory(null)
    }

    const presentTransactionDetails = (transaction: TransactionData) => {
        setCurTransaction(transaction)
    }

    const presentCategoryDetails = (transaction: TransactionData) => {
        if (transaction.category_id != null) {
            setCurCategory(categories.get(transaction.category_id!)!)
        }
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
                    <td
                        onClick={(e) => presentCategoryDetails(transaction)}
                        className={
                            transaction.category_id
                                ? 'hover:font-bold'
                                : 'bg-yellow-200 hover:font-bold'
                        }
                    >
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
        <div className="w-full">
            <table className="text-sm w-full">
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
            {props.account && (
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <button
                            className="button-action"
                            disabled={page == 0}
                            onClick={() => setPage(page - 1)}
                        >
                            {Math.max(page - 1, 0)}
                        </button>
                        Page {page}
                        <button
                            className="button-action"
                            disabled={transactions.length < pageSize} //This doesn't account for the last page having exactly pageSize elements.
                            onClick={() => setPage(page + 1)}
                        >
                            {page + 1}
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-3">
                        <ImportTransactionsButton
                            api={props.api}
                            account={props.account}
                            onImport={refreshState}
                        />
                        <CategorizeTransactionsButton
                            api={props.api}
                            account={props.account}
                            onApply={refreshState}
                        />
                    </div>
                </div>
            )}
            {curTransaction && !curCategory && (
                <ModalPopup>
                    <TransactionDetail
                        transaction={curTransaction}
                        categories={categories}
                        supercategories={superCategories}
                        onUpdate={saveCurTransaction}
                        onCancel={clearCurSelections}
                    />
                </ModalPopup>
            )}
            {curCategory && props.account && (
                <ModalPopup>
                    <CategoryDetail
                        category={curCategory}
                        transaction={curTransaction}
                        account={props.account}
                        onUpdate={saveCurCategory}
                        onCancel={clearCurSelections}
                    />
                </ModalPopup>
            )}
        </div>
    )
}
