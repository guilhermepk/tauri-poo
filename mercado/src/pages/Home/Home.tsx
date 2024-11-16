import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import styles from './Home.module.scss';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useState } from 'react';
import { toast } from 'react-toastify';


const Home = () => {
    const navigate = useNavigate();

    async function handleClose (){
        try {
            const currentWindow = getCurrentWindow();
            await currentWindow.close();
        } catch (error) {
            toast.error(`Erro: ${error}`, {
                // position: "top-l"
              });
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
        </div>
    );
}

export default Home;