import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
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
    <div className='input-search-area'>
      <p>TODO管理</p>
      {showAddForm || (
      <input
      className='search'
      placeholder='Search'
      value={searchText}
      onChange={onChangeSearchText}
      />
    )}
    </div>
    <hr />


      {showAddForm ? (
        <div className='container'>
          <div className='showaddform-title'>
            <h1>タスクを追加</h1>
          </div>
          <div className='showaddform-name'>
            <p className='todo-title'>タスク名</p>
            <input
              type="text"
              className="showaddform-taskname"
              placeholder='タスク名を入力'
              value={todoTitle}
              onChange={onChangeTodoTitle}
            />
          </div>
          <div>
            <p>タスクの詳細</p>
            <textarea
              placeholder="タスクの詳細を入力"
              className='showaddform-taskdetail'
              value={todoDetail}  
              onChange={onChangeTododetail}
            />
          </div>
          <div className="addshowform-button-area">
            <button onClick={onClickAdd}>タスクを追加</button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className='input-addtodo-area'>
            <h1>私のタスク</h1>
            <button
              className='add-todo-button'
              onClick={() => setShowAddForm(true)} //引数がある場合は関数にしないと、レンダリング時にsetShowAddForm(true)をすぐ実行して、その戻り値（undefined）をonClickに渡す
            >
              新しいタスク
            </button>
          </div>

          <div className='todo-area'>
            <p className='todo-title'>すべてのタスク</p>

            {filteredTodos.map((todo,index) => {
              return (
                <div className='todo-list' key={todo.id}>
                  <div className='todo-left'>
                    <input type='checkbox' />
                    <div className='todo-details'>
                      <span>{todo.title}</span>
                      <div>{todo.detail}</div>
                    </div>  
                  </div>
                  <button className='delete-button' onClick={() => onClickDelete(todo.id)}>🗑</button>
                </div>
              );
            })}
          </div>
        </div>
      )
      
      }
    </>
  );
};

export default App;
