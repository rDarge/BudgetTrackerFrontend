'use client';


import { AccountData, DefaultApi } from "@/openapi";
import React, { ChangeEvent, useState } from "react";

export function UploadCSVElement(props: {api: DefaultApi, account: AccountData}): React.ReactElement {
    const [file, setFile] = useState<File|null>(null)
    const [test, setText] = useState(null)

    function handleChange(event: ChangeEvent) {
        const target = event.target as HTMLInputElement
        if(target.files){
            setFile(target.files[0])
        }
    }


    const submitFile = async () => {
        if(file) {
            const result = await props.api.importCsvAccountAccountIdImportPost(props.account.id, file)
            console.log(result)
            setFile(null)
        }
    }

    return (
        <div className="flex flex-row items-center justify-between gap-6">
            <label>Import transactions</label>
            <div className="">
                <input type="file" onChange={handleChange}/>
            </div>
            <button className="button-action" onClick={submitFile}>Upload</button>
        </div>
        
    )
}