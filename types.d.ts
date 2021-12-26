export interface Block {
    selected: boolean;
    onClick?(): void;
    active?: boolean;
    inSequenceBlock: boolean;
}