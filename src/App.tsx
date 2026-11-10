import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Detect } from './pages/Detect';
import { Learn } from './pages/Learn';
import { RagaDetail } from './pages/RagaDetail';
import { CoursePlayer } from './pages/CoursePlayer';
import { Concert } from './pages/Concert';
import { Archive } from './pages/Archive';
import { Artists } from './pages/Artists';
import { Toolkit } from './pages/Toolkit';
import { Create } from './pages/Create';

import { ThemeProvider } from './context/ThemeContext';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/raga/:id" element={<RagaDetail />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<CoursePlayer />} />
          <Route path="/concert" element={<Concert />} />
          <Route path="/create" element={<Create />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/toolkit" element={<Toolkit />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[#F5F2EC] dark:bg-[#171716] text-[#252421] dark:text-[#F2EEE7] font-sans selection:bg-[#EAE5DC] dark:selection:bg-[#22211F] selection:text-[#252421] dark:selection:text-[#F2EEE7] transition-colors">
          <Navigation />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
