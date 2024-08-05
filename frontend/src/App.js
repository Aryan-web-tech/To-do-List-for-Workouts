import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'   //browserroutes - wraps all routes to be used anywhere,routes- wraps all individual routes,route - to create an individual single route , Navigate is used to redirect user
import { useAuthContext } from './hooks/useAuthContext';

//import pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
   const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
         <div className="pages">
            <Routes>
              <Route 
                 path="/"
                 element={user ? <Home/> : <Navigate to="/login" />}
              />
              <Route 
                 path="/login"
                 element={!user ? <Login/> : <Navigate to="/" />}
              />
              <Route 
                 path="/signup"
                 element={!user ? <Signup/> : <Navigate to="/" />}
              />
            </Routes>
         </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
