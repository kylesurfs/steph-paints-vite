import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import ActiveProjects from './pages/ActiveProjects';
import Contact from './pages/Contact';
import { ThemeProvider } from './components/ThemeToggle';
// import { YourContextProvider } from './context/YourContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        {/* <YourContextProvider> */}
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/active' element={<ActiveProjects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        {/* </YourContextProvider> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
