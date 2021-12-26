import { FC, useContext, useState } from "react";
import { BuilderContext } from "../../contexts/Builder";
import Panel from "../Panel";
import styles from "./Rigbase.module.css";
import OutsideClickHandler from 'react-outside-click-handler';

interface RigBaseProps {
    onClick(): void;
    removeRig(rig: number): void;
    rigNumber: number;
}

const RigBase: FC<RigBaseProps> = ({ onClick, children, rigNumber, removeRig }) => {
    const [panel, setShowPanel] = useState(false)
    const { state: { editMode } } = useContext(BuilderContext)

    const handleClick = () => {
        editMode && setShowPanel(true)
        onClick()
    }
    return (
        <div onClick={handleClick} className={styles.rigbase}>
            {children}
            {
                panel && (
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setShowPanel(false)
                        }}
                    >
                        <Panel onClose={() => setShowPanel(false)} removeRig={removeRig} rigNumber={rigNumber} />
                    </OutsideClickHandler>
                )
            }
        </div>
    )
}

export default RigBase;