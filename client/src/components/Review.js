import React, { Component } from 'react';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

const styles = {
    section: {
        height:"100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        minHeight:"400px",
        verticalAlign:"middle",
        margin:"10vh"
    }
}



class Review extends Component {

    componentDidMount(){
        axios.get()
        .then(res => {

        });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <section style={styles.section}>
                    <Grid container spacing={8}>
                        <Grid item lg={12}>
                            <Card style={styles.card}>
                                <CardContent>
                                    hello
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </section>
            </React.Fragment>
        );
    }
}

export default Review;
