import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Callback from './pages/callback';

import useAuth from "./hooks/useAuth";
import Profile from './pages/profile';

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
}

const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
    <Route path="/twitter/callback" element={<RequireAuth><Callback /></RequireAuth>} />
    <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

export default AllRoutes;
