import BasicBlock from "../components/Blocks/Basic"
import EmptyBlock from "../components/Blocks/Empty"

export const getAllBlocks = () => {
    return [
        { name: "Basic", component: BasicBlock, id: "b"},
        { name: "Empty", component: EmptyBlock, id: "e" },
    ]
}