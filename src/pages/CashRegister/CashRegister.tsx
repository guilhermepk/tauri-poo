import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './CashRegister.module.scss';

const CashRegister = () => {
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

            <button>
                Adicionar à lista
            </button>

            <h3> Lista de produtos </h3>

            <div className={styles.items_list}>
                <div className={styles.item}> <p> Arroz Tio João 1Kg - Qtd: 3 - Unit: R$ 3.99 Total: R$ 11.97 </p> </div>
                <div className={styles.item}> <p> Arroz Tio João 1Kg - Qtd: 3 - Unit: R$ 3.99 Total: R$ 11.97 </p> </div>
                <div className={styles.item}> <p> Arroz Tio João 1Kg - Qtd: 3 - Unit: R$ 3.99 Total: R$ 11.97 </p> </div>
            </div>

            <button> Excluir </button>

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