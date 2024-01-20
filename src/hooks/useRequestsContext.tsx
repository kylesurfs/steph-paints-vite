import { CustomerRequestsContext } from '../context/site-context';
import { useContext } from 'react';

export const useRequestsContext = () => {
  const context = useContext(CustomerRequestsContext);

  if (!context) {
    throw Error(
      'useRequestsContext must be used inside a RequestsContextProvider'
    );
  }

  const { state, dispatch } = context;
  return { requests: state.requests, dispatch };
};
