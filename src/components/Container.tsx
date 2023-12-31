//== react, react-router-dom, Auth0 ==//
import { forwardRef } from 'react';

//== Utility Libraries ==//
import clsx from 'clsx';

//== ***** ***** ***** Exported Components ***** ***** ***** ==//
export const ContainerOuter = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className='mx-auto w-full max-w-full lg:px-8'>{children}</div>
    </div>
  );
});

export const ContainerInner = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className='mx-auto max-w-2xl lg:max-w-full'>{children}</div>
    </div>
  );
});

export const Container = forwardRef<
  React.ElementRef<typeof ContainerOuter>,
  React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );
});
