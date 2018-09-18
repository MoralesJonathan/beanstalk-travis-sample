import React, { Component } from 'react';
import { Grid, Container, Col, Row } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { loginUser } from '../actions/authActions';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const styles = {
    buttons: {
        margin: ".5em"
    },
    loginPrompt: {
        textAlign: "center",
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "3em",
        boxShadow: "3px 3px 10px #888888",
        backgroundColor: "white"
    },
    section: {
        backgroundColor: "#34ADFF",
        backgroundImage: "-webkit-linear-gradient(100deg, #FFFFFF 50%, #F9C02D 35%)",
        height: "100vh"
    }
}
class Main extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirect: false,
            error: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        if(!userData.email || !userData.password){
            this.setState({error:'Please fill out all fields.'})
        } else {
            this.setState({error:''})
        axios
            .post('http://localhost:5001/api/users/login', userData)
            .then(res => {
                // Save to localStorage
                const { token } = res.data;
                // Set token to ls
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                this.setState({ redirect: true })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err })
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />
        }
        return (
            <section style={styles.section}>
                <div style={styles.loginPrompt}>
                    <Grid>
                        <Row className={classNames("animated", "fadeInUp")}>
                            <Col lg={12}>
                                <img style={{maxHeight: "100px"}} src="/logoCrop.png"/>
                            </Col>
                            <form onSubmit={this.onSubmit}>
                                <Typography variant="caption" color="error" align="center">
                                    {this.state.error? this.state.error: null}
                                </Typography>
                                <Col lg={12}>
                                    <TextField
                                        name="email"
                                        label="Username"
                                        helperText="enter your username"
                                        margin="normal"
                                        fullWidth={true}
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </Col>
                                <Col lg={12}>
                                    <TextField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        helperText="enter your password"
                                        margin="normal"
                                        fullWidth={true}
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </Col>
                                <Col style={styles.buttons} lg={6}>
                                    <Button type="submit" fullWidth={true} variant="outlined">
                                        login
                                </Button>
                                </Col>
                                <Col style={styles.buttons} lg={6}>
                                    <Link to={"/signup"} style={{ textDecoration: "none" }}>
                                        <Button color="primary" fullWidth={true} variant="contained">
                                            sign-up
                                </Button>
                                    </Link>
                                </Col>
                            </form>
                        </Row>
                    </Grid>
                </div>
            </section>
        );
    }
}

export default Main;
