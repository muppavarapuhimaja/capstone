import React from 'react';
import {AssessmentPage} from "./components/pages/AssessmentPage";
import {Router, Route, Switch} from 'react-router-dom';
import history from "./history";
import {
    ADMIN_LOGIN_ROUTE,
    ASSESSMENT_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    RESET_PASSWORD_ROUTE,
    ADMIN_HOME_ROUTE, ADMIN_ASSESSMENT_DATA_ROUTE
} from "./constants/page_routes";
import {LoginPage} from "./components/pages/LoginPage";
import {RegisterPage} from "./components/pages/RegisterPage";
import {ResetPasswordPage} from "./components/pages/ResetPasswordPage";
import {ForgotPasswordPage} from "./components/pages/ForgotPasswordPage";
import {AdminLoginPage} from "./components/pages/AdminLoginPage";
import {PageNotFound} from "./components/sections/errors/PageNotFound";
import {AdminHomePage} from "./components/pages/AdminHomePage";
import {AdminAssessmentDataPage} from "./components/pages/AdminAssessmentDataPage";

function App() {
  return (
      <Router history={history}>
          <Switch>
              <Route path={LOGIN_ROUTE} exact component={LoginPage}/>
              <Route path={REGISTER_ROUTE} exact component={RegisterPage}/>
              <Route path={RESET_PASSWORD_ROUTE} exact component={ResetPasswordPage}/>
              <Route path={FORGOT_PASSWORD_ROUTE} exact component={ForgotPasswordPage}/>
              <Route path={ADMIN_LOGIN_ROUTE} exact component={AdminLoginPage}/>
              <Route path={ADMIN_HOME_ROUTE} exact component={AdminHomePage}/>
              <Route path={ADMIN_ASSESSMENT_DATA_ROUTE} exact component={AdminAssessmentDataPage}/>
              <Route path={ASSESSMENT_ROUTE} exact component={AssessmentPage}/>
              <Route path="*" exact component={PageNotFound}/>
          </Switch>
      </Router>
  );
}

export default App;
