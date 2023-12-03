import SearchIcon from "../search.svg"

const Search = (props) => {
    return (
        <section className="search">
            <input placeholder="Search for movies..." value={props.search} onChange={(e) => {
                props.onChange(e.target.value)
            }} />
            <img src={SearchIcon} alt="search"/>
        </section>
    )
}

export default Search;