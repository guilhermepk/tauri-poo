import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './PriceCheck.module.scss';

const PriceCheck = () => {
    return (
        <div className={styles.PriceCheck}>
            <BackArrow/>
            <h1>Consulta de preço</h1>

            <div className={styles.input_box}>
                <label>Código do produto:</label>
                <input type="number"/>
            </div>

            <h4> Descrição: </h4>
            <p> Desodorante </p>

            <h4> Valor: </h4>
            <p>R$ 11.90</p>
        </div>
    );
}

export default PriceCheck;