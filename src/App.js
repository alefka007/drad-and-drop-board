import './index.css';

import { Board } from "./components/Board";
import { boardData } from "./data";

const App = () => {
  return (
    <div className="App">
      <Board boardData={boardData} />
    </div>
  );
}

export default App;
