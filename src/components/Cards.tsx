// import { PRODUCTS } from '../product-list';
import { useState } from 'react';
import { PRODUCTS } from '../art-project-list';
import ModalWithImage from './ModalWithImage';
import { Container } from './Container';
import SearchNotFound from './SearchNotFound';

const products = PRODUCTS;

const Cards: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Define the shape of data for product
  // DEV -- might want to declare this in the art-projects-list.ts component !!!!
  // TODO -- move this to the art-projects-list.ts component or to a util file
  type Product = {
    id: number;
    name: string;
    href: string;
    price: string;
    description: string;
    type: string;
    medium: string;
    utensil: string;
    imageSrc: string;
    imageAlt: string;
  };

  // Set state to manage Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <>
      <div className='bg-white dark:bg-zinc-900'>
        <Container>
          <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
            <h2 className='sr-only'>Products</h2>

            <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3 lg:gap-x-8'>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-zinc-900'
                  onClick={() => {
                    handleCardClick(product);
                  }}
                >
                  <div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                    />
                  </div>
                  <div className='flex flex-1 flex-col space-y-2 p-4'>
                    <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                      <a href={product.href}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.name}
                      </a>
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {product.description}
                    </p>
                    <div className='flex items-center justify-start space-x-2'>
                      <p className='text-sm text-black dark:text-gray-400 bg-white dark:bg-zinc-900 border border-b-2 dark:border-gray-500 rounded-md px-6 mr-2'>
                        {product.type}
                      </p>
                      <p className='text-sm text-black dark:text-gray-400 bg-white dark:bg-zinc-900 border border-b-2 dark:border-gray-500 rounded-md px-6 mr-2'>
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
