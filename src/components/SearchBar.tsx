import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Container } from './Container';
import {
  DogIcon,
  LandscapeIcon,
  PaintIcon,
  PencilIcon,
  PhotoIcon,
  UsersIcon,
} from './UI/icons';

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

  const IconFilterBar = () => {
    return (
      <>
        <div className='bg-white shadow sm:rounded-lg dark:bg-zinc-800'>
          <div className='flex justify-between items-center px-6 py-2 space-x-4 md:space-x-8 lg:space-x-12'>
            <div className='flex flex-col items-center'>
              <PaintIcon />
              <span className='text-xs text-gray-600'>Paintings</span>
            </div>
            <div className='flex flex-col items-center'>
              <PencilIcon />
              <span className='text-xs text-gray-600'>Drawings</span>
            </div>
            <div className='flex flex-col items-center'>
              <UsersIcon />
              <span className='text-xs text-gray-600'>People</span>
            </div>
            <div className='flex flex-col items-center'>
              <DogIcon />
              <span className='text-xs text-gray-600'>Animals</span>
            </div>
            <div className='flex flex-col items-center'>
              <LandscapeIcon />
              <span className='text-xs text-gray-600'>Landscapes</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className='mx-auto ml-2 py-1 md:px-6' style={{ maxWidth: '1300px' }}>
        <div className='flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 justify-center'>
          <IconFilterBar />
          <div className='flex flex-1 items-center justify-center md:px-2 lg:ml-6'>
            <div className='w-full max-w-2xl lg:max-w-3xl '>
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
      </div>
    </Container>
  );
};

export default SearchBar;
