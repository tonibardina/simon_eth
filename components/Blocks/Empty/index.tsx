import { Block } from "../../../types";
import styles from "./EmptyBlock.module.css";

interface EmptyBlockProps extends Block {}

const EmptyBlock = ({ onClick, selected }: EmptyBlockProps) => (
    <div onClick={onClick} className={`${styles["empty-block"]} ${selected ? styles.selected : ""}`}>
    </div>
)

export default EmptyBlock;