export default function MyButtonComponent(props: any) {


    return (
        <>
            <button className='border-none bg-gray-200 focus-within:outline-none sm:hover:bg-gray-400 hover:text-blue-50 p-3 ml-10 rounded-2xl mt-3.5
                hover:shadow-lg w-1/4 hover:-translate-y-1 duration-500' type="submit"
                   onClick={props.n}>{props.name}</button>

        </>
    )
}