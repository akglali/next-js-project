export default function ChatInputComponent(props: { name: string, value:string,id: string, type: string, placeholder: string, onChange?: (value: string) => void }) {
    return (
        <>
            <label className="outline-none"> {props.name}
                <input id={props.id} className='border-none bg-blue-100 p-3 m-1.5 w-60 hover:shadow-md hover:bg-blue-50
                focus-within:bg-blue-50 duration-500 hover:scale-50 focus-within:outline-none rounded-2xl outline-none '
                       type={props.type} placeholder={props.placeholder} value={props.value}
                       onChange={tar => props.onChange?.(tar.target.value)} required/>
            </label>
        </>
    )
}