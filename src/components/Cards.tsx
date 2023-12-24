//== react, react-router-dom, Auth0 ==//
import { useState } from 'react';

//== TSX Components, Functions ==//
import { Container } from './Container';
import SearchNotFound from './SearchNotFound';
import ModalWithImage from './ModalWithImage';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
import { PRODUCTS } from '../art-project-list';
import { FilterIconData, Product } from '../types';

const products = PRODUCTS;

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
const Cards: React.FC<{
  filter: FilterIconData;
}> = ({ filter }) => {
  //== React State, Custom Hooks ==//
  // Set state to manage Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  let filteredProducts = products;

  if (filter.filterType !== 'none') {
    filteredProducts = products.filter((product) => {
      if (filter.filterType === 'type') {
        return product.type.toLowerCase() === filter.filterValue;
      }
      if (filter.filterType === 'tag') {
        return product.tag.toLowerCase() === filter.filterValue;
      }
      return true;
    });
  }

  //== Handlers ==//
  const handleCardClick = (product: Product): void => {
    document.body.classList.add('overflow-hidden');
    document.body.classList.add('position-inherit');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    document.body.classList.remove('overflow-hidden');
    setIsModalOpen(false);
  };

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <div className='bg-white dark:bg-zinc-900'>
        <Container>
          <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
            <h2 className='sr-only'>Products</h2>

            <div className='grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3 lg:gap-x-8'>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-zinc-900'
                  onClick={() => {
                    handleCardClick(product);
                  }}
                >
                  <div className='aspect-h-3 sm:aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 h-96 md:h-96'>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                    />
                  </div>
                  <div className='flex flex-1 flex-col space-y-2 p-4 justify-between'>
                    <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                      <a href={product.href}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.name}
                      </a>
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 flex-1'>
                      {product.description}
                    </p>
                    <div className='flex items-center space-x-2'>
                      <p className='text-sm text-black dark:text-gray-400 bg-white dark:bg-zinc-900 border border-b-1 border-gray-700 dark:border-gray-300 rounded-md px-6 mr-2'>
                        {product.type}
                      </p>
                      <p className='text-sm text-black dark:text-gray-400 bg-white dark:bg-zinc-900 border border-b-1 border-gray-700 dark:border-gray-300 rounded-md px-6 mr-2'>
                        {product.medium}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isModalOpen && selectedProduct && (
              <ModalWithImage
                title={selectedProduct.name}
                description={selectedProduct.description}
                btnText='Close'
                onBtnClick={() => {
                  handleCloseModal();
                }}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                imageURL={selectedProduct.imageSrc}
              />
            )}
          </div>
        </Container>
      </div>
      {filteredProducts.length === 0 && <SearchNotFound />}
    </>
  );
};

export default Cards;
