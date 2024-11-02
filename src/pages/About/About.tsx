import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './About.module.scss';
import logo from '../../assets/img/logo.png'

const About = () => {
    return (
        <div className={styles.About}>
            <BackArrow/>
            <h1>Sobre o sistema</h1>

            <img src={logo} alt='logo' className={styles.logo}/>

            <p> Versão 1.0.0 </p>

            <h3> Desenvolvedor </h3>
            <p> Guilherme Prigol Kramer </p>

            <h3> Contato </h3>
            <p> (42) 9 8879-2144 </p>
        </div>
    );
}

export default About;