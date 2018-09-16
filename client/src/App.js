import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import Record from './components/Record';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Review from './components/Review';
import SignUp from './components/SignUp';
import LogPage from './components/LogPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff263',
      main: '#f9c02d',
      dark: '#c29000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/dashboard/review/:timestamp" component={LogPage}/>
                        <Route exact path="/dashboard/review" component={Review}/>
                        <Route exact path="/dashboard/record" component={Record}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        </MuiThemeProvider>
    );
  }
}

export default App;
