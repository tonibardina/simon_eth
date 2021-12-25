import type { NextPage } from 'next'
import Router from 'next/router'
import Image from 'next/image'
import Footer from '../components/Footer'
import HeadComponent from '../components/Head'
import Options from '../components/Options'
import styles from '../styles/Home.module.css'

const random = () => Math.floor(Math.random() * 2000)


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadComponent />

      <header className={styles.header}>
        <p className={`${styles["text-gradient"]} ${styles.logo}`}>Simon</p>
        <nav>
          <button>Build</button>
          <button>Play</button>
        </nav>
      </header>

      <main className={styles.main}>
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
        <section>
          <h1 className={styles.title}>
            &#128075; Welcome to <span className={styles["text-gradient"]}>Simon</span>
          </h1>
          <Options onClickPlayOption={() => null} onClickBuildOption={() => Router.push("/builder")} />
        </section>
        <section className={`${styles["bg-purple"]} ${styles["build-section"]}`} id="build">
          <div className={styles['build-section--text']}>
            <h2>Be the most loved builder</h2>
            <p>Earn Ethereum by creating the most liked game levels by the players</p>
          </div>
          <div className={styles['build-section--img-container']}>
            <Image width="350" height="350" src="/heart.png" />
          </div>
          <button onClick={() => Router.push("/builder")}>Start Building</button>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
