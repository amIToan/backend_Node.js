import logo from './logo.svg';
import './App.css';
import Auth from './views/auth';
import AuthProvider from './contexts/authContext';
import Protectedroute from './services/Protectedroute';
import Postcontext from './contexts/PostContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import your route components too
function App() {
  return (
    <AuthProvider>
      <Postcontext>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/commonForm/login" />} />
            <Route path="/commonForm" element={<Auth />}>
              <Route path=":invoiceId" element={<Auth />} />
            </Route>
            <Route path="/dashboard/*" element={<Protectedroute />} />
          </Routes>
        </Router>
      </Postcontext>
    </AuthProvider>
  );
}

export default App;
