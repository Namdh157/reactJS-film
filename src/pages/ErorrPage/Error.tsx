import { Link } from "react-router-dom"

const Error = () => {
    return (
        <section>
            <section className="bg-sky-100 dark:bg-gray-900 w-screen h-screen">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">🚀 Kết nối quá lâu!</h1>
                        <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">Vui lòng kiểm tra lại mạng và thử lại.</p>
                        <Link to='/trang-chu'
                            className="inline-flex text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
                        >Quay lại trang chủ</Link>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Error
