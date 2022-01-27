import React from 'react'
import Dashboard from './Dashboard'
import Cart from './Cart'
import { connect } from "react-redux";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Orderdata from './Orderdata';
import Register from './Register';
import Login from './Login';

function NavbarDash(props) {
  let History = useHistory();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    History.push("/")

  }
  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="images/3.png" className="img-fluid"  height="200px" width="400px"></img></a>
          <br/><br/>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto text-uppercase">
              <a class="nav-link active" aria-current="page" ><Link to="/Dash" class="nav-link">DASHBOARD</Link></a>
              <a class="nav-link"> <Link to="/Dash/cart" class="nav-link"><i class="bi bi-cart-fill"></i> {props.mycounter}</Link></a>
              <a class="nav-link"> <Link to="/orders" class="nav-link">ORDERED LIST</Link></a>
              <a class="nav-link" ><Link to="/" class="nav-link">Login</Link></a>
              <a class="nav-link " style={{ marginTop: "8px" }} onClick={logout}>Logout</a>

            </div>
          </div>
        </div>
      </nav>
      {/* <Dashboard/> */}
      <Switch>
        <Route path="/Dash" exact component={Dashboard} />
        <Route path="/Dash/cart" exact component={Cart} />
        <Route path="/orders" exact component={Orderdata} />
        <Route path="/Reg" exact component={Register} />
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
export default connect(mapStateToProps)(NavbarDash);
