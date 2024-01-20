//== react, react-router-dom, Auth0 ==//
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useReducer,
} from 'react';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
interface ModalContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

import { CustomerRequests, IPortfolioData } from '../types';

interface IRequestsState {
  requests: CustomerRequests[] | null;
}

interface IPortfolioDataState {
  portfolio: IPortfolioData[] | null;
}

type RequestsAction =
  | { type: 'SET_REQUESTS'; payload: CustomerRequests[] }
  | { type: 'CREATE_REQUEST'; payload: CustomerRequests }
  | { type: 'DELETE_REQUEST'; payload: CustomerRequests };

type PortfolioDataAction = { type: 'SET_PORTFOLIO'; payload: IPortfolioData[] };

interface ICustomerRequestsContext {
  state: IRequestsState;
  dispatch: React.Dispatch<RequestsAction>;
}

interface IPortfolioDataContext {
  state: IPortfolioDataState;
  dispatch: React.Dispatch<PortfolioDataAction>;
}

//== ***** ***** ***** Exports ***** ***** ***** ==//

//-- Modal Context --//
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

//-- Customer Requests Context --//
// new context to handle customer form submissions
export const CustomerRequestsContext = createContext<
  ICustomerRequestsContext | undefined
>(undefined);

export const requestsReducer = (
  state: IRequestsState,
  action: RequestsAction
) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return {
        requests: action.payload,
      };
    case 'CREATE_REQUEST':
      return {
        requests: [action.payload, ...(state.requests || [])],
      };
    case 'DELETE_REQUEST':
      return {
        // Ensure that requests is not null before calling filter
        requests: state.requests
          ? state.requests.filter(
              (request) => request._id !== action.payload._id
            )
          : null,
      };
    default:
      return state;
  }
};

export const CustomerRequestsContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // useRecuer hook
  const [state, dispatch] = useReducer(requestsReducer, {
    requests: [],
  });

  // dispatch({type: 'SET_REQUESTS', payload: [{}]})

  return (
    <CustomerRequestsContext.Provider value={{ state, dispatch }}>
      {/* DEV -- MIGHT WANT TO SPREAD state ABOVE, like ...state */}
      {children}
    </CustomerRequestsContext.Provider>
  );
};

//-- Portfolio Data Context --//
// new context to handle rendering portfolio data
export const PortfolioDataContext = createContext<
  IPortfolioDataContext | undefined
>(undefined);

export const portfolioDataReducer = (
  state: IPortfolioDataState,
  action: PortfolioDataAction
) => {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return {
        portfolio: action.payload,
      };
    default:
      return state;
  }
};

export const PortfolioDataContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // useRecuer hook
  const [state, dispatch] = useReducer(portfolioDataReducer, {
    portfolio: [],
  });

  // dispatch({type: 'SET_REQUESTS', payload: [{}]})

  return (
    <PortfolioDataContext.Provider value={{ state, dispatch }}>
      {/* DEV -- MIGHT WANT TO SPREAD state ABOVE, like ...state */}
      {children}
    </PortfolioDataContext.Provider>
  );
};
