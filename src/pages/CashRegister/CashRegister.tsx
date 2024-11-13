import { useEffect, useState } from 'react';
import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './CashRegister.module.scss';
import { getProducts } from '../../apis/fake-backend.api';

const CashRegister = () => {
    const [items, setItems] = useState<any[]>([]);
    const [products, setProducts] = useState<any>([]);
    const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>([]);

    useEffect(() => {
        async function executeGetProducts(){ setProducts(await getProducts()); }

        executeGetProducts();
    }, []);

    return (
        <div className={styles.CashRegister}>
            <BackArrow/>
            
            <h1>Caixa</h1>

            <div className={styles.input_container}>
                <div className={styles.input_box}>
                    <label> Código </label>
                    <input type="number"/>
                </div>

                <div className={styles.input_box}>
                    <label> Quantidade </label>
                    <input type="number"/>
                </div>
            </div>

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