export const SearchTodo = (props) => {
    const { showAddForm, searchText, onChangeSearchText } = props;
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
    </>  

  );
};