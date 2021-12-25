import { Children, useContext, useState } from "react";
import { BuilderContext } from "../../contexts/Builder";
import { Matrix } from "../matrix";
import Rig from "../Rig";
import RigBase from "../RigBase";
import styles from "./Platform.module.css"

const NUMBER_OF_RIGS = 9

const Platform = () => {
    const {state: {editMode}} = useContext(BuilderContext)
    const [rigs, setRigs] = useState<Record<number, boolean>>({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
    })
    const [matrix, setMatrix] = useState<Matrix>([
        ['e', 'e', 'e'],
        ['e', 'e', 'e'],
        ['e', 'e', 'e']
    ])
    
    const addRig = (position: number) => {
        console.log("added", position)
        setRigs({...rigs, [position]: true })
    }
    
    const removeRig = (position: number) => {
        console.log("removed", position)
        setRigs({...rigs, [position]: false })
    }

    return (
        <div className={styles.platform}>
            {
                Children
                    .map(new Array(NUMBER_OF_RIGS)
                        .fill(""), (_, index) => <RigBase removeRig={removeRig} rigNumber={index} onClick={() => editMode && addRig(index)}>
                            {
                                rigs[index] ? <Rig matrix={matrix} /> : null
                            }
                        </RigBase>)
            }
        </div>
    )
}

export default Platform;