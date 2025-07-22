import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
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
          <input type= "text" className="showaddform-taskname" placeholder='タスク名を入力' />   
        </div>
        <div>
          <p>タスクの詳細</p>
          <textarea placeholder="タスクの詳細を入力" className='showaddform-taskdetail' /> 
        </div>
        <div className="addshowform-button-area">
         <button onClick={() => setShowAddForm(false)}>タスクを追加</button>
        </div>
      </div>  
      ) : (

        
    

      <div className="container">
        <div className='input-addtodo-area'>
          <h1>私のタスク</h1>
          <button className='add-todo-button' onClick={() => setShowAddForm(true)}>新しいタスク</button>
        </div>

        <div className='todo-area'>
          <p className='todo-title'>すべてのタスク</p>

          <div className='todo-list'>
            <div className='todo-left'>
              <input type='checkbox' />
              <span>todo1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            </div>
              <button className='delete-button'>🗑</button>
          </div>

          <div className='todo-list'>
            <div className='todo-left'>
              <input type='checkbox' />
              <span>todo2</span>
            </div>
            <button className='delete-button'>🗑</button>
          </div>
        </div>
      </div>





 

      )
    }
  </>
)
};


        
    


export default App;
