import React, { useEffect } from "react";
import { fetchTodos } from "../../data/todos";
import { useState } from "react";
import "./Todo.css";

function Todo() {
  // todosRaw -> filters -> todos -> display
  //read todosRaw
  const [todosRaw, setTodosRaw] = useState([]);

  //filters (bypass)
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //todos
  const [todos, setTodos] = useState([]);

  //display
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);


  useEffect(() => {
    console.log(itemsPerPage);
    setNumPages(Math.ceil(todos.length / itemsPerPage));
    setCurPage(1);
  }, [itemsPerPage, todos.length]);

  useEffect(() => {
    console.log(onlyWaiting);
  }, [onlyWaiting]);

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); //load

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  return (
    <div className="todo-container">
      {/* filter */}
      <div className="filter-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onClick={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />
          <label
            className="form-check-label"
            htmlForfor="flexSwitchCheckChecked"
          >
            Show only waiting
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ width: "200px" }}
          onChange={ (e) => {setItemsPerPage(e.target.value) } }
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ textAlign: "right" }}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {/*           
          <tr>
            <td>
              <span className="badge bg-secondary">1</span>
            </td>
            <td>Mark</td>
            <td style={{ textAlign: "right" }}>
              <span className="badge bg-warning">
                waiting&nbsp;
                <span className="bi bi-clock"></span>
              </span>
              &nbsp;
              <button className="btn btn-danger">
                <span className="bi bi-trash"></span>
              </button>
            </td>
          </tr>
*/}
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>
                  <span className="badge bg-secondary">{todo.id}</span>
                </td>
                <td>{todo.title}</td>
                <td style={{ textAlign: "right" }}>
                  <span
                    className={
                      "badge " + (todo.completed ? "bg-success" : "bg-warning")
                    }
                  >
                    {todo.completed ? "done" : "waiting"}&nbsp;
                    <span
                      className={
                        "bi " + (todo.completed ? "bi-check" : " bi-clock")
                      }
                    ></span>
                  </span>
                  &nbsp;
                  <button className="btn btn-danger">
                    <span className="bi bi-trash"></span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* page controls */}

      <div className="page-control-container">
        <button className="btn btn-outline-primary todo-spacing" onClick={ () => {setCurPage(1)}} disabled={curPage <= 1}>First</button>
        <button className="btn btn-outline-primary todo-spacing" onClick={ () => {curPage > 1 && setCurPage(curPage - 1)}} disabled={curPage <= 1}>
          Previous
        </button>
        <span className="todo-spacing">{curPage}&nbsp;/&nbsp;{numPages}</span>
        <button className="btn btn-outline-primary todo-spacing" onClick={ () => {curPage < numPages && setCurPage(curPage + 1)}} disabled={curPage >= numPages}>Next</button>
        <button className="btn btn-outline-primary todo-spacing" onClick={ () => {setCurPage(numPages)}} disabled={curPage >= numPages}>Last</button>
      </div>
    </div>
  );
}

export default Todo;
