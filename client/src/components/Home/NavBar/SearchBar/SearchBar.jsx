import { useState } from "react";
import styles from './SearchBar.module.css';

export default function (props) {

    const [search, setSearch] = useState("")

    function handleChange (event) {
        setSearch(event.target.value);
    }

    function handleKeyDown (event) {
        if (event.code === 'Enter') {
            props.onSearch(search);
        }
    }

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                onChange={handleChange}
                value={search}
                onKeyDown={handleKeyDown}
                className="stules.input"
                placeholder="Search..."
            />
        </div>
    )
}