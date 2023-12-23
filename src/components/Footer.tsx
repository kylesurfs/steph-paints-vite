//== react, react-router-dom, Auth0 ==//
import { NavLink } from 'react-router-dom';

//== TSX Components, Functions ==//
import { ContainerInner, ContainerOuter } from './Container';

function FooterNavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  // Make sure that Footer links scroll to top of page
  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <NavLink
      to={to}
      className='transition hover:text-teal-500 dark:hover:text-teal-400'
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export function Footer() {
  return (
    <footer className='pt-10 flex-none dark:bg-zinc-900'>
      <ContainerOuter>
        <div className='border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40'>
          <ContainerInner>
            <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
              <div className='flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
                <FooterNavLink to='/'>Portfolio</FooterNavLink>
                <FooterNavLink to='/contact'>Request</FooterNavLink>
                <FooterNavLink to='/about'>About Me</FooterNavLink>
              </div>
              <p className='text-sm text-zinc-400 dark:text-zinc-500'>
                &copy; {new Date().getFullYear()} Stephanie Reagan. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
