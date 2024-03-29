//== Utility Libraries ==//
import clsx from 'clsx';

//== Icons ==//
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
type ErrorMessageProps = {
  className?: string;
  title: string;
  message: string;
  textClassName?: string; // Optional param to make error message not red
};

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className,
  title,
  message,
  textClassName,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg p-4 shadow-sm mx-auto ring-1 ring-inset ring-gray-300 mt-6',
        className
      )}
    >
      <div className='flex items-start'>
        <div className='flex-shrink-0'>
          <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
            {/* The `fill` prop should be `style` as `fill` is not a valid prop for this component */}
            <ExclamationTriangleIcon
              className={`h-6 w-6 text-red-600 ${textClassName}`} // textClassName overrides text-red-600 if it is !null
              aria-hidden='true'
            />
          </div>
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-black'>{title}</h3>
          <div className={`text-sm text-red-600 ${textClassName}`}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
