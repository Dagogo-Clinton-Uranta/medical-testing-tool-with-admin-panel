import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import RegisterPage from './pages/RegisterPage';
import PatientPage from './pages/PatientPage';
import EntryPage from './pages/EntryPage';
import EntryPage2 from './pages/EntryPage2';
import HomePage from './pages/HomePage';
import CandidiateLogin from './pages/CandidateLogin';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        // { path: 'entry', element:  <EntryPage /> },
        // { path: 'home', element:  <PatientPage /> },
         { path: 'patient', element: <PatientPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'candidateLogin',
      element: <CandidiateLogin />,
    },
    {
      path: 'entry',
      element: <EntryPage2 />,
    },
    {
      path: 'home',
      element: <HomePage />,
    },
    // {
    //   path: 'register',
    //   element: <RegisterPage />,
    // },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
