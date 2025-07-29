import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchTodo } from './components/SearchTodo';
import { AddTodo } from './components/AddTodo';
import { IncompleteTodo } from './components/IncompleteTodo';
import { CompletedTodo } from './components/CompleteTodo';
import { EditTodo } from './components/EditTodo';

const App = () => {

  const [viewState, setViewState] = useState("incomplete");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  // const [lastTodoTitle, setLastTodoTitle] = useState("");
  // const [lastTodoDetail, setLastTodoDetail] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [todoDeadline, setTodoDeadline] = useState("");
  const [editTargetId, setEditTargetId] = useState(null);



  useEffect(() => {
    fetch('https://7k0bp6grqb.execute-api.ap-northeast-1.amazonaws.com/Prod/todos') //httpリクエストを送る
      .then((res) => res.json()) // レスポンスをJSON形式に変換
      .then((data) => { //json形式のデータ( { todos: [...] } ) を受け取る
        if (data.todos) {
          setIncompleteTodos(data.todos);
        }
      })
      .catch((error) => {
        console.error("API取得エラー:", error);
      });
  }, []);

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
    const newTodos = [...incompleteTodos, { id: Date.now(),title: todoTitle, detail: todoDetail,todoDeadline: todoDeadline}];
    setIncompleteTodos(newTodos);
    // setLastTodoTitle(todoTitle);
    // setLastTodoDetail(todoDetail);
    setTodoTitle("");
    setTodoDetail("");
    setViewState("incomplete");
  };

  const onClickDelete = (id) => {
    const newTodos = incompleteTodos.filter((todo) => todo.id !== id); //filterは新しい関数を返すからスプレっト構文がいらない
    const newCompletedTodos = completedTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(newCompletedTodos);
    setIncompleteTodos(newTodos);


  };

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const filteredTodos = incompleteTodos
    .filter((todo) => {
      return todo.title.toLowerCase().includes(searchText.toLowerCase()) || //検索欄が空っぽの場合、includes("") はすべての文字列に対して「true」になる
           todo.detail.toLowerCase().includes(searchText.toLowerCase());
         
  })
    .sort((a, b) => {
    // 期限がないタスクは一番下にする 負の値：a が b より先（a → b）、正の値：b が a より先、（b → a）0：順番は変えない。

      if (!a.todoDeadline) return 1;
      if (!b.todoDeadline) return -1;

      return new Date(a.todoDeadline) - new Date(b.todoDeadline);
  });

  const onClickComplete = (id) => {
    const remaining = incompleteTodos.filter((todo) => todo.id !== id);
    const completed = incompleteTodos.find((todo) => todo.id === id);
    setIncompleteTodos(remaining);
    setCompletedTodos([...completedTodos,completed]);
  };

  const onChangeTodoDeadline = (event) => {
    setTodoDeadline(event.target.value);
  }

  const onClickEdit = (id) => {
    const todoToEdit = incompleteTodos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodoTitle(todoToEdit.title);
      setTodoDetail(todoToEdit.detail);
      setTodoDeadline(todoToEdit.todoDeadline);
      setEditTargetId(id);
      setViewState("edit");
    }
  }

  const onClickEditComp = (id) => {
    const updatedTodos = incompleteTodos.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          title: todoTitle,
          detail: todoDetail,
          todoDeadline: todoDeadline
          } //JavaScriptオブジェクトは、あとに書いたプロパティで前の値を上書きする
        : todo
    );
      setIncompleteTodos(updatedTodos);
      setTodoTitle("");
      setTodoDetail("");
      setTodoDeadline("");
      setEditTargetId(null);
      setViewState("incomplete");
  }

  return (
    <>
    <SearchTodo 
      searchText={searchText}
      onChangeSearchText={onChangeSearchText}
      onClickHeader={() => setViewState("incomplete")}
      viewState={viewState}
    />
    
      {viewState === "add" ? (
        <AddTodo
          todoTitle={todoTitle}
          todoDetail={todoDetail}
          onChangeTodoTitle={onChangeTodoTitle}
          onChangeTododetail={onChangeTododetail}
          onClickAdd={onClickAdd}    
          todoDeadline={todoDeadline}
          onChangeTodoDeadline={onChangeTodoDeadline} 
        />
      ) : viewState === "complete" ? (
        <CompletedTodo 
          completedTodos={completedTodos}
          onClickDelete={onClickDelete}
          />
      ) : viewState === "edit" ? (
        <EditTodo 
          todoTitle={todoTitle}
          todoDetail={todoDetail}
          onChangeTodoTitle={onChangeTodoTitle}
          onChangeTododetail={onChangeTododetail}
          todoDeadline={todoDeadline}
          onChangeTodoDeadline={onChangeTodoDeadline} 
          onClickEditComp={onClickEditComp}
          editTargetId={editTargetId} 
        />  
      ) : (
        <IncompleteTodo
          setTodoTitle={setTodoTitle}
          setTodoDetail={setTodoDetail}
          setViewState={setViewState}
          filteredTodos={filteredTodos}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
          onClickEdit={onClickEdit}
        />
      )
      }
    </>
  );
};

export default App;
