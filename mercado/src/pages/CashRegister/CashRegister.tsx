import { useState } from 'react';
import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './CashRegister.module.scss';
import { Product } from '../../apis/backend/types/product.type';
import { getProductById } from '../../apis/backend/backend.api';
import { toast } from 'react-toastify';

const CashRegister = () => {
    const [items, setItems] = useState<any[]>([]);
    const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [productNotFoundMessage, setProductNotFoundMessage] = useState<string | null>(null);

    async function handleProductIdChange(id: number){
        if (id) {
            try {
                const product: Product = await getProductById(id);
                setProduct(product);
            } catch (error: any) {
                if (error.response?.data?.message) {
                    if (error.status == 404) {
                        setProductNotFoundMessage(error.response.data.message);
                    } else {
                        toast.error(`Erro: ${error.response.data.message}`);
                    }
                }else {
                    toast.error(`Erro: ${error.message}`);
                }

                setProduct(null);
            }
        } else {
            setProduct(null);
            setProductNotFoundMessage(null);
        }
    }

    return (
        <div className={styles.CashRegister}>
            <BackArrow/>
            
            <h1>Caixa</h1>

            <div className={styles.input_container}>
                <div className={styles.input_box}>
                    <label> Código </label>
                    <input
                        className={styles.id}
                        type="number"
                        min="1"
                        step="1"
                        onChange={(event) => handleProductIdChange(Number(event.target.value))}
                    />
                </div>

                <div className={styles.input_box}>
                    <label> Quantidade </label>
                    <input type="number"/>
                </div>
            </div>

            {productNotFoundMessage && (
                <p> {productNotFoundMessage} </p>
            )}
            {product && !productNotFoundMessage && (
                <p> {product.name} - R${String(Number(product.price).toFixed(2)).replace('.', ',')} - {product.description ?? 'Sem descrição'} </p>
            )}

            <button onClick={() => {
                setItems(prev => {
                    return [
                        ...prev,
                        'Arroz Tio João 1Kg - Qtd: 3 - Unit: R$ 3.99 Total: R$ 11.97'
                    ];
                });
            }}>
                Adicionar à lista
            </button>

            <h3> Lista de produtos </h3>
            
            {items && items.length > 0 && (
                <>
                    <div className={styles.items_list}>
                        {items.map((item, index) => {
                            return (
                                <div
                                    className={`${styles.item} ${selectedItemsIndexes.includes(index) ? styles.selected : styles.not_selected}`}
                                    key={index}
                                    onClick={() => setSelectedItemsIndexes(prev => [...prev, index])}
                                >
                                    <p> {item} </p>
                                </div>
                            );
                        })}
                    </div>

                    {selectedItemsIndexes && selectedItemsIndexes.length > 0 && (
                        <button onClick={() => setSelectedItemsIndexes([])}>
                            Remover da lista
                        </button>
                    )}
                </>
            )}

            {!items || items.length < 1 && (
                <p> Nenhum item adicionado à lista </p>
            )}

            <div className={styles.input_container}>
                <div className={styles.input_box}>
                    <label> Total </label>
                    <p> R$ 19.95 </p>
                </div>
                <div className={styles.input_box}>
                    <label> Valor pago: </label>
                    <input type="number"/>
                </div>
                <div className={styles.input_box}>
                    <label> Troco </label>
                    <p> R$ 0.05 </p>
                </div>
            </div>
        </div>
    );
}

export default CashRegister;