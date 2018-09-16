import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Main from './components/Main';
import Read from './components/Read';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
                        <Route exact path="/read" component={Read}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        </MuiThemeProvider>
    );
  }
}

export default App;
