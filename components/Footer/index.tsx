import styles from "./Footer.module.css"

const Footer = () => (
    <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/toni-bardina-comas-4a435113a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🚀 Created by&nbsp;<span className={styles.bold}>Toni Bardina</span>
        </a>
    </footer>
)

export default Footer;