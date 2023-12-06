import { useState } from 'react';
import Cards from '../components/Cards';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

const ActiveProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className='dark:bg-zinc-900'>
        <h1>This is the actibe paintings page. It needs to be updated.</h1>
        {/* DEV -- delete above */}
        <FilterBar />
        <SearchBar onSearch={setSearchTerm} />
        <Cards searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default ActiveProjects;
