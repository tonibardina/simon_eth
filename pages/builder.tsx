import type { NextPage } from 'next'
import Image from "next/image";
import { useContext, useEffect, useState } from 'react'
import HeadComponent from '../components/Head'
import Platform from '../components/Platform'
import { BuilderContext, BuilderProvider } from '../contexts/Builder'
import { clearSequence, setCreatingSequenceMode, setEditMode } from '../contexts/Builder/actions'
import styles from '../styles/Builder.module.css'
import SimonContractJSON from "../artifacts/contracts/Simon.sol/Simon.json"
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import BlocksPanel from '../components/BlocksPanel';
import Controls from '../components/Controls';

const random = () => Math.floor(Math.random() * 2000)
export const SEQUENCE_MAX_LENGTH = 9

type User = {
    lvl: number;
    id: string;
}

const Builder: NextPage = () => {
    const { state: { editMode, isCreatingSequence, sequence }, dispatch } = useContext(BuilderContext)
    const [currentAccount, setCurrentAccount] = useState("");
    const [contract, setContract] = useState<any>(null);
    const [user, setUser] = useState<User | null>(null);
    const sequenceIsCompleted = sequence.length === SEQUENCE_MAX_LENGTH

    const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_URL!);

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = (window as any);

            if (!ethereum) {
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                setCurrentAccount(account);
            }

            (window as any).ethereum.on("UserRegistered", (user: User) => {
                setUser(user)
              });
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = (window as any);

            if (!ethereum) {
                window.open("https://metamask.io/download.html", "_blank")
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    useEffect(() => {
        async function effect() {
            const contract = new web3.eth.Contract(
                SimonContractJSON.abi as any,
                process.env.NEXT_PUBLIC_SIMON_ADDRESS,
                { from: currentAccount }
            );
            setContract(contract);
        }

        if (!contract && process.env.NEXT_PUBLIC_SIMON_ADDRESS && currentAccount && web3) {
            effect()
        }
    }, [currentAccount, contract, web3])

    const handleSequenceUpdate = () => {
        if (sequenceIsCompleted) {
            clearSequence(dispatch)
            return 
        }
        
        setCreatingSequenceMode(dispatch, !isCreatingSequence)
    }

    return (
        <div className={styles.container}>
            <HeadComponent />
            <div style={{ width: 200, height: 200, backgroundColor: "#f54fd4", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 150, height: 150, backgroundColor: "#4e4ef3", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 100, height: 100, backgroundColor: "#f54fd4", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 120, height: 120, backgroundColor: "#4e4ef3", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 70, height: 70, backgroundColor: "#f54fd4", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 90, height: 90, backgroundColor: "#4e4ef3", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 200, height: 200, backgroundColor: "#f54fd4", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 150, height: 150, backgroundColor: "#4e4ef3", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 100, height: 100, backgroundColor: "#f54fd4", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 120, height: 120, backgroundColor: "#4e4ef3", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 70, height: 70, backgroundColor: "#f54fd4", top: random(), left: random() }} className="random-gradient-circle"></div>
            <div style={{ width: 90, height: 90, backgroundColor: "#4e4ef3", top: random(), left: random() }} className="random-gradient-circle"></div>

            <div className={styles["editor-tools"]}>
                <h3>Builder</h3>
                <div className={styles.buttons}>
                    {currentAccount && user && <div>{user.lvl}</div>}
                    {!currentAccount && <button onClick={connectWallet} className={styles["connect-metamask"]}><Image src="/metamask.png" width="20" height="20" />&nbsp;Connect wallet</button>}
                    {editMode && <button onClick={handleSequenceUpdate} className={styles["sequence-button"]}>{sequenceIsCompleted ? "Clear sequence" : isCreatingSequence ? `Blocks left: ${SEQUENCE_MAX_LENGTH - sequence.length}` : "Create sequence"}</button>}
                    <button onClick={() => setEditMode(dispatch, !editMode)} className={styles["edit-button"]}>{editMode ? "Editting..." : "Edit"}</button>
                </div>
            </div>
            <Platform />
            <BlocksPanel />
            {!editMode && <Controls />}
        </div>
    )
}

const BuilderContainer = () => (
    <BuilderProvider>
        <Builder />
    </BuilderProvider>
)

export default BuilderContainer
