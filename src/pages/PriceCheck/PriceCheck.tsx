import BackArrow from '../../components/BackArrow/BackArrow';
import styles from './PriceCheck.module.scss';

const PriceCheck = () => {
    return (
        <div className={styles.PriceCheck}>
            <BackArrow/>
            <h1>Consulta de preço</h1>
        </div>
    );
}

export default PriceCheck;