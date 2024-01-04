//== react, react-router-dom, Auth0 ==//
import { useEffect } from 'react';
import { Container } from './Container';
import { useRequestsContext } from '../hooks/useRequestsContext';
import { TrashIcon } from './UI/icons';

//== TSX Components, Functions ==//

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
interface CustomerRequest {
  _id: string;
  about: string;
  firstName: string;
  lastName: string;
  email: string;
  filePath?: string; // Assuming this is optional
}

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function CustomerRequests<CustomerRequest>() {
  //== React State, Custom Hooks ==//
  const { requests, dispatch } = useRequestsContext();

  //== Side Effects ==//
  // DEV -- use useEffect to fetch customer requests from backend (still need to connect S3 image URL to imagePath field in MongoDB)
  useEffect(() => {
    const fetchCustomerRequests = async () => {
      const response = await fetch('/api/posts'); // DEV -- Should I use Axios here instead of fetch?
      const json = await response.json();

      console.log(json);

      if (response.ok) {
        dispatch({ type: 'SET_REQUESTS', payload: json });
      }
    };

    fetchCustomerRequests();
  }, [requests, dispatch]);

  //== Handlers ==//
  const handleDelete = async (requestId: string | null) => {
    const response = await fetch('/api/posts/' + requestId, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_REQUEST', payload: json });
    }
  };

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <Container>
        <div className='mx-auto max-w-2xl py-8 sm:py-10 lg:max-w-7xl'>
          <div>
            {requests &&
              requests.map((request) => (
                <div key={request._id} className='relative space-y-6'>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className='absolute top-0 right-0 mt-2 mr-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 p-1 rounded'
                  >
                    <TrashIcon />
                  </button>
                  <div className='flex flex-1 flex-col space-y-4 p-4 text-black dark:text-white text-sm border border-gray-400 dark:border-gray-200 rounded-lg'>
                    <p className='text-sm flex-1 font-semibold'>
                      {request.about}
                    </p>
                    <div className='text-gray-500 dark:text-gray-400'>
                      <p>{request.firstName}</p>
                      <p>{request.lastName}</p>
                      <p>{request.email}</p>
                      {/* DEV -- TODO: If filePath = true, fetch upload image from S3 and render in component */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
}
