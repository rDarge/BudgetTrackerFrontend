import { ReactNode } from 'react'

export function ModalPopup(props: {
    children: ReactNode[] | ReactNode
    classNames?: string
}): React.ReactElement {
    const defaultClasses =
        'bg-gray-300 relative flex flex-col items-center justify-between gap-3 p-6 m-24 max-w-xxl max-h-100 overflow-auto'
    return (
        <>
            <div className="modal-popup-background absolute p-24 opacity-50"></div>
            <div className="modal-popup-foreground absolute flex flex-col items-center">
                <div className={props.classNames || defaultClasses}>
                    {props.children}
                </div>
            </div>
        </>
    )
}
