import logo from './logo.svg';
import './App.css';
import Scheduler from './main/Scheduler';
import { EVENTS } from './Events';

function App() {
  return (
    <div className="App">
     <Scheduler events={EVENTS} />
    </div>
  );
}

export default App;
