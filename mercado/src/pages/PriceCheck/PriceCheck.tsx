import { toast } from 'react-toastify';
import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './PriceCheck.module.scss';
import { getProductById } from '../../apis/backend/backend.api';
import { Product } from '../../apis/backend/types/product.type';
import { useState } from 'react';

const PriceCheck = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [productNotFoundMessage, setProductNotFoundMessage] = useState<string | null>(null);

    async function handleIdChange(productId: number){
        if(productId){
            try {
                setProduct(await getProductById(productId));
                setProductNotFoundMessage(null);
            } catch (error: any) {
                if(error.response?.data?.message){
                    if(error.status === 404){
                        setProductNotFoundMessage(error.response.data.message);
                        setProduct(null);
                    }else {
                        toast.error(`ERRO: ${error.response.data.message}`);
                    }
                }else {
                    toast.error(`ERRO: ${error.message}`);
                }
            }
        }else {
            setProduct(null);
        }
    }

    return (
        <div className={styles.PriceCheck}>
            <BackArrow/>
            <h1>Consulta de preço</h1>

            <div className={styles.input_box}>
                <label>Código do produto:</label>
                <input
                    type="number"
                    onChange={(event) => handleIdChange(Number(event.target.value))}
                />
            </div>


            {product && (
                <>
                    <h4> Nome: </h4>
                    <p> {product.name} </p>

                    <h4> Descrição: </h4>
                    <p> {product.description ?? 'Sem descrição'} </p>

                    <h4> Preço: </h4>
                    <p>R${String(Number(product.price).toFixed(2)).replace('.', ',')}</p>
                </>
            )}
            {productNotFoundMessage && (
                <p> {productNotFoundMessage} </p>
            )}
        </div>
    );
}

export default PriceCheck;