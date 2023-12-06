import { useState } from 'react';
import Cards from '../components/Cards';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className='dark:bg-zinc-900'>
        <FilterBar />
        <Logo />
        <SearchBar onSearch={setSearchTerm} />
        <Cards searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default Home;
