import { FC, useContext, useEffect, useRef, useState } from "react";
import { BuilderContext } from "../../contexts/Builder";
import Panel from "../Panel";
import styles from "./Rigbase.module.css";

interface RigBaseProps {
    onClick(): void;
    removeRig(rig: number): void;
    rigNumber: number;
}

const RigBase: FC<RigBaseProps> = ({onClick, children, rigNumber, removeRig}) => {
    const rig = useRef<null | HTMLDivElement>(null)
    const [panel, setShowPanel] = useState(false)
    const {state: {editMode}} = useContext(BuilderContext)

    useEffect(() => {
        const togglePanel = (e: Event) => {
            const {target} = e

            if (rig.current?.contains(target as HTMLElement) && editMode) {
                setShowPanel(true)
            } else {
                setShowPanel(false)
            }
        }

        window.addEventListener('click', togglePanel)

        return () => window.removeEventListener('click', togglePanel)

    }, [editMode, setShowPanel])
    return (
        <div ref={rig} onClick={onClick} className={styles.rigbase}>
            {children}
            {panel && <Panel onClose={() => setShowPanel(false)} removeRig={removeRig} rigNumber={rigNumber} />}
        </div>
    )
}

export default RigBase;