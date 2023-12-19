import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Container } from './Container';
import {
  AllIcon,
  DogIcon,
  LandscapeIcon,
  LeafIcon,
  PaintIcon,
  PencilIcon,
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

  const iconData = [
    { icon: <AllIcon />, label: 'All' },
    { icon: <PaintIcon />, label: 'Paintings' },
    { icon: <PencilIcon />, label: 'Drawings' },
    { icon: <UsersIcon />, label: 'People' },
    { icon: <DogIcon />, label: 'Animals' },
    { icon: <LeafIcon />, label: 'Plants' },
    { icon: <LandscapeIcon />, label: 'Landscapes' },
  ];

  const IconFilterBar = () => {
    return (
      <>
        <div className='bg-white shadow rounded-lg dark:bg-zinc-800'>
          <div className='flex justify-between items-center px-6 py-2 space-x-4 md:space-x-8 lg:space-x-12'>
            {iconData.map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'
              >
                {item.icon}
                <span className='text-xs'>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className='bg-white shadow rounded-lg dark:bg-zinc-800'>
          <div className='flex justify-between items-center px-6 py-2 space-x-4 md:space-x-8 lg:space-x-12'>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <AllIcon />
              <span className='text-xs '>All</span>
            </div>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <PaintIcon />
              <span className='text-xs '>Paintings</span>
            </div>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <PencilIcon />
              <span className='text-xs '>Drawings</span>
            </div>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <UsersIcon />
              <span className='text-xs'>People</span>
            </div>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <DogIcon />
              <span className='text-xs'>Animals</span>
            </div>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <LeafIcon />
              <span className='text-xs'>Plants</span>
            </div>
            <div className='flex flex-col items-center text-gray-500 hover:text-black active:text-black dark:text-gray-400 hover:dark:text-white active:dark:text-white transition hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1'>
              <LandscapeIcon className='' />
              <span className='text-xs'>Landscapes</span>
            </div>
          </div>
        </div> */}
      </>
    );
  };

  return (
    <Container>
      <div className='mx-auto md:px-6 lg:px-8' style={{ maxWidth: '1300px' }}>
        <div className='flex flex-col lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0 justify-center'>
          <div className='w-full lg:w-auto'>
            <IconFilterBar />
          </div>

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
