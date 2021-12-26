import Image from "next/image";
import { useContext, useRef } from "react";
import { BuilderContext } from "../../contexts/Builder";
import { setActiveBlock, setRunning } from "../../contexts/Builder/actions";
import styles from "./Controls.module.css"

const Controls = () => {
    const { state: { runDuration, sequence, isRunning }, dispatch } = useContext(BuilderContext)
    const progressBar = useRef<null | HTMLDivElement>(null)

    const runSequence = () => {
        setRunning(dispatch, true);
        (window as any).simonCounter = 0;

        const sequenceStep = () => {
            setActiveBlock(dispatch, sequence[(window as any).simonCounter])
    
            if (progressBar.current) {
                progressBar.current.classList.add(styles.loading)
            }
    
            (window as any).simonCounter++
        }

        (window as any).simonRun = setInterval(() => {
            if ((window as any).simonCounter === 9) {
                stopRun()
                return
            }
             
            sequenceStep()

        }, runDuration / sequence.length - 1);

        sequenceStep()
    }

    const stopRun = () => {
        setRunning(dispatch, false)
        progressBar.current?.classList.remove(styles.loading)
        clearInterval((window as any).simonRun)
        setActiveBlock(dispatch, "0")
    }

    return (
        <div className={styles.controls}>
            <div onClick={() => !isRunning && runSequence()}>
                <Image src="/play.svg" width="50" height="50" />
            </div>
            <div onClick={() => isRunning && stopRun()}>
                <Image src="/pause.svg" width="27" height="27" />
            </div>
            <div className={styles['bar-container']}>
                <div ref={progressBar} className={styles.bar}>
                </div>
            </div>
        </div>
    )
}

export default Controls;