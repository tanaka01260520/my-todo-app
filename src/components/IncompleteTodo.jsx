import { useRef, useState,useEffect } from 'react';

export const IncompleteTodo = (props) => {
  const {setTodoTitle,setTodoDetail,setViewState,filteredTodos,onClickDelete,onClickComplete,onClickEdit} = props;

  const underlineRef = useRef(null);
  const [pendingTimeouts, setPendingTimeouts] = useState({});
  
  useEffect(() => {
    const underline = underlineRef.current; //currentでdom要素にアクセス
    const defaultTab = document.querySelectorAll(".tab-item")[0]; //配列のような特徴を持ったNodeListとして要素を取得
    if (underline && defaultTab) {
      underline.style.width = `${defaultTab.offsetWidth}px`; //下線の幅
      underline.style.transform = `translateX(${defaultTab.offsetLeft}px)`;  //下線の位置、${defaultTab.offsetLeft} はそのタブが左からどれくらい離れているか（ピクセル）
    }
  }, []);

  const handleMouseEnter = (e) => {
    const underline = underlineRef.current;
    const target = e.currentTarget; //イベントが発生した要素そのものを取得（onMouseEnter）、currentでそのdivタグの指定になる
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
                setViewState("add")}} //引数がある場合は関数にしないと、レンダリング時にsetShowAddForm(true)をすぐ実行して、その戻り値（undefined）をonClickに渡す
            >
              新しいタスク
            </button>
          </div>

          <div className='todo-area'>
            <div className="todo-header">
              <div className="tab-item" onClick={() => setViewState("incomplete")}  onMouseEnter={handleMouseEnter}>すべてのタスク</div>
              <div className="tab-item" onClick={() => setViewState("complete")} onMouseEnter={handleMouseEnter}>完了済みタスク</div>
             <div className="tab-underline" ref={underlineRef}></div>   {/* HTML要素（DOM）を直接操作するref */}
            </div>

            {filteredTodos.map((todo,index) => {
              return (
                <div className='todo-list' key={todo.id}>
                  <div className='todo-left'>    
                    <input type='checkbox'
                     className='checkbox'
                     onChange={(e) => {
                       const checked = e.target.checked;

                        if (checked) {
                          const timeoutId = setTimeout(() => { //setTimeout関数は自動で timeoutId を生成
                             onClickComplete(todo.id);
                             setPendingTimeouts((prev) => {  //prevの中身は[todo.id]: timeoutIdこうなってる
                               const newState = {...prev};
                               delete newState[todo.id];
                               return newState;

                             });
 
                          },3000);
                          setPendingTimeouts((prev) => ({
                            ...prev, [todo.id]: timeoutId

                          }));
                        } else {
                          if (pendingTimeouts[todo.id])
                          clearTimeout(pendingTimeouts[todo.id]);
                          setPendingTimeouts((prev) => {
                            const newState = { ...prev };
                            delete newState[todo.id];
                            return newState;  
                          });
                        } 
                     }}       
                    />
                    <div className='todo-details'>
                      {todo.todoDeadline && (
                        <div className="todo-deadline">
                          <p> 期限【{todo.todoDeadline}】 </p>
                        </div>
                      )}
                      <span>{todo.title}</span>
                      <div>{todo.detail}</div>
                    </div>  
                  </div>
                  <div>
                    <button onClick={() => onClickEdit(todo.id)}className='todo-editbutton'>編集</button>
                    <button onClick={() => onClickComplete(todo.id)}className='todo-compbutton'>完了</button>
                    <button className='delete-button' onClick={() => onClickDelete(todo.id)}><i className="fa-solid fa-trash-can"></i></button>
                  </div>  
                </div>
              );
            })}
          </div>
        </div>


  )

};