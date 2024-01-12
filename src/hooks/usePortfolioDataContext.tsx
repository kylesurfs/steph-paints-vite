import { PortfolioDataContext } from '../context/site-context';
import { useContext } from 'react';

export const usePortfolioDataContext = () => {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw Error(
      'usePortfolioDataContext must be used inside a PortfolioDataContextProvider'
    );
  }

  const { state, dispatch } = context;
  return { portfolio: state.portfolio, dispatch };
};
