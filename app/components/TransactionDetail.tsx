import { CategoryData, SupercategoryData, TransactionData } from '@/openapi'
import { ReactNode, useEffect, useState } from 'react'

const UNCLASSFIED = -1
const CREATE_CATEGORY = -2

export interface CategoryUpdate {
    categoryId: number
    categoryName: string
    superId: number
    superName: string
}

export function TransactionDetail(props: {
    transaction: TransactionData
    categories: Map<number, CategoryData>
    supercategories: Map<number, SupercategoryData>
    onUpdate: (update: CategoryUpdate) => void
    onCancel: () => void
}): React.ReactElement {
    const [defaultSuperId, setDefaultSuperId] =
        useState<number>(CREATE_CATEGORY)
    const [defaultCategoryId, setDefaultCategoryId] =
        useState<number>(CREATE_CATEGORY)
    const [newCategoryId, setNewCategoryId] = useState<number>(UNCLASSFIED)
    const [newCategorySuperId, setNewCategorySuperId] =
        useState<number>(UNCLASSFIED)
    const [newCategoryName, setNewCategoryName] = useState<string>('')
    const [newSuperName, setNewSuperName] = useState<string>('')

    useEffect(() => {
        if (props.categories.size > 0) {
            const firstKey = props.categories.keys().next()
            setDefaultCategoryId(firstKey.value)
            // setNewCategoryId(props.transaction.category_id || firstKey.value)
        }
        if (props.supercategories.size > 0) {
            const firstKey = props.supercategories.keys().next()
            setDefaultSuperId(firstKey.value)
            setNewCategorySuperId(firstKey.value)
        }
    }, [props.categories, props.supercategories, props.transaction])

    const submit = () => {
        props.onUpdate({
            categoryId: newCategoryId,
            categoryName: newCategoryName,
            superId: newCategorySuperId,
            superName: newSuperName,
        })
    }

    const updateTransactionCategory = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const chosenOption = event.target.value
        if (parseInt(chosenOption) == CREATE_CATEGORY) {
            setNewCategoryId(CREATE_CATEGORY)
        } else {
            setNewCategoryId(parseInt(chosenOption))
        }
    }

    const getCategorySelector = (
        transaction: TransactionData,
        withCreate = false
    ) => {
        const categoryId = transaction?.category_id || newCategoryId
        const categoryElements: ReactNode[] = []
        props.categories.forEach((value, key) => {
            categoryElements.push(
                <option
                    value={`${key}`}
                    title={
                        props.supercategories.get(value.supercategory_id)?.name
                    }
                >
                    {value.name}
                </option>
            )
        })
        return (
            <>
                {categoryId == CREATE_CATEGORY ? (
                    <>
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button
                            className="m-2"
                            onClick={() => setNewCategoryId(defaultCategoryId)}
                        >
                            X
                        </button>
                    </>
                ) : (
                    <select
                        value={`${categoryId}`}
                        onChange={updateTransactionCategory}
                    >
                        <option value={`${UNCLASSFIED}`}>Uncategorized</option>
                        {categoryElements}
                        {withCreate && (
                            <option value={`${CREATE_CATEGORY}`}>
                                Create New
                            </option>
                        )}
                    </select>
                )}
            </>
        )
    }

    const getSupercategorySelector = () => {
        const supercategoryElements: ReactNode[] = []
        props.supercategories.forEach((value, key) => {
            supercategoryElements.push(
                <option value={`${key}`}>{value.name}</option>
            )
        })
        return (
            <>
                {newCategorySuperId == CREATE_CATEGORY ? (
                    <>
                        <input
                            type="text"
                            value={newSuperName}
                            onChange={(e) => setNewSuperName(e.target.value)}
                        />
                        <button
                            className="m-2"
                            onClick={() =>
                                setNewCategorySuperId(defaultSuperId)
                            }
                        >
                            X
                        </button>
                    </>
                ) : (
                    <select
                        onChange={(e) => {
                            setNewCategorySuperId(parseInt(e.target.value))
                        }}
                    >
                        {supercategoryElements}
                        <option value={CREATE_CATEGORY}>Create New</option>
                    </select>
                )}
            </>
        )
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <span>Transaction Details</span>
            <table>
                <tr>
                    <td>Date</td>
                    <td>{props.transaction.post_date}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{props.transaction.description}</td>
                </tr>
                <tr>
                    <td>Amount</td>
                    <td>{props.transaction.amount}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{getCategorySelector(props.transaction, true)}</td>
                </tr>
                {newCategoryId == CREATE_CATEGORY && (
                    <>
                        <tr>
                            <td>Group</td>
                            <td>{getSupercategorySelector()}</td>
                        </tr>
                    </>
                )}
            </table>
            <div className="flex flex-row gap-6">
                <button
                    onClick={submit}
                    // onClick={() => saveCurTransaction()}
                    className="button-confirm"
                >
                    Save
                </button>
                <button
                    onClick={() => props.onCancel()}
                    // onClick={() => setCurTransaction(null)}
                    className="button-cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
