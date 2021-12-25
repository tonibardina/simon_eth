import { BlockProps } from "../block";
import styles from "./BasicBlock.module.css"

const BasicBlock = ({active, onClick}: BlockProps) => (
    <div onClick={onClick} className={`${styles.block} ${active ? styles.block_active : ''}`}>
    </div>
)

export default BasicBlock;