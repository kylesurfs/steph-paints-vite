//== react, react-router-dom, Auth0 ==//
import { useEffect } from 'react';
import { Container } from './Container';
import { useRequestsContext } from '../hooks/useRequestsContext';
import { TrashIcon } from './UI/icons';

//== TSX Components, Functions ==//

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
const VITE_BASE_URL: string | undefined = import.meta.env.VITE_BASE_URL;

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function CustomerRequests() {
  //== React State, Custom Hooks ==//
  const { requests, dispatch } = useRequestsContext();

  //== Side Effects ==//
  //-- DEV -- use useEffect to fetch customer requests from server --//
  useEffect(() => {
    const fetchCustomerRequests = async () => {
      const response = await fetch(`${VITE_BASE_URL}/api/requests`); // DEV -- TODO: Should I use Axios here instead of fetch?
      const json = await response.json();

      console.log(json);

      if (response.ok) {
        dispatch({ type: 'SET_REQUESTS', payload: json });
      }
    };

    fetchCustomerRequests();
  }, []);

  //== Handlers ==//
  const handleDelete = async (requestId: string | null) => {
    const response = await fetch(`${VITE_BASE_URL}/api/requests/${requestId}`, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_REQUEST', payload: json });
    }
  };

  //== Utility Functions ==//
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;
  };

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <div className='bg-white dark:bg-zinc-900'>
        <Container>
          <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8'>
            <div className='grid grid-cols-1 gap-y-4 xl:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8'>
              {requests &&
                requests.map((request) => (
                  <div
                    key={request._id}
                    className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-zinc-900'
                  >
                    {/* Fetch images from s3 bucket */}
                    <div className='aspect-h-4 aspect-w-4 bg-gray-200 sm:aspect-none group-hover:opacity-75 h-96 md:h-96'>
                      <img
                        src={request.signedUrl} //-- This will fetch from S3 --//
                        alt={request.about}
                        // className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                        className=' max-w-full max-h-full object-cover object-center sm:h-full sm:w-full'
                      />
                    </div>
                    <div className='flex flex-1 flex-col space-y-4 p-4 text-black dark:text-gray-300 text-sm '>
                      <p className='text-sm flex-1'>
                        Description:{' '}
                        <span className='dark:text-gray-400'>
                          {request.about}
                        </span>
                      </p>
                      <div className='text-gray-500 dark:text-gray-300'>
                        <p className='text-sm flex-1'>
                          Submitted by:{' '}
                          <span className='dark:text-gray-400'>
                            {request.firstName} {request.lastName}
                          </span>
                        </p>
                        <p className='text-sm flex-1'>
                          Email:{' '}
                          <span className='dark:text-gray-400'>
                            {request.email}
                          </span>
                        </p>
                        <p className='text-sm flex-1'>
                          Submitted on:{' '}
                          <span className='dark:text-gray-400'>
                            {formatDate(request.createdAt)}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(request._id)}
                        className='absolute top-0 right-0 mt-1 mr-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 p-1 rounded'
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
