import './App.css';
import { EVENTS } from './Events';
import Scheduler from './main/Scheduler';

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#f8f9ff" }}>
      <Scheduler events={EVENTS} />
    </div>
  );
}

export default App;
