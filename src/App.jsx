import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    { title:"aaaaaaaa", detail: "楽しい" },
    { title:"todo2", detail: "楽しいqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ" },
  ]);

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
    const newTodos = [...incompleteTodos, { title: todoTitle, detail: todoDetail }];
    setIncompleteTodos(newTodos);
    setTodoTitle("");
    setTodoDetail("");
    setShowAddForm(false);
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);

  };

  return (
    <>
      <div className='input-search-area'>
        <p>TODO管理</p>
        <input className='search' placeholder='Search' />
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

            {incompleteTodos.map((todo, index) => {
              return (
                <div className='todo-list' key={index}>
                  <div className='todo-left'>
                    <input type='checkbox' />
                    <div className='todo-details'>
                      <span>{todo.title}</span>
                      <div>{todo.detail}</div>
                    </div>  
                  </div>
                  <button className='delete-button' onClick={onClickDelete}>🗑</button>
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
