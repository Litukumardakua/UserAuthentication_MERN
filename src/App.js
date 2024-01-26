import './App.css';
import Signup from './Component/SignUp/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/LogIn/Login';
import Header from './Component/Header/Header';
import Dashboard from './Component/Dashboard/Dashboard';
import Error from './Component/Error/Error';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Header/>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='*' element={<Error/>}></Route>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
