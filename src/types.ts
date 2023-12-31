// Used to define the data in the art-project-list.ts file
// Called in the Cards component
// DEV using interface so I can extend Product as a new type, InProgressProduct (i.e. interface InProgressProduct extends Product)
export interface Product { 
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
    tag: string;
    status: string;
  };

  // Used for FilterBar
  export type FilterIconData = {
  icon?: JSX.Element;
  label?: string;
  filterType: 'none' | 'type' | 'tag';
  filterValue:
    | 'none'
    | 'painting'
    | 'drawing'
    | 'digital'
    | 'people'
    | 'animals'
    | 'plants'
    | 'landscapes';
};

// For the ModalWithImage component
export type ModalWithImageProps = {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  description?: string;
  btnText?: string;
  onBtnClick?: () => void;
  imageURL?: string;
};