import { ReactElement, useEffect, useRef } from "react";

import styles from "./Builder.module.css"

const Builder = (): ReactElement | void => {
    const editor = useRef<Record<any, any>>()

    useEffect(() => {
        editor.current = (window as any).ace.edit("ace-editor");

        if (editor.current) {
            editor.current.setTheme("ace/theme/monokai");
            editor.current.session.setMode("ace/mode/javascript");
        }
    }, [])

    const exportCode = () => {
        const code = editor.current?.getValue()
        console.log(JSON.parse(JSON.stringify(code)))
    }

    return (
        <div className={styles.container}>
        <div className={styles.builder}>
            <div className={styles.editor} id="ace-editor"></div>
        </div>
        <button onClick={exportCode} className={styles["export-code"]}>Build</button>
        </div>
    )
}

export default Builder;