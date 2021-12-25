import { Children } from "react"
import BasicBlock from "../Blocks/Basic"
import { Matrix } from "../matrix"
import styles from "./Rig.module.css"

interface RigProps {
    matrix: Matrix;
    activeBlockId?: number;
}

const Rig = ({ matrix, activeBlockId }: RigProps) => {
    const getBlockByIdentifier = (blockId: number | string) => {
        const getBlock = (blockId: string | number) => {
            return {
                e: null,
                1: BasicBlock,
                2: BasicBlock,
                3: BasicBlock,
                4: BasicBlock,
                5: BasicBlock,
                6: BasicBlock,
                7: BasicBlock,
                8: BasicBlock,
                9: BasicBlock,
            }[blockId]
        }
        const Block = getBlock(blockId)
        return Block
    }

    const EmptyBlock = () => (
        <div className={styles["empty-block"]}>
        </div>
    )

    return (
        <div className={styles.rig}>
            {
                Children.map(
                    matrix
                    .flat(),
                    ((blockId) => {
                        const Component = getBlockByIdentifier(blockId)

                        return Component ? <Component active={blockId === activeBlockId} /> : <EmptyBlock />
                    }))
            }
        </div>
    )
}

export default Rig;