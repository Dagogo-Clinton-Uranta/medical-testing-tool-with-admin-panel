import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineWifi} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineInbox} from 'react-icons/ai'
 import {IoIosPerson} from 'react-icons/io'
 import {FaChalkboardTeacher} from 'react-icons/fa'
 import {FaUserNurse} from 'react-icons/fa'
 import {FaListAlt,FaSyringe} from 'react-icons/fa'


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1,paddingLeft:"20px" }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon:<AiOutlineHome />
    // icon: icon('ic_analytics'),
  },
  {
    title: `Candidates`,
    path: '/dashboard/candidate-list',
     icon:<FaUserNurse/>,
    // icon: icon('ic_analytics'),
  },
  {
    title: `Patients`,
    path: '/dashboard/patient-list',
     icon:<IoIosPerson/>,
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Complaints',
    path: '/dashboard/complaint-list',
    icon:<FaListAlt/>
    
},
  {
    title: 'Treatments',
    path: '/dashboard/treatments',
    icon:<FaSyringe/>,
    
   /* children: [
      {
        title: 'videos',
        type: 'item',
         icon: 'Savings',
        path: '/dashboard/video',
      },
      {
        title: 'docs',
        type: 'item',
         icon: 'LockIcon',
         path: '/dashboard/docs',
      },
    ],*/
  },
  {/*
    title: `bids`,
    path: '/dashboard/chat',
    icon: icon('ic_msg'),
    iconLabel: 'msg',
    icon:<CgToolbox/>
*/},
  {/*
    title: 'settings',
     path: '#',
   iconLabel: 'settings',
   icon:<FiSettings/>
*/},
];

export default navConfig;
