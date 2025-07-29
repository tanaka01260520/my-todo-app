export const EditTodo = (props) => {
  const { todoTitle, onChangeTodoTitle, todoDetail, onChangeTododetail, todoDeadline, onChangeTodoDeadline,onClickEditComp,editTargetId} = props;

  return (
    <div className='container'>
      <div className='showaddform-title'>
        <h1>タスクを編集</h1>
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
        <p className="todo-title-detail">タスクの詳細</p>
        <textarea
          placeholder="タスクの詳細を入力"
          className='showaddform-taskdetail'
          value={todoDetail}
          onChange={onChangeTododetail}
        />
      </div>
      <div className='showaddform-deadline'>
        <p>タスクの期限</p>
        <input 
          type="date" 
          value={todoDeadline}
          onChange={onChangeTodoDeadline}
        />
      </div>
      <div className="addshowform-button-area">
        <button onClick={() => onClickEditComp(editTargetId)}>タスクを編集</button>
      </div> 
    </div>
  );


};