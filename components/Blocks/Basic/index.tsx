import { Block } from "../../../types";
import styles from "./BasicBlock.module.css"

export interface BasicBlockProps extends Block {}

const BasicBlock = ({active, selected, onClick, inSequenceBlock}: BasicBlockProps) => (
    <div onClick={onClick} className={`${styles.block} ${active ? styles.block_active : ''} ${selected ? styles.selected : ""} ${inSequenceBlock ? styles["in-sequence"] : ""}`}>
    </div>
)

export default BasicBlock;