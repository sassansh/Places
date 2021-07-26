import './Filters.css';

import { Input } from 'antd';

const { Search } = Input;

function Filters({ setSearchQuery }) {
  const onSearch = (value) => setSearchQuery(value);
  return (
    <div className="allFilters">
      <Search
        placeholder="Search"
        onSearch={onSearch}
        enterButton
        allowClear
        style={{ width: 285 }}
      />
    </div>
  );
}

export default Filters;
