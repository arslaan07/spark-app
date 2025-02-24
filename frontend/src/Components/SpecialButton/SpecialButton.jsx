import styles from "./SpecialButton.module.css";

const SpecialButton = ({ name, type }) => {
    return <button className={`${styles.button} ${styles[type]}`}></button>;
  };

export default SpecialButton;
