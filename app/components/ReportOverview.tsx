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
        <div>
            <div className="row-auto">
                <input type="file" onChange={handleChange}/>
            </div>
            <div className="row-auto">
                <button onClick={submitFile}>Upload</button>
            </div>
        </div>
        
    )
}