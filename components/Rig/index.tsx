import { Children, useContext } from "react"
import { BuilderContext } from "../../contexts/Builder"
import { clearUserSequence, setCreatingSequenceMode, setSelectedBlock, updateSequence, updateUserSequence } from "../../contexts/Builder/actions"
import { SEQUENCE_MAX_LENGTH } from "../../pages/builder"
import BasicBlock from "../Blocks/Basic"
import EmptyBlock from "../Blocks/Empty"
import { RigMatrix } from "../matrix"
import styles from "./Rig.module.css"
interface RigProps {
    matrix: RigMatrix;
    rigId: number;
}

const Rig = ({ matrix, rigId }: RigProps) => {
    const {state: {selectedBlock, userSequence, editMode, isCreatingSequence, sequence, activeBlock, isRunning}, dispatch} = useContext(BuilderContext)
    const sequenceIsCompleted = sequence.length === SEQUENCE_MAX_LENGTH

    const getBlockByIdentifier = (blockId: number | string) => {
        const getBlock = (blockId: string | number) => {
            return {
                e: null,
                b: BasicBlock,
            }[blockId]
        }
        const Block = getBlock(blockId)
        return Block
    }

    const handleBlockClick = (index: number) => {
        if (editMode) {
            setSelectedBlock(dispatch, `${rigId}${index}`)
        }

        if (isCreatingSequence) {
            if (!sequence.includes(`${rigId}${index}`) && !sequenceIsCompleted) {
                if (sequence.length === SEQUENCE_MAX_LENGTH-1) {
                    setCreatingSequenceMode(dispatch, false)
                }

                updateSequence(dispatch, `${rigId}${index}`)
            }
        }

        if (!editMode && !isCreatingSequence && !isRunning) {
            if (userSequence.length === 0 && `${rigId}${index}` === sequence[0]) {
                updateUserSequence(dispatch, `${rigId}${index}`)
                return
            }

            if (sequence[userSequence.length] === `${rigId}${index}`) {
                updateUserSequence(dispatch, `${rigId}${index}`)
                return
            }

            clearUserSequence(dispatch)
        }
    }

    const blockIsSelected = (index: number) => editMode && selectedBlock[0] === rigId.toString() && selectedBlock[1] === index.toString()

    return (
        <div className={styles.rig}>
            {
                Children.map(
                    matrix
                        .flat(),
                    ((blockId, index) => {
                        const Component = getBlockByIdentifier(blockId)

                        return (
                            <div className={styles["block-container"]}>
                                {
                                    Component
                                        ? <Component selected={blockIsSelected(index)} inSequenceBlock={editMode ? sequence.includes(`${rigId}${index}`) : userSequence.includes(`${rigId}${index}`)} active={activeBlock === `${rigId}${index}`} onClick={() => handleBlockClick(index)} />
                                        : <EmptyBlock inSequenceBlock={false} selected={blockIsSelected(index)} onClick={() => handleBlockClick(index)} />
                                }
                            </div>
                        )
                    }))
            }
        </div>
    )
}

export default Rig;