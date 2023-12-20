import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Container } from './Container';

type SearchBarProps = {
  onSearch: (term: string) => void; // Callback to pass the search term to the parent component
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Call the callback function whenever the search term changes
  };

  return (
    <Container>
      <div className='mx-auto md:px-6 lg:px-8' style={{ maxWidth: '1300px' }}>
        <div className='flex flex-col lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0 justify-center'>
          <div className='w-full lg:flex-1'>
            <label htmlFor='search' className='sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <MagnifyingGlassIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </div>
              <input
                id='search'
                name='search'
                className='block w-full rounded-md border-0 bg-white dark:bg-zinc-800 py-1.5 pl-10 pr-3 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='Search'
                type='search'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchBar;
