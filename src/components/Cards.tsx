//== react, react-router-dom, Auth0 ==//
import { useEffect, useState } from 'react';

//== TSX Components, Functions ==//
import { Container } from './Container';
import SearchNotFound from './SearchNotFound';
import ModalWithImage from './ModalWithImage';

//-- NPM Components --//
import axios from 'axios';

const VITE_BASE_URL: string | undefined = import.meta.env.VITE_BASE_URL;

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
// import { PRODUCTS } from '../art-project-list';
import { FilterIconData, Product } from '../types';
import { usePortfolioDataContext } from '../hooks/usePortfolioDataContext';

// const products = PRODUCTS;

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
const Cards: React.FC<{
  filter: FilterIconData;
}> = ({ filter }) => {
  //== React State, Custom Hooks ==//
  const { portfolio, dispatch } = usePortfolioDataContext();

  //-- Side Effects --//
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/api/portfolio`, {
          headers: {
            'Cache-Control': 'max-age=31536000, immutable', // Cache for 1 year (31536000 seconds) since the images won't change
          },
        });

        console.log(response.data);

        if (response.status === 200) {
          dispatch({ type: 'SET_PORTFOLIO', payload: response.data });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPortfolioData();
    console.log(portfolio);
  }, [dispatch]);

  // Set state to manage Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // let filteredProducts = products;
  let filteredProducts = portfolio;

  if (filter.filterType !== 'none' && portfolio) {
    filteredProducts = portfolio.filter((product) => {
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
            <div className='columns-1 lg:columns-2 gap-4 break-inside-avoid'>
              {filteredProducts &&
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className='mb-4 break-inside-avoid-page group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-900 hover:scale-105'
                    onClick={() => {
                      handleCardClick(product);
                    }}
                  >
                    <div className=' bg-gray-200 group-hover:opacity-75 h-auto w-auto'>
                      <img
                        src={product.signedUrl}
                        alt={product.imageAlt}
                        className='object-cover object-center sm:h-full sm:w-full'
                      />
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
                imageURL={selectedProduct.signedUrl}
                imageOrientation={selectedProduct.imageOrientation}
              />
            )}
          </div>
        </Container>
      </div>
      {!filteredProducts ||
        (filteredProducts.length === 0 && <SearchNotFound />)}
    </>
  );
};

export default Cards;
