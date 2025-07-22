import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
return (
<>
  <div className='input-search-area'>
    <p>TODO管理</p>
    <input className='search' placeholder='Search'></input>
  </div>

  <div className='input-addtodo-area'>
    <h1>私のタスク</h1>
    <button className='add-todo-button'>新しいタスク</button>
  </div>

</>
)};

export default App;
