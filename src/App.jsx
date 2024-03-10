import {useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateLocalStorage, loadTodo } from "./store/slices/todoSlices";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "./config/firebase";

function App() {

  const todos = useSelector((state)=> state.todos)
  console.log(todos)

  const dispatch = useDispatch()
  
  
  const [input, setInput] = useState("");

  
  
   function handleTodo() {
     console.log(input);
     dispatch(addTodo(input));
     setInput('')
   }

  function search() {
    // if (event.key === "Enter") {
    //   addTodo()
    // }
  }

  ///////////////////////////////////

// useEffect(() => {
//   const getTodos = async () => {
//     try {
//       const todosRef = collection(db, "todos");
//       //const todosSnapshot = await getDocs(todosRef);// is slow

//       onSnapshot(todosRef, (snapshot) => {
//         const todosList = snapshot.docs.map((doc) => {
//           return {
//             id: doc.id,
//             ...doc.data(),
//           };
//         });
//         console.log("loaded", todosList);
//         console.log(typeof todosList[0].todo);
//         todosList.map(todo => dispatch(loadTodo(todo)))

//         //state.todos.push(todosList[0])
//         return todosList;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getTodos();
//   dispatch(loadTodo());
// }, []);

useEffect(() => {
  const todosRef = collection(db, "todos");
  const unsubscribe = onSnapshot(todosRef, (snapshot) => {
    const userData = snapshot.docs.map((doc) => {
    return {id: doc.id,
    ...doc.data(),}
    });
    dispatch(loadTodo(userData));
  });

  return unsubscribe;
}, []);


  console.log("outer", todos);

  return (
    <div className="todo-container">
      <nav className="header">
        <h1>Manage Your Todo List</h1>
      </nav>
      <div className="content">
        <div className="input-todo">
          <input
            type="text"
            placeholder="What todo next?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
          <button onClick={handleTodo}>Add Todo</button>
        </div>
        <div className="todos">
          {todos != [] && todos.length > 0 ? (
            todos.map((data) => <Todo todoData={data} key={data.id} />)
          ) : (
            <h1>no data yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
