import { MouseEvent } from "react"
import styles from "./Panel.module.css"

interface PanelProps {
    removeRig(rig: number): void;
    onClose(): void;
    rigNumber: number;
}

const Panel = ({removeRig, rigNumber, onClose}: PanelProps) => {
    const removeRigHandler = (e: MouseEvent<HTMLLIElement>) => {
        e.stopPropagation()
        removeRig(rigNumber)
        onClose()
    }
    return (
        <div className={styles.panel}>
            <ul>
                <li className={styles.close} onClick={removeRigHandler}>Remove Rig</li>
            </ul>
        </div>
    )
}

export default Panel;