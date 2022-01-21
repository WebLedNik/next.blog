import React from "react"
import styles from "../styles/Chip.module.css"

interface IProps {
    title: string,
    active?: boolean
}

const Chip: React.FC<IProps> = ({title, active}) => {
    return (
        <div className={active ? `${styles.chip} ${styles.chip_active}` : styles.chip}>
            <span className={styles.chip__title}>{title}</span>
        </div>
    )
}

export default Chip
