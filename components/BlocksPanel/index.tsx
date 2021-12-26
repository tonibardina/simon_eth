import styles from "./BlocksPanel.module.css";
import { useContext, useState } from "react";
import { getAllBlocks } from "../../api";
import { updateBlock } from "../../contexts/Builder/actions";
import { BuilderContext } from "../../contexts/Builder";

const BlocksPanel = () => {
    const { dispatch } = useContext(BuilderContext)
    const [minimized, setMinimized] = useState(true)
    return (
        <div className={styles["blocks-panel"]}>
            <h4 onClick={() => setMinimized(minimized => !minimized)} className={`${styles.title} ${minimized ? styles.minimized : ""}`}>Blocks</h4>
            {
                !minimized && (
                    <div className={styles["blocks-panel-dropdown"]}>
                        {
                            getAllBlocks().map(block => {
                                const { component: Component } = block

                                return <div key={block.name} className={styles["block-row"]}>
                                    <p>{block.name}</p>
                                    <div onClick={() => updateBlock(dispatch, block.id)} className={styles["component-container"]}>
                                        <Component inSequenceBlock={false} selected={false} />
                                    </div>
                                </div>
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default BlocksPanel;