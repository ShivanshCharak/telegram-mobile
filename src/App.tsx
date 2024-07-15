import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Home from './pages/Home';
import ChatWindow from './components/ChatWindow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; // Add styles for animations

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <AnimatedRoutes />
      </div>
    </Router>
  );
};


const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    const handleNavigation = (e: PopStateEvent) => {
      if (e.state === null) {
        setDirection('backward');
      } else {
        setDirection('forward');
      }
    };

    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames={direction === 'forward' ? 'slide' : 'slide-back'}
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<ChatWindowWrapper />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const ChatWindowWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ChatWindow chatId={id!} />;
};

export default App;
