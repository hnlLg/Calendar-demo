import './App.css';
import { EVENTS } from './Events';
import Scheduler from './main/Scheduler';

function App() {
  return (
    <div className="App">
      <Scheduler events={EVENTS} />
    </div>
  );
}

export default App;
