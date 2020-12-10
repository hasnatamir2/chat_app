import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter history={createBrowserHistory}>
        <Switch>
          <Route path="/" component={IndexPage} exact/>
          <Route path="/login" component={LoginPage} exact/>
          <Route path="/dashboard" component={DashboardPage} exact/>
          <Route path="/register" component={RegisterPage} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
