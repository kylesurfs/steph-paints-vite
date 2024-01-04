//== react, react-router-dom, Auth0 ==//
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//== TSX Components, Functions ==//
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Requests from './pages/Requests';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './components/ThemeToggle';
import { CustomerRequestsContextProvider } from './context/site-context';
// import { ContextProvider } from './context/MyContext';

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
const App: React.FC = () => {
  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <ThemeProvider>
      <CustomerRequestsContextProvider>
        <Router>
          {/* <ContextProvider> */}
          <Routes>
            <Route
              path='/'
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path='/about'
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            {/* <Route path='/active' element={<ActiveProjects />} /> */}
            <Route
              path='/contact'
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path='/requests'
              element={
                <Layout>
                  <Requests />
                </Layout>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          {/* </ContextProvider> */}
        </Router>
      </CustomerRequestsContextProvider>
    </ThemeProvider>
  );
};

export default App;
