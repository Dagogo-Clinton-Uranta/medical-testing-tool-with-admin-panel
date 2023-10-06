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
import UserListPage from './pages/UserListPage';
import ComplaintsListPage from './pages/ComplaintsListPage';
import TeacherListPage from './pages/TeacherListPage';
import StudentListPage from './pages/StudentListPage';
import CategoriesVideoPage from './pages/CategoriesVideosPage';
import AddSubject from './pages/AddSubject';
import EditComplaint from './pages/EditComplaint';
import AddTeacher from './pages/AddTeacher';
import EditTeacher from './pages/EditTeacher';
import ContractorStatsPage from './pages/ContractorStatsPage';
import PatientExpanded from './pages/PatientExpanded';
import AddComplaint from './pages/AddComplaint';
import EditChapter from './pages/EditChapter';
import EditCourse from './pages/EditCourse';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        // { path: 'entry', element:  <EntryPage /> },
        // { path: 'home', element:  <PatientPage /> },
        { path: 'candidate-list', element: <StudentListPage /> },
        { path: 'patient-list', element: <TeacherListPage /> },
        { path: 'complaint-list', element: <ComplaintsListPage /> },
         { path: 'examiner', element:<UserListPage/> },
         { path: 'treatments', element: <CategoriesVideoPage /> },
         { path: 'add-subject', element: <AddSubject /> },
         { path: 'edit-subject', element: <EditCourse /> },
         { path: 'add-complaint', element: <AddComplaint /> },
         { path: 'edit-complaint', element: <EditComplaint /> },
         { path: 'add-patient', element: <AddTeacher /> },
         { path: 'edit-patient', element: <EditTeacher /> },
         { path: 'edit-chapter', element: <EditChapter /> },
         { path: 'candidate-stats', element: <ContractorStatsPage /> },
         { path: 'patient-expanded', element: <PatientExpanded/> },
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
    { path: 'patient',
     element: <PatientPage /> },
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
