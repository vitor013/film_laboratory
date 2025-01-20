import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx';
import Home from './components/home.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
