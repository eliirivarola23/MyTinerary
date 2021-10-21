import "./App.css";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import City from "./pages/City";
import SignUp from "./pages/SignUp";
import SignIn from "./components/SignIn";
import { connect } from "react-redux";
import { useEffect } from "react";
import usuariosActions from "./redux/action/usuariosActions";

const App = (props) => {
  useEffect(() => {
    localStorage.getItem("token") &&
      props.ingresar(localStorage.getItem("token"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {!props.token && <Route path="/signIn" component={SignIn} />}
        {!props.token && <Route path="/signUp" component={SignUp} />}
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        <Redirect exact to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  ingresar: usuariosActions.ingresarLocalStorage,
};
const mapStateToProps = (state) => {
  return {
    token: state.usuarios.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
