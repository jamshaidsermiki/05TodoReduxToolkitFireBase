import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";



let initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoss",
  initialState,
  reducers: {
    loadTodo(state, action){
      state.todos = action.payload
    },
    addTodo(state, action) {
      let newtodo = {
        checked: false,
        todo: action.payload,
      };
    try {
      if (action.payload !== "") {
        const todoRef = collection(db, "todos");
        addDoc(todoRef, newtodo);
        newtodo = {...newtodo, id:Date.now()}
        state.todos.unshift(newtodo);
      }
    } catch (error) {
      console.log(error);
    }
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      try {
      deleteDoc(doc(db, "todos", action.payload));
      console.log("Contact Deleted Successfully");
    } catch (error) {
      console.log("delete err: ", error);
    }
    },
    EditTodo(state, action) {
      console.log(action.payload[0]);
      console.log(action.payload[1]);
      state.todos = state.todos.map((data) =>
        data.id == action.payload[0]
          ? { ...data, todo: action.payload[1] }
          : data
      );

      try {
      const todoRef = doc(db, "todos", action.payload[0]);
      updateDoc(todoRef, {
        todo: action.payload[1],
        checked: false,
      });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    },
  },
});

export const { addTodo, deleteTodo, EditTodo, loadTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
