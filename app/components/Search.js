export default function Search({search, setSearch}) {
    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
    }

    return (
        <div className="search-input">
            <div className="search">
                <input
                    name="search" 
                    type="search" 
                    placeholder={`Filter search by ingredient, category or area`}
                    value={search}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}