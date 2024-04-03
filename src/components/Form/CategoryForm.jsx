



function CategoryForm({ handleSubmit, value, setValue }) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <input
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Categpry Name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default CategoryForm