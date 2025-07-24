export const IncompleteTodo = (props) => {
  const {setTodoTitle,setTodoDetail,setShowAddForm,filteredTodos,onClickDelete} = props;
  return (
     <div className="container">
          <div className='input-addtodo-area'>
            <h1>私のタスク</h1>
            <button
              className='add-todo-button'
              onClick={() => {
                // setTodoTitle(lastTodoTitle);
                // setTodoDetail(lastTodoDetail);
                setShowAddForm(true)}} //引数がある場合は関数にしないと、レンダリング時にsetShowAddForm(true)をすぐ実行して、その戻り値（undefined）をonClickに渡す
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

};