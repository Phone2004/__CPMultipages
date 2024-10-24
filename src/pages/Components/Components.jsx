import "./Components.css";
import Counter from "./Counter/Counter";
import Timer from "./Timer/Timer";
import Add from "./Add/Add";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Temps from "./Temps/Temps";
function Components() {
  return (
    <div className="main-container">
      <h1 className="badge bg-dark">REACT COMPONENTS</h1>
      <div className="container">
        <div className="con-timer">
          <Counter className="counter" value={0} />

          <Timer />
        </div>
        <div className="add">
          <Add />
        </div>
        <div className="temps">
          <Temps />
        </div>
      </div>
      
      <h2 className="badge bg-dark">
        นายพงศ์ภีรา พันณะกิจ รหัสนักศึกษา 66023450
      </h2>
    </div>
  );
}

export default Components;
