
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigation, useNavigate, Navigate } from 'react-router-dom';
import About from './pages/About/About';
import Header from './components/common/Header/Header';
import Projects from './pages/Projects/Projects';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ThemeProvider } from './context/ThemeProviderContext';
import { Provider } from 'react-redux';
import { store } from './store/CounterStore';
import { AuthContextProvider, useAuth } from './context/AuthContexProvider';
import Login from './pages/Login/Login';
import { lazy, Suspense, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { Mantinetheme } from './context/ManetineTheme';
import './App.css'
import '@mantine/core/styles.css';

import Signup from './pages/signup/Signup';
import MHeader from './components/common/components/MHeader/MHeader';
import Survey from './pages/survey/survey';


const Home = lazy(()=> import("./pages/Home/Home"))


const ProtectedRoutes =()=>{
  const nav = useNavigate()
  const {isAuthenticated} = useAuth();
  useEffect(() => {

    

  }, [])
  return(
    <div className='flex bg-black min-w-[100vw] min-h-[100vh] max-w-[100vw] max-h-[100vh] '>
    <Header/>
    <div className='max-w-full overflow-scroll max-h-full flex flex-col bg-[#0F0F0F] flex-1'>
      <MHeader/>
      <div className='max-w-full h-full w-full max-h-full' >
          
      <Routes>
          <Route path="/"  element={    <Suspense fallback={<h1>loading</h1>}>
          <Home/></Suspense>} />
          <Route path="/about" element={<About/>} />
          <Route path='/project' element={<Projects/>}/>
          <Route path="/survey/*" element = {<Survey/>}/>
      </Routes>
      </div>
  
    </div>
    </div>
    
    
  )
}

const LoginRouteWithTranssion =()=>{
  const location = useLocation();
  return(
    <div className='flex flex-row m-0 min-w-[100vw] bg-[#0F0F0F]  min-h-[99vh]'>
     <div className="flex-1 md:block hidden">
          <img className="w-full h-full" id="backgroundSynapse" src='https://img.freepik.com/free-psd/tropical-foliage-background_53876-91352.jpg'></img>
      </div>
    <div className="flex-1 ">
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >

    <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
    </Routes>
      </CSSTransition>
</TransitionGroup>
</div>
</div>
  )
}




const RoutesWithTranssion = () =>{
  const location = useLocation()
  const nav = useNavigate()
  const {isAuthenticated,verfiyUser} = useAuth();
  const callback = location.pathname
  console.log(callback)


  useEffect(() => {
    (async()=>{
      const user = await verfiyUser()
      console.log(user)
    })()

  }, [])

    useEffect(() => {
      console.log(isAuthenticated)
      if (isAuthenticated) {
        
      } else {
        if (location.pathname !== "/signup") {
          nav("/login/login");
        }
      }
    }, [isAuthenticated]);
  return(
    <TransitionGroup>
   {
      <Routes>
      
      <Route path="/login/*" element={<LoginRouteWithTranssion />} />
      <Route path="/app/*" element={<ProtectedRoutes />} />
      <Route path="*" element={<Navigate to="/login/login" />} />
     

      </Routes>}
  </TransitionGroup>
  )
}
function App() {
    return (
    <>
    <Router>
      <Provider store={store}>
      <ThemeProvider>
        <MantineProvider theme={Mantinetheme}   withNormalizeCSS>

          <AuthContextProvider>
           
            <RoutesWithTranssion/>
          </AuthContextProvider>
        </MantineProvider>
      </ThemeProvider>
      </Provider>
    </Router>
      
    </>
  )
}

export default App
