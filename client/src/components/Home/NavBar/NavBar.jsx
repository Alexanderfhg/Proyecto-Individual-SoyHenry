import { useDispatch } from 'react-redux';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom';
import { setCurrentPage } from '../../../redux/actions';

export default function NavBar(props) {

    const navigate = useNavigate();
    const goHome = () => navigate('/home');
    
    const logOut = () => navigate('/')

    return (
        <nav className={styles.navBarContainer}>
          <div className={styles.navItem}>
            <button className={styles.navButton} onClick={goHome}>Home</button>
          </div>
          <div className={styles.navItem}>
            <SearchBar onSearch={props.onSearch} />
          </div>
          <div className={styles.navItem}>
            <button className={styles.navButton} onClick={logOut}>Log out</button>
          </div>
        </nav>
      );
      

}