import React, {useState} from "react";
import Icon from "@mdi/react";
import { mdiMagnify } from '@mdi/js';
import styles from '../styles/Searcher.module.css'

const Searcher = () => {
    const [searched, setSearched] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className={styles.searcher}>
            <label htmlFor={'searcher'}/>
            <input placeholder={'Search'} value={searched} type="text" id="searcher" onChange={e => setSearched(e.target.value)}/>
            <button type={'submit'}>
                <Icon path={mdiMagnify} size={1} color={'white'}/>
            </button>
        </form>
    )
}

export default Searcher
