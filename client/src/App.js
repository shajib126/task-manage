
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import FullScreenLoader from './components/Layout/FullScreenLoader';
import { getToken } from './helper/SessionHelper';
import CreatePasswordPage from './pages/AccountRecover/CreatePasswordPage';
import SendOTPPage from './pages/AccountRecover/SendOTPPage';
import VerifyOTPpage from './pages/AccountRecover/VerifyOTPpage';
import CanceledPage from './pages/CanceledPage/CanceledPage';
import CompletePage from './pages/CompletePage/CompletePage';
import CreatePage from './pages/Createpage/CreatePage';



import Dashboard from './pages/DashboardPage/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import NewPage from './pages/NewPage/NewPage';
import Page404 from './pages/Page-404/Page404';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProgressPage from './pages/ProgressPage/ProgressPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';


function App() {
  if(getToken()){
    return (
    
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/create' element={<CreatePage/>} />
          <Route path='/new' element={<NewPage/>} />
          <Route path='/completed' element={<CompletePage/>} />
          <Route path='/canceled' element={<CanceledPage/>} />
          <Route path='/progress' element={<ProgressPage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='*' element={<Page404/>} />
        </Routes>
        <FullScreenLoader/>
      </BrowserRouter>
      
    );
  }else{
    return(
   
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegistrationPage/>} />
          <Route path='/SendOTP' element={<SendOTPPage/>} />
          <Route path='/VerifyOTP' element={<VerifyOTPpage/>} />
          <Route path='/CreatePassword' element={<CreatePasswordPage/>} />
          <Route path='*' element={<Page404/>} />
        </Routes>
      </BrowserRouter>
   
    )
  }
  
}

export default App;
