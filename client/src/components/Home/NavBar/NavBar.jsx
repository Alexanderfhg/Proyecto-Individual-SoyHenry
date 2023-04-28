import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar'

export default function NavBar(props) {

    return (
        <div className={styles.navBarContainer}>
            <div>
                <a href="">Home</a>
            </div>
            <div >
                <SearchBar onSearch={props.onSearch} />
            </div>
            <div>
                <a href="">Log out</a>
            </div>
        </div>
    )

}