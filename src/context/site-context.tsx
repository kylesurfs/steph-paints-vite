//== react, react-router-dom, Auth0 ==//
import React, { createContext, useState, useContext, ReactNode } from 'react';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
interface ModalContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

//== ***** ***** ***** Exports ***** ***** ***** ==//
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
