export const SearchTodo = (props) => {
    const { viewState, searchText, onChangeSearchText,onClickHeader,reactLogo} = props;
  return (
    <>
     <div className='input-search-area'>
      <div className="logo-title-area">
        <p onClick={onClickHeader}>TODO管理</p>
      </div>  
      {viewState !== "add" && (
      <div className="search-wrapper">
        <i className="fas fa-search search-icon"></i>
        <input
          className='search'
          placeholder='Search'
          value={searchText}
          onChange={onChangeSearchText}
        />
      </div>
    )}
    </div>
    <hr className="search-area-hr"/>
    </>  

  );
};