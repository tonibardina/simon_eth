import Image from "next/image";
import { FC } from "react";
import styles from "./FullScreen.module.css";

interface FullScreenProps {
    title?: string;
    onClose(): void;
}

const FullScreen: FC<FullScreenProps> = ({ children, title, onClose }) => {
    return <div className={styles.fullscreen}>
        <div className={styles.title}>
            {title && <h4>Blocks</h4>}
            <div onClick={onClose}>
                <Image src="/close.svg" width="15" height="15" />
            </div>
        </div>
        {children}
    </div>
}

export default FullScreen;