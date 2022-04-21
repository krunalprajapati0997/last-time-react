import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/Login';
import Register from './Component/Register';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Forgot from './Component/Forgot';
import Table from './Component/Table';
import Add from './Component/Add'
import Edit from './Component/Edit';
import Menu from './Component/Menu';
import User from './Component/User'
import L from './Component/L'
import Profile from './Component/Profile';
import Logout from './Component/Logout';  
import AddBook from './Component/AddBook';
import Numberlogin from './Component/Numberlogin'
import KotpVerify from './Component/KotpVerify';
import Cart from './Component/Cart'
import ProductListingPage from './Component/ProductListingPage';
import User1 from './Component/User1'
import UpdatHappy from './Component/UpdatHappy'

const currentUserSubject = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUserSubject ? (
        <Component {...props} />
      ) : (
        <Redirect
          from=''
          to={{
            pathname: "/"
          }}
          noThrow
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUserSubject === null ? (
        <Component {...props} />
      ) : (
        <Redirect
          from=''
          to={{
            pathname: "/Table"
          }}
          noThrow
        />
      )
    }
  />
);

function App() {
  return (
    <div className="App">
      
      <Router>
       
        {/* <Menu /> */}
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute path='/Register' component={Register} />
          <PublicRoute path='/otp' component={Numberlogin} />
          <PublicRoute path='/otp1' component={KotpVerify} />
          <PrivateRoute path='/Cart' component={Cart}/>
          <PrivateRoute path='/product' component={ProductListingPage} />
          <PublicRoute path='/forget' component={Forgot} />
          <PrivateRoute path='/User' component={User} />
          <PrivateRoute path='/addbook' component={AddBook} />
          <PrivateRoute path='/Table' component={Table} />
          <PrivateRoute path='/pdf' component={User1} />
          <PublicRoute path='/L' component={L} />
          <PrivateRoute path='/:id' component={Edit} />
          <PrivateRoute path='/Profile' component={Profile} />
          <PrivateRoute path='/Logout' component={Logout} />
      
          <PrivateRoute path='/:id' component={UpdatHappy} />
        

        </Switch>
      </Router>
    </div>
  );
}

export default App;
