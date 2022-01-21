import React, {useState} from "react";
import Icon from "@mdi/react";
import {mdiMagnify} from '@mdi/js';

const Searcher = () => {
    const [searched, setSearched] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleBlur = () => {
        setSearched("")
    }

    return (
        <form onSubmit={handleSubmit} className={'searcher'}>
            <label>
                <input onBlur={() => handleBlur()} className={'searcher__input'} placeholder={'Поиск'} value={searched}
                       type="text" id="searcher"
                       onChange={e => setSearched(e.target.value)}/>
            </label>
            <Icon className={'searcher__icon'} path={mdiMagnify} size={0.9}/>
        </form>
    )
}

export default Searcher
