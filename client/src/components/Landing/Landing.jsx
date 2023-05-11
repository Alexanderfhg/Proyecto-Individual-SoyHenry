import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';
import image1 from './img/image1.jpeg';
import image2 from './img/image2.jpeg';
import logo from './img/logo.png';

export default function Landing(props) {

    const navigate = useNavigate();
    const goHome = () => {
        props.onSearch('');
        navigate('/home')
    };

    return (
        <div className={styles.contenedor}>
            <div className={styles.cuadroUno}>
                <img src={logo} alt="" />
            </div>
            <div className={styles.cuadroDos}>
                <img src={image1} alt="Imagen 2" />
            </div>
            <div className={styles.cuadroTres}>
                <img src={image2} alt="Imagen 3" />
            </div>
            <div className={styles.cuadroCuatro}>
                <div className={styles.cardContainer}>
                    <div onClick={goHome} className={styles.profileDiv}>
                        <p className={styles.intro}>Welcome to our diet consultation and creation page. Here, you'll find a wide variety of diets to suit every taste and need. You can filter and sort diets according to your preferences, as well as discover all the diets a recipe belongs to. In addition, you can view the detailed step-by-step process for each diet.
                            Can't find a diet that suits your needs or tastes? No problem! With our diet creation tool, you can design your own personalized diet by selecting the ingredients and specifying the quantities you need to achieve your goals.
                            On our page, you'll find useful information and tips for maintaining a healthy and balanced diet. Explore our site and discover everything we have to offer!
                        </p>
                    </div>
                    <div className={styles.infoDiv}>
                        <div className={styles.nameDiv}>
                            <p className={styles.name}>Alexander Herrera</p>
                            <p className={styles.role}>FullStack Developer</p>
                        </div>
                        <div className={styles.socialDiv}>
                            <a href="https://github.com/Alexanderfhg"><svg viewBox="0 0 496 512" className={`${styles.socials} ${styles.github}`}><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></a>
                            <a href="https://www.linkedin.com/in/freddy-alexander-herrera-garcia-9678771ab/"><svg viewBox="0 0 448 512" className={`${styles.socials} ${styles.linkdin}`}><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a>
                            <a className={styles.go} onClick={goHome}>Go!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}