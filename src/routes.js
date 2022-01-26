import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
// import Signup from './SignedOut/Signup';

import AuthService from "./service/AuthService";
import useAuth from "./hooks/useAuth";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//       {...rest}
//       render={props =>
//       AuthService.isAuthenticated() ? (
//           <Component {...props} />
//       ) : (
//           <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
//       )
//       }
//   />
// );
  
function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

// const AllRoutes = () => (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<RequireAuth><Home/></RequireAuth>}
//         />
//         {/* <Route
//             render={props =>
//             AuthService.isAuthenticated() ? (
//                 <Component {...props} />
//             ) : (
//                 <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
//             )
//             }
//         /> */}
//         {/* <PrivateRoute path="/home" component={(routeProps) => <Home {...routeProps}/>} /> */}
//         {/* <Route path="/signup" component={(routeProps) => <Signup  {...routeProps}/>} /> */}
//         <Route exact path="/login" component={(routeProps) => <Login {...routeProps}/>} />
//         <Route path="*" component={(routeProps) => <Home {...routeProps}/>} />
//       </Routes>
//     </BrowserRouter>
// );

const TreeRoutes = () => (
  <Routes>
    <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
    {/* <Route path="/pricing" element={<Pricing />} />
    <Route
      path="/dashboard"
      element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      }
    />
    <Route
      path="/settings"
      element={
        <RequireAuth>
          <Settings />
        </RequireAuth>
      }
    /> */}
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default TreeRoutes;
