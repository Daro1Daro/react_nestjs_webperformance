import logo from './logo.svg';
import './App.css';

function App() {
  const fetchApi = () => {
    fetch('/services')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button type={'button'} onClick={fetchApi}>Kliknij!</button>
      </header>
    </div>
  );
}

export default App;
