import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import styles from './Home.module.scss';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useState } from 'react';


const Home = () => {
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    async function handleClose (){
        try {
            const currentWindow = getCurrentWindow();
            await currentWindow.close();
        } catch (e) {
            setError(e);
        }
      };

    return (
        <div className={styles.Home}>
            <img src={logo} alt='logo' className={styles.logo}/>

            <p> Versão 1.0.0 </p>

            <button onClick={() => navigate('cash-register')}> Caixa </button>
            <button onClick={() => navigate('price-check')}> Verificador de preço </button>
            <button onClick={() => navigate('about')}> Sobre o sistema </button>
            <button onClick={() => handleClose()}> Sair </button>

            {error && (
                <p> Erro: {error} </p>
            )}
        </div>
    );
}

export default Home;