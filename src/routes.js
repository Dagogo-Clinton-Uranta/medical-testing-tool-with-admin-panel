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
import AddPatientBioData from './pages/AddPatientBioData';
import AddPatientHistory from './pages/AddPatientHistory';
import AddPatientArrival from './pages/AddPatientArrival';
import AddPatientScreenTime from './pages/AddPatientScreenTime';
import AddPatientRadiology from './pages/AddPatientRadiology';
import AddPatientBloodInv from './pages/AddPatientBloodInv';
import AddPatientECG from './pages/AddPatientECG';
import AddPatientPrescription from './pages/AddPatientPrescription';
import AddPatientReferral from './pages/AddPatientReferral';
import AddConditionsBloodInv from './pages/AddConditionsBloodInv';
import AddConditionsRadiology from './pages/AddCondiitonsRadiology';
import AddConditionsReferral from './pages/AddCondiitonsReferral';
import AddCandidate from './pages/AddCandidate';
import SettingsPage from './pages/SettingsPage';


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


         { path: 'candidate-list', element: <StudentListPage /> },
         { path: 'add-patient-bio', element: <AddPatientBioData/> },
         { path: 'add-patient-history', element: <AddPatientHistory/> },
         { path: 'add-patient-arrival', element: <AddPatientArrival/> },
         { path: 'add-patient-screen', element: <AddPatientScreenTime/> },
         { path: 'add-patient-bloodinv', element: <AddPatientBloodInv/> },
         { path: 'add-patient-radiology', element: <AddPatientRadiology/> },
         { path: 'add-patient-ecg', element: <AddPatientECG/> },
         { path: 'add-patient-prescription', element: <AddPatientPrescription/> },
         { path: 'add-patient-referral', element: <AddPatientReferral/> },
 
         { path: 'add-conditions-bloodinv', element: <AddConditionsBloodInv/> },
         { path: 'add-conditions-radiology', element: <AddConditionsRadiology/> },
         { path: 'add-conditions-referral', element: <AddConditionsReferral/> },
 
         { path: 'add-candidate', element: <AddCandidate/> },
 
         { path: 'settings', element: <SettingsPage/> },
        
        
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
