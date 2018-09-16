import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

const styles = {
    section: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"100vh"
    }
}

class LogPage extends Component {

    componentDidMount(){
        // API CALL GOES HERE
        axios.get('https://api.myjson.com/bins/dh07k')
        .then(res => {
            this.setState({data : res.data});
        });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <section style={styles.section}>
                    <p>{this.props.match.params.id}</p>
                </section>
                <h1>logpage</h1>
            </React.Fragment>
        );
    }
}

export default LogPage;
