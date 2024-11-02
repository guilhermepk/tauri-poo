import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './About.module.scss';

const About = () => {
    return (
        <div className={styles.About}>
            <BackArrow/>
            <h1>Sobre o sistema</h1>
        </div>
    );
}

export default About;