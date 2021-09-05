export default function PostComponent(props: { id: string, name: string, placeholder: string, onChange?: (value: string) => void }) {
    return (
        <div>
            <label className="flex-col flex justify-center "> {props.name}
                <textarea id={props.id} className='border-none bg-blue-100 p-3 m-1.5 w-60 hover:shadow-md hover:bg-blue-50
                focus-within:bg-blue-50 duration-500 hover:scale-50 focus-within:outline-none rounded-2xl outline-none '
                          placeholder={props.placeholder}
                          onChange={tar => props.onChange?.(tar.target.value)} required>
                </textarea>
            </label>
        </div>
    )
}