import { AccountData, CategoryData, TransactionData } from '@/openapi'
import { ChangeEvent, ReactNode, useState } from 'react'

export interface NewRule {
    contains: string
    case_sensitive: boolean
    account_id: number
}

export interface UpdatedCategory {
    id: number
    name: string
    supercategory_id: number
    rules: NewRule[]
}

export function CategoryDetail(props: {
    category: CategoryData
    transaction: TransactionData | null
    account: AccountData
    onUpdate: (update: UpdatedCategory) => void
    onCancel: () => void
}): React.ReactElement {
    const [dirty, setDirty] = useState<boolean>(false)
    const [updatedCategory, setUpdatedCategory] = useState<UpdatedCategory>({
        ...props.category,
        rules: [...props.category.rules],
    })

    const submit = () => {
        if (updatedCategory) {
            props.onUpdate(updatedCategory)
        }
    }

    const updateRule = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const newRules = [...updatedCategory.rules]
        newRules[idx].contains = e.target.value
        setUpdatedCategory({
            ...updatedCategory,
            rules: newRules,
        })
        setDirty(true)
    }

    const toggleRuleCaseSensitivity = (idx: number) => {
        const newRules = [...updatedCategory.rules]
        newRules[idx].case_sensitive = !newRules[idx].case_sensitive
        setUpdatedCategory({
            ...updatedCategory,
            rules: newRules,
        })
        setDirty(true)
    }

    const getRules = () => {
        const elements: ReactNode[] = []
        updatedCategory.rules.forEach(function (rule, idx) {
            elements.push(
                <div key={`rule-${idx}`}>
                    <input
                        className="rule-input"
                        type="text"
                        value={rule.contains}
                        onChange={(e) => updateRule(e, idx)}
                    />
                    <input
                        type="checkbox"
                        checked={rule.case_sensitive}
                        onChange={(e) => toggleRuleCaseSensitivity(idx)}
                    />
                </div>
            )
        })
        return elements
    }

    const addNewRule = () => {
        const newCategory = { ...(updatedCategory || props.category) }
        newCategory.rules.push({
            contains: props.transaction ? props.transaction.description : '',
            case_sensitive: false,
            account_id: props.transaction!.account_id,
        })
        setUpdatedCategory(newCategory)
        setDirty(true)
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <span>{props.category.name}</span>
            <div>
                <div>Rules</div>
                <button onClick={addNewRule} className="button-action">
                    Add Rule
                </button>
                {getRules()}
            </div>
            <div className="flex flex-row gap-6">
                <button
                    onClick={submit}
                    disabled={!dirty}
                    className="button-confirm"
                >
                    Save
                </button>
                <button
                    onClick={() => props.onCancel()}
                    className="button-cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
