export const SearchTodo = (props) => {
    const { viewState, searchText, onChangeSearchText,onClickHeader} = props;
  return (
    <>
     <div className='input-search-area'>
      <p onClick={onClickHeader}>TODO管理</p>
      {viewState !== "add" && (
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