import { useState } from 'react';
import Cards from '../components/Cards';
import SearchBar from '../components/SearchBar';

const ActiveProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className='dark:bg-zinc-900 py-8'>
        <SearchBar onSearch={setSearchTerm} />
        <Cards searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default ActiveProjects;
