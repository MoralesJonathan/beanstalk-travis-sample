import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    state = {
        avatar: "http://gravatar.com/avatar/82d6e7f8cb5d70f3fd5820c7a6cd62cd?s=200&r=pg&d=mm",
    }

    componentDidMount(){
        axios.get('/api/profile/avatar')
        .then(res => {
            this.setState({avatar : res.avatar});
        });
    }

    render() {
        return (
            <AppBar>
                <Toolbar>
                    <IconButton style={{width: "100px", borderRadius:"0"}} >
                        <img style={ {height: "100%", position: "absolute"}} src="/logoTransparent.png"/>
                    </IconButton>
                    <Tabs style={{marginLeft:"auto"}}>
                        <Link style={{textDecoration:"none", color:"black"}} to="/dashboard">
                            <Tab label="Home"/>
                        </Link>
                    </Tabs>
                    <IconButton style={{marginLeft:"auto"}}>
                        <Avatar alt="User Avatar" src={this.state.avatar}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;
