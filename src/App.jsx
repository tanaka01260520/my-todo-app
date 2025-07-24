import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchTodo } from './components/SearchTodo';
import { AddTodo } from './components/AddTodo';
import { IncompleteTodo } from './components/IncompleteTodo';

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  // const [lastTodoTitle, setLastTodoTitle] = useState("");
  // const [lastTodoDetail, setLastTodoDetail] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    { id: Date.now(),title:"aaaaaaaa", detail: "楽しい" },
    { id: Date.now() + 1,title:"todo2", detail: "楽しいqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ" },
  ]);
  const [searchText, setSearchText] = useState("");


  const onChangeTodoTitle = (event) => {
    setTodoTitle(event.target.value);
    
  };

  const onChangeTododetail = (event) => {
    setTodoDetail(event.target.value);  
  }

  const onClickAdd = () => {
    if(todoTitle.length === 0){
      return;
    }
    const newTodos = [...incompleteTodos, { id: Date.now(),title: todoTitle, detail: todoDetail }];
    setIncompleteTodos(newTodos);
    // setLastTodoTitle(todoTitle);
    // setLastTodoDetail(todoDetail);
    setTodoTitle("");
    setTodoDetail("");
    setShowAddForm(false);
  };

  const onClickDelete = (id) => {
    const newTodos = incompleteTodos.filter((todo) => todo.id !== id); //filterは新しい関数を返すからスプレっト構文がいらない
    setIncompleteTodos(newTodos);


  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const filteredTodos = incompleteTodos.filter((todo) => {
    return todo.title.toLowerCase().includes(searchText.toLowerCase()) || //検索欄が空っぽの場合、includes("") はすべての文字列に対して「true」になる
           todo.detail.toLowerCase().includes(searchText.toLowerCase());

  });
  

  return (
    <>
    <SearchTodo 
      showAddForm={showAddForm}
      searchText={searchText}
      onChangeSearchText={onChangeSearchText}
    />
    

      {showAddForm ? (
        <AddTodo
          todoTitle={todoTitle}
          todoDetail={todoDetail}
          onChangeTodoTitle={onChangeTodoTitle}
          onChangeTododetail={onChangeTododetail}
          onClickAdd={onClickAdd}     
        />
      ) : (
        <IncompleteTodo
          setTodoTitle={setTodoTitle}
          setTodoDetail={setTodoDetail}
          setShowAddForm={setShowAddForm}
          filteredTodos={filteredTodos}
          onClickDelete={onClickDelete}
        />
      )
      
      }
    </>
  );
};

export default App;
