import { useDispatch, useSelector } from 'react-redux';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom';
import { setApllyOrder, setApplyFilter, setSelectDiets } from '../../../redux/actions';
import logo from './logo.png'

export default function NavBar(props) {

  const dispatch = useDispatch();
  const state = useSelector((st) => st);

  const navigate = useNavigate();
  const goHome = () => navigate('/home');
  const logOut = () => navigate('/')

  const applySelectDiets = () => state.selectDiets ? dispatch(setSelectDiets(false)) : dispatch(setSelectDiets(true));
  const applyFilter = () => state.applyFilter ? dispatch(setApplyFilter(false)) : dispatch(setApplyFilter(true));
  const applyOrder = () => state.applyOrder ? dispatch(setApllyOrder(false)) : dispatch(setApllyOrder(true));

  return (
    <nav className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <a onClick={applySelectDiets}>Select Diets</a>
        <a onClick={applyFilter}>Filter</a>
        <a onClick={applyOrder}>Order</a>

        <div className={styles.imgContainer}>
          <img className={styles.logo} src={logo} alt="Logo" />
        </div>

        <div className={styles.navItem}>
          <a className={styles.navButton} onClick={goHome}>Home</a>
        </div>
        <div className={styles.navItem}>
          <SearchBar onSearch={props.onSearch} />
        </div>
        <div className={styles.navItem}>
          <a className={styles.navButton} onClick={logOut}>Log out</a>
        </div>
      </div>
    </nav>
  );
}