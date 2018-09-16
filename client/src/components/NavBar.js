import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
/*
<Tabs style={{marginLeft:"auto"}}>
    <Tab style={{flexGrow:1}} label="Read"/>
    <Tab style={{flexGrow:1}} label="Orate"/>
    <Tab style={{flexGrow:1}} label="Topic"/>
</Tabs>
*/
class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Typography>
                        <span style={{fontSize:"3em"}} role="img" aria-label="speech">🗣</span>
                    </Typography>
                    <IconButton style={{marginLeft:"auto"}}>
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;
