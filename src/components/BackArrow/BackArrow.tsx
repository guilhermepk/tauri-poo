import { FaArrowAltCircleLeft } from 'react-icons/fa';
import styles from './BackArrow.module.scss';

const BackArrow = () => {
    return (
        <div className={styles.BackArrow} onClick={() => window.history.back()}>
            <FaArrowAltCircleLeft className={styles.back_icon}/>
        </div>
    );
}

export default BackArrow;