import { useState } from 'react';
import style from './styles.module.css';

import SearchIcon from './searchSvg.svg';
import { useAppContext } from '../../contexts/app';


type Props = {
    onSearch: (SearchValue: string) => void;

}


export const SearchInput = ({ onSearch }: Props) => {

    const { tenant } = useAppContext();

    const [focused, setFocused] = useState(false);
    const [SearchValue, setSarchValue] = useState('');
    const handlekeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // if (event.code === 'Enter') {
        onSearch(SearchValue);
        //}
    }


    return (
        <div className={style.container} style={{ borderColor: focused ? tenant?.mainColor : '#FFFF' }}>
            <div className={style.button} onClick={() => onSearch(SearchValue)}>
                <SearchIcon color={tenant?.mainColor} />
            </div>
            <input placeholder='Digite o nome do Produto!'
                type="text"
                className={style.input} onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)} onKeyUp={handlekeyup} value={SearchValue} onChange={(e) => setSarchValue(e.target.value)}>

            </input>
        </div>
    );
}