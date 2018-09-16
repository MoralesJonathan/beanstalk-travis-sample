import React, { Component } from 'react';
import { Grid, Container, Col, Row} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const styles = {
    buttons : {
        margin: ".5em"
    },
    loginPrompt: {
        textAlign:"center",
        position:"fixed",
        top: "50%", left:"50%",
        transform:"translate(-50%, -50%)",
        padding:"3em",
        boxShadow:"3px 3px 10px #888888",
        backgroundColor:"white"
    },
    section: {
        backgroundColor: "#34ADFF",
        backgroundImage: "-webkit-linear-gradient(100deg, #FFFFFF 50%, #F9C02D 35%)",
        height:"100vh"
    }
}
class Main extends Component {
    render() {
        return (
            <section style={styles.section}>
                <div style={styles.loginPrompt}>
                    <Grid>
                        <Row className={classNames("animated", "fadeInUp")}>
                            <Col lg={12}>
                                <h1 style={{fontStyle:"italic"}}>Configure of Speech</h1>
                            </Col>
                            <Col lg={12}>
                                <TextField
                                    label="Username"
                                    helperText="enter your username"
                                    margin="normal"
                                    fullWidth={true}
                                />
                            </Col>
                            <Col lg={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    helperText="enter your password"
                                    margin="normal"
                                    fullWidth={true}
                                />
                            </Col>
                            <Col style={styles.buttons} lg={6}>
                                <Button fullWidth={true} variant="outlined">
                                    login
                                </Button>
                            </Col>
                            <Col style={styles.buttons} lg={6}>
                                <Button color="primary" fullWidth={true} variant="contained">
                                    sign-up
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </section>
        );
    }
}

export default Main;
