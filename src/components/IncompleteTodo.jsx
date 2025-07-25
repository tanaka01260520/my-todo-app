import { useRef, useState,useEffect } from 'react';

export const IncompleteTodo = (props) => {
  const {setTodoTitle,setTodoDetail,setViewState,filteredTodos,onClickDelete,onClickComplete} = props;

  const underlineRef = useRef(null);
  
  useEffect(() => {
    const underline = underlineRef.current;
    const defaultTab = document.querySelectorAll(".tab-item")[0];
    if (underline && defaultTab) {
      underline.style.width = `${defaultTab.offsetWidth}px`;
      underline.style.transform = `translateX(${defaultTab.offsetLeft}px)`;
    }
  }, []);

  const handleMouseEnter = (e) => {
    const underline = underlineRef.current;
    const target = e.currentTarget;
    if (underline && target) {
      underline.style.width = `${target.offsetWidth}px`;
      underline.style.transform = `translateX(${target.offsetLeft}px)`;
    }
  };

  return (
     <div className="container">
          <div className='input-addtodo-area'>
            <h1>私のタスク</h1>
            <button
              className='add-todo-button'
              onClick={() => {
                // setTodoTitle(lastTodoTitle);
                // setTodoDetail(lastTodoDetail);
                setViewState("add")}} //引数がある場合は関数にしないと、レンダリング時にsetShowAddForm(true)をすぐ実行して、その戻り値（undefined）をonClickに渡す
            >
              新しいタスク
            </button>
          </div>

          <div className='todo-area'>
            <div className="todo-header">
              {/* <p className='todo-title' onClick={() => setViewState("incomplete")}>すべてのタスク</p> */}
              {/* <p className="todo-title-detail" onClick={() => setViewState("complete")}>完了済みタスク</p> */}
              <div className="tab-item" onClick={() => setViewState("incomplete")}  onMouseEnter={handleMouseEnter}>すべてのタスク</div>
              <div className="tab-item" onClick={() => setViewState("complete")} onMouseEnter={handleMouseEnter}>完了済みタスク</div>
             <div className="tab-underline" ref={underlineRef}></div>
            </div>

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
                  <div>
                    <button onClick={() => onClickComplete(todo.id)}>完了</button>
                    <button className='delete-button' onClick={() => onClickDelete(todo.id)}>🗑</button>
                  </div>  
                </div>
              );
            })}
          </div>
        </div>


  )

};