import './App.css';
import {useState} from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import SetThemeContext from './context/SetThemeContext';
function App() {
  const [theme2, updateTheme2] = useState("bg-light");
  return (
    <SetThemeContext.Provider value={[theme2, updateTheme2]}>
      <div className={'App ' + theme2 }>
        <Header/>
        <Characters/>
      </div>
    </SetThemeContext.Provider>
  );
}

export default App;
