import { Children, useContext, useState } from "react";
import { BuilderContext } from "../../contexts/Builder";
import Rig from "../Rig";
import RigBase from "../RigBase";
import styles from "./Platform.module.css"

const NUMBER_OF_RIGS = 9

const Platform = () => {
    const { state: { editMode, matrix } } = useContext(BuilderContext)
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

    const addRig = (position: number) => {
        setRigs({ ...rigs, [position]: true })
    }

    const removeRig = (position: number) => {
        setRigs({ ...rigs, [position]: false })
    }

    return (
        <div className={styles.platform}>
            {
                Children
                    .map(new Array(NUMBER_OF_RIGS)
                        .fill(""), (_, index) => (
                            <div>
                                <RigBase removeRig={removeRig} rigNumber={index} onClick={() => editMode && addRig(index)}>
                                    {
                                        rigs[index] ? <Rig rigId={index} matrix={matrix[index]} /> : null
                                    }
                                </RigBase>
                            </div>
                        )
                    )
            }
        </div>
    )
}

export default Platform;