import React, { useState } from "react";
import { deleteTodo, EditTodo } from "./store/slices/todoSlices";
import { useDispatch } from "react-redux";

function Todo({ todoData }) {

  const dispatch = useDispatch()

  const [todoMsg, setTodoMsg] = useState(todoData.todo);
  const [checked, setChecked] = useState(todoData.checked);
  const [isEditable, setIsEditable] = useState(false);

  function handleCheckBox() {
    setChecked(!checked);
   // saveCheck(todoData.id, !checked);
    if(isEditable==true) setIsEditable(false)
  }

  function handleOnChangeTodo(e) {
    setTodoMsg(e.target.value);
  }

  function toggleEdit() {
    setIsEditable(!isEditable);
    dispatch(EditTodo([todoData.id, todoMsg]));
  }

  

  return (
    <div
      className="todo"
      style={checked ? { backgroundColor: "rgb(135, 87, 29)" } : {}}
    >
      <div className="c1">
        <input type="checkbox" onChange={handleCheckBox} checked={checked} />
        <input
          className={checked ? `underline${!isEditable}` : `edit${!isEditable}`}
          type="text"
          value={todoMsg}
          onChange={handleOnChangeTodo}
          disabled={!isEditable}
        />
      </div>
      <div className="c2">
        <button id="b1" onClick={toggleEdit} disabled={checked}>
          {isEditable ? "Save" : "Edit"}
        </button>
        <button
          id="b2"
          onClick={() => dispatch(deleteTodo(todoData.id))}
          value={todoData.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
