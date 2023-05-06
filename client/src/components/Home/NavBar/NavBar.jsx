import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom';

export default function NavBar(props) {

    const navigate = useNavigate();
    const goHome = () => navigate('/home');
    const logOut = () => navigate('/')

    return (
        <div className={styles.navBarContainer}>
            <div>
                <button onClick={goHome}>Home</button>
            </div>
            <div >
                <SearchBar onSearch={props.onSearch} />
            </div>
            <div>
                <button onClick={logOut} >Log out</button>
            </div>
        </div>
    )

}