import Image from "next/image";
import { ReactElement } from "react";
import styles from "./Options.module.css"

interface OptionsProps {
    onClickBuildOption(): void;
    onClickPlayOption(): void;
}

const Options = ({onClickBuildOption, onClickPlayOption}: OptionsProps): ReactElement => {
    return (
        <div className={styles["options"]}>
          <div onClick={onClickPlayOption} className={styles.card}>
            <div className={styles["img-container"]}>
              <Image width="50" height="50" src="/eth.png" />
            </div>
            <h2>Earn <span className={styles["text-gradient"]}>ETH</span> by playing</h2>
            <p>
              Players with best score can earn some ETH as a trophy!
            </p>
          </div>
          <div onClick={onClickBuildOption} className={styles.card}>
            <div className={styles["wrench-container"]}>
              <p style={{fontSize: 50}}>&#128295;</p>
            </div>
            <h2>Earn <span className={styles["text-gradient"]}>ETH</span> by building</h2>
            <p>
              Be the most loved builder and you will be rewarded!
            </p>
          </div>
        </div>
    )
}

export default Options;