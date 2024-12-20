import { useEffect, useState } from 'react';
import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './CashRegister.module.scss';
import { Product } from '../../apis/backend/types/product.type';
import { createPurchase, getProductById } from '../../apis/backend/backend.api';
import { toast } from 'react-toastify';
import { ProductListItem } from '../../common/types/product-list-item';

const CashRegister = () => {
    const [items, setItems] = useState<ProductListItem[]>([]);
    const [productId, setProductId] = useState<number>(0);
    const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [productNotFoundMessage, setProductNotFoundMessage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [changeAmount, setChangeAmount] = useState<number | null>(null);
    const [paidValue, setPaidValue] = useState<number>(0);
    
    useEffect(() => {
        setTotal(() => {
            return items.reduce((previousItem, currentItem) => {
                return previousItem + currentItem.product.price * currentItem.quantity;
            }, 0);
        });

    }, [items]);

    useEffect(() => {
        if(paidValue && total){
            setChangeAmount(paidValue - total);
        }else{
            setChangeAmount(null);
        }
    }, [paidValue, total]);

    async function handleProductIdChange(id: number){
        setProductId(id);
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

    async function handlePurchaseRegister(){
        if(!(changeAmount == undefined || changeAmount == null)){
            try {
                const response = await createPurchase(items, changeAmount, paidValue);
                toast.success(response.message);
            } catch (error: any) {
                if (error.response?.data?.message) {
                    toast.error(`Erro: ${error.response.data.message}`);
                }else {
                    toast.error(`Erro: ${error.message}`);
                }
            }
        }else {
            toast.warn(`Valor de troco não definido`);
        }
    }

    function handleItemClick(index: number) {
        setSelectedItemsIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index]
        );
    }

    function handleRemoveItems(){
        setItems(prev => prev.filter((_, index) => {
            return !selectedItemsIndexes.includes(index);
        }));
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
                        value={productId}
                        onChange={(event) => handleProductIdChange(Number(event.target.value))}
                    />
                </div>

                <div className={styles.input_box}>
                    <label> Quantidade </label>
                    <input
                        type="number"
                        min="1"
                        step="1"
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                    />
                </div>
            </div>

            {productNotFoundMessage && (
                <p> {productNotFoundMessage} </p>
            )}
            {product && !productNotFoundMessage && (
                <p> {product.name} - R${String(Number(product.price).toFixed(2)).replace('.', ',')} - {product.description ?? 'Sem descrição'} </p>
            )}

            {product && quantity > 0 &&  (
                <button onClick={() => {
                    setItems(prev => {
                        return [
                            ...prev,
                            {
                                product,
                                quantity,
                                total: quantity * product.price
                            }
                        ];
                    });

                    setProduct(null);
                    setQuantity(0);
                    setProductId(0);
                }}>
                    Adicionar à lista
                </button>
            )}

            <h3> Lista de produtos </h3>
            
            {items && items.length > 0 && (
                <>
                    <div className={styles.items_list}>
                        {items.map((item, index) => {
                            return (
                                <div
                                    className={`${styles.item} ${selectedItemsIndexes.includes(index) ? styles.selected : styles.not_selected}`}
                                    key={index}
                                    onClick={() => handleItemClick(index)}
                                >
                                    <p>
                                        {
                                            item.product.name
                                        } {
                                            item.product.description ? `- ${item.product.description}` : ''
                                        } - R${
                                            String(Number(item.product.price).toFixed(2)).replace('.', ',')
                                        } - Qtd: {
                                            item.quantity
                                        } - Total: R${
                                            String(Number(item.total).toFixed(2)).replace('.', ',')
                                        }
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {selectedItemsIndexes && selectedItemsIndexes.length > 0 && (
                        <button onClick={() => handleRemoveItems()}>
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
                    <p> R${String(Number(total).toFixed(2)).replace('.', ',')} </p>
                </div>
                <div className={styles.input_box}>
                    <label> Valor pago: </label>
                    <input
                        className={styles.paid_value}
                        type="number"
                        min={total}
                        value={paidValue}
                        onChange={(event) => setPaidValue(Number(event.target.value))}
                    />
                </div>
                <div className={styles.input_box}>
                    <label> Troco </label>
                    {changeAmount && (
                        <p>
                            R${String(Number(changeAmount).toFixed(2)).replace('.', ',')}
                        </p>
                    )}
                    {changeAmount === undefined || changeAmount === null && (
                        <p>N/A</p>
                    )}
                </div>
            </div>

            {
                !(changeAmount == undefined || changeAmount == null)
                && paidValue
                && changeAmount >= 0
                && (
                    <button
                        onClick={() => handlePurchaseRegister()}
                    >
                        Registrar compra
                    </button>
                )
            }
        </div>
    );
}

export default CashRegister;