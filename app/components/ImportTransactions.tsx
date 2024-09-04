'use client'

import { AccountData, DefaultApi } from '@/openapi'
import React, { ChangeEvent, useState } from 'react'
import { ModalPopup } from './ModalPopup'

export function ImportTransactionsButton(props: {
    api: DefaultApi
    account: AccountData
    onImport: () => void
}): React.ReactElement {
    const [file, setFile] = useState<File | null>(null)
    const [showPopup, setShowPopup] = useState<boolean>(false)

    function handleChange(event: ChangeEvent) {
        const target = event.target as HTMLInputElement
        if (target.files) {
            setFile(target.files[0])
        }
    }

    const submitFile = async () => {
        if (file) {
            const result = await props.api.importCsvAccountAccountIdImportPost(
                props.account.id,
                file
            )
            console.log(result)
            props.onImport()
            setShowPopup(false)
        }
    }

    return (
        <>
            <button
                className="button-action"
                onClick={() => setShowPopup(true)}
            >
                Import
            </button>
            {showPopup && (
                <ModalPopup>
                    <label>Import transactions</label>
                    <div className="">
                        <input type="file" onChange={handleChange} />
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="button-action" onClick={submitFile}>
                            Upload
                        </button>
                        <button
                            className="button-cancel"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </ModalPopup>
            )}
        </>
    )
}
