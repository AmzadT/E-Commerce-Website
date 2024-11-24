
const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }

    return (
        <div className="center">
            <p className="text-2xl font-medium text-gray-800 text-center">Subscribe Now & Get 20% Off</p>
            <p className="text-gray-400 mt-3 text-center">You can Subscribe my Website & Get 20% Off & More Offers</p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 mt-10">
                <input className="w-full sm:flex-1 outline-none placeholder:text-gray-500" placeholder="Enter Your Email" required type="email" />
                <button className="bg-black text-white text-sm px-10 py-4" type="submit">SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsLetterBox