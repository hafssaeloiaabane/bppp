import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AlertPage from 'pages/AlertPage';

import LoginPage from 'pages/LoginPage';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
import ConsultationPage from 'pages/ConsultationPage';
import SimulationPage from 'pages/SimulationPage';

import ComptePage from 'pages/ComptePage';
// pages
import AvanceePage from 'pages/AvanceePage';
import SouscriptionPage from 'pages/SouscriptionPage';
import React from 'react';
import axios from 'axios';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  constructor(){
    super();
    this.state={};
    this.apiUrl="http://localhost:8080/api/dat/";
  };
  
  async componentDidMount() {
    const test =await axios.get(`${this.apiUrl}`);
    console.log(test.data);
  }


  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={
                AuthPage
              }
            />
            <LayoutRoute
              exact
              path="/loginn"
              layout={MainLayout}
              component={
                LoginPage
              }
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/login-modal"
              layout={MainLayout}
              component={AuthModalPage}
            />
            
            
            
            <LayoutRoute
              exact
              path="/comptes"
              layout={MainLayout}
              component={ComptePage}
            />
            <LayoutRoute
              exact
              path="/simulations"
              layout={MainLayout}
              component={SimulationPage}
            />
            
            <LayoutRoute
              exact
              path="/consultation"
              layout={MainLayout}
              component={ConsultationPage}
            />
            
            <LayoutRoute
              exact
              path="/alerts"
              layout={MainLayout}
              component={AlertPage}
            />
           
           
            
            <LayoutRoute
              exact
              path="/avancee"
              layout={MainLayout}
              component={AvanceePage}
            />
            <LayoutRoute
              exact
              path="/Souscription"
              layout={MainLayout}
              component={SouscriptionPage}
            />
            
            
            <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
