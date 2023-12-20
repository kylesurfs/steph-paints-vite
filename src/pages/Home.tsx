//== react, react-router-dom, Auth0 ==//
import { useState } from 'react';

//== TSX Components, Functions ==//
import Cards from '../components/Cards';
import Logo from '../components/Logo';
import FilterBar from '../components/FilterBar';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
import { FilterIconData } from '../types';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<FilterIconData>({
    filterType: 'none',
    filterValue: 'none',
  });

  const handleFilterChange = (newFilter: FilterIconData) => {
    setFilter(newFilter);
  };

  return (
    <>
      <div className='dark:bg-zinc-900'>
        <Logo />
        <FilterBar onFilterChange={handleFilterChange} />
        <Cards filter={filter} />
      </div>
    </>
  );
};

export default Home;
