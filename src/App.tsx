import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Detect } from './pages/Detect';
import { Learn } from './pages/Learn';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/concert" element={<Placeholder title="Concert Mode" />} />
          <Route path="/archive" element={<Placeholder title="Archive" />} />
          <Route path="/toolkit" element={<Placeholder title="Toolkit" />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const Placeholder = ({ title }: { title: string }) => (
  <div className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
    <h1 className="text-6xl font-display text-ivory mb-4">{title}</h1>
    <p className="text-sandstone">This feature is coming soon to the RagaLens OS.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-deep-raat text-ivory font-sans selection:bg-kesar-gold/30">
        <Navigation />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
