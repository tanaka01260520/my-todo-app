export const CompletedTodo = (props) => {
    const { completedTodos, onClickDelete } = props;

    return(
      <>
      <div className="container">
        <div className='input-addtodo-area'>
          <h1>完了済みタスク</h1>
        </div>
         <hr />

        {completedTodos.map((todo,index) => {
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
                <button className='delete-button' onClick={() => onClickDelete(todo.id)}><i class="fa-solid fa-trash-can"></i></button>
                </div>  
            </div>
            );
        })}
      
      </div>
      </>

    )

};