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
    state = {
        data : ""
    }

    componentDidMount(){
        // API CALL GOES HERE
        axios.get(`/api/speech/test/${this.props.match.params.timestamp}`)
        .then(res => {
            this.setState({data : res.data});
        });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <section style={styles.section}>
                    <p>{JSON.stringify(this.state.data)}</p>
                </section>
                <h1>logpage</h1>
            </React.Fragment>
        );
    }
}

export default LogPage;
