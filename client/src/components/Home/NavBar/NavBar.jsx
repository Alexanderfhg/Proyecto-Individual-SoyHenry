import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar'

export default function NavBar(props) {

    return (
        <div >
            <div className={styles.navBar}>
                <SearchBar onSearch={props.onSearch}/>
            </div>
        </div>
    )

}