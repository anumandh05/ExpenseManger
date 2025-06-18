import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import RecentTransactions from './pages/RecentTransactions';
import Layout from './Layout';

function App() {
  const isLoggedIn = localStorage.getItem('userId');

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/signin'} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/recent" element={<RecentTransactions />} />
      </Routes>
    </Layout>
  );
}

export default App;
