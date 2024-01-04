//== react, react-router-dom, Auth0 ==//
import { useEffect } from 'react';
import { Container } from './Container';
import { useRequestsContext } from '../hooks/useRequestsContext';

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
export default function CustomerRequests() {
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

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <Container>
        <div className='mx-auto max-w-2xl py-8 sm:py-10 lg:max-w-7xl'>
          <div className='gap-y-4 sm:gap-y-10'>
            {requests &&
              requests.map((request) => (
                <div key={request._id}>
                  <div className='flex flex-1 flex-col space-y-2 p-4 justify-between text-black dark:text-white text-sm border border-gray-400 dark:border-gray-200 rounded-lg my-2'>
                    <p className='text-sm flex-1'>{request.about}</p>
                    <div className='text-gray-500 dark:text-gray-400'>
                      <p>{request.firstName}</p>
                      <p>{request.lastName}</p>
                      <p>{request.email}</p>
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
