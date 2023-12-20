//== react, react-router-dom, Auth0 ==//
import { useState } from 'react';

//== TSX Components, Functions ==//
import { Container } from './Container';

//== Icons ==//
import {
  AllIcon,
  DogIcon,
  IpadIcon,
  LandscapeIcon,
  LeafIcon,
  PaintIcon,
  PencilIcon,
  UsersIcon,
} from './UI/icons';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
import { FilterIconData } from '../types';

const iconData: FilterIconData[] = [
  { icon: <AllIcon />, label: 'All', filterType: 'none', filterValue: 'none' },
  {
    icon: <PaintIcon />,
    label: 'Painting',
    filterType: 'type',
    filterValue: 'painting',
  },
  {
    icon: <PencilIcon />,
    label: 'Drawing',
    filterType: 'type',
    filterValue: 'drawing',
  },
  {
    icon: <IpadIcon fill='none' />,
    label: 'Digital',
    filterType: 'type',
    filterValue: 'digital',
  },
  {
    icon: <UsersIcon />,
    label: 'People',
    filterType: 'tag',
    filterValue: 'people',
  },
  {
    icon: <DogIcon />,
    label: 'Animals',
    filterType: 'tag',
    filterValue: 'animals',
  },
  {
    icon: <LeafIcon />,
    label: 'Plants',
    filterType: 'tag',
    filterValue: 'plants',
  },
  {
    icon: <LandscapeIcon />,
    label: 'Landscapes',
    filterType: 'tag',
    filterValue: 'landscapes',
  },
];

interface FilterBarProps {
  onFilterChange: (newFilter: FilterIconData) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string>('none');

  const handleFilterClick = (item: FilterIconData) => {
    setActiveFilter(item.filterValue);
    onFilterChange(item);
  };

  return (
    <Container>
      <div className='mx-auto md:px-6 lg:px-8' style={{ maxWidth: '1300px' }}>
        <div className='flex flex-col lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0 justify-center'>
          <div className='w-full lg:w-auto'>
            <div className='bg-white shadow rounded-lg dark:bg-zinc-800 mt-2'>
              <div className='flex justify-between items-center px-6 py-2 space-x-4 md:space-x-8 lg:space-x-12'>
                {iconData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleFilterClick(item)}
                    className={`flex flex-col items-center hover:text-black hover:dark:text-white transition border-b border-transparent hover:border-b hover:border-gray-300 active:border-b active:border-gray-300 pb-1
                    ${
                      activeFilter === item.filterValue
                        ? 'text-black dark:text-white border-b border-gray-300'
                        : 'text-gray-500 dark:text-gray-400 '
                    }`}
                  >
                    {item.icon}
                    <span className='text-xs'>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FilterBar;
