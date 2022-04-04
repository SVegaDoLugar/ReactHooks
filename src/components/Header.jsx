import React, {useState, useContext} from 'react';
import SetThemeContext from '../context/SetThemeContext';
import '../styles/Header.css';
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [theme, updateTheme] = useContext(SetThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
        theme === "bg-light" ? updateTheme("bg-dark") : updateTheme("bg-light");
    }

    return (
        <div className="Header">
            <h1>ReactHooks</h1>
            <button type="button" onClick={handleClick}>
                {darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
        </div>
    );
}

export default Header;