import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import styles from './Home.module.scss';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
    const [backendMessage, setBackendMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const get = async () => {
            const api = axios.create({
                // baseURL: `${import.meta.env.TAURI_DEV_HOST}`
                baseURL: `http://127.0.0.1:3000/api`
            })

            console.log(api.defaults.baseURL)

            try {
                const response = await api.get('/users/teste')
                return response;
            } catch(error: any){
                console.log(error)
                setBackendMessage(JSON.stringify(error.message))
            }
        }

        const getData = async ()  => {
            const response = await get();
            if (response) setBackendMessage(response.data);
        }

        getData();
    }, []);

    async function handleClose (){
        try {
            const currentWindow = getCurrentWindow();
            await currentWindow.close();
        } catch (e) {
            toast.error(`Erro: ${e}`, {
                // position: "top-l"
              });
        }
      };

    return (
        <div className={styles.Home}>
            <img src={logo} alt='logo' className={styles.logo}/>

            <p> MENSAGEM: {backendMessage} </p>

            <p> Versão 1.0.0 </p>

            <button onClick={() => navigate('cash-register')}> Caixa </button>
            <button onClick={() => navigate('price-check')}> Verificador de preço </button>
            <button onClick={() => navigate('about')}> Sobre o sistema </button>
            <button onClick={() => handleClose()}> Sair </button>
        </div>
    );
}

export default Home;