import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { ThemeProvider } from './components/ThemeToggle';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './pages/Layout';
// import { ContextProvider } from './context/MyContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
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
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        {/* </ContextProvider> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
