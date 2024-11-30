import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import RegisterView from './views/RegisterView'; 
import LoginView from './views/LoginView';
import Logout from './components/Logout'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} /> 
        <Route path="/logout" element={<Logout />} /> 
      </Routes>
    </Router>
  );
}

export default App;
