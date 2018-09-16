import React, { Component } from 'react';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

const styles = {
    section: {
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
    state = {
        data:[]
    }
    componentDidMount(){
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
                    <Grid container spacing={8}>
                        {
                            this.state.data.map((data, i) => {
                                if(i === 0) {
                                    return (
                                    <React.Fragment>
                                    <Grid item lg={8} index={i}>
                                        <Card style={styles.card}>
                                            <CardContent>
                                                <ul>
                                                    <p>{data.text}</p>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={4} index={i}>
                                        <Card style={styles.card}>
                                            <CardContent>
                                                <h1>{data.date}</h1>
                                                <h2>{data.time}</h2>
                                                <h2>40%</h2>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    </React.Fragment>
                                    )
                                }
                                return (
                                    <Grid item lg={12} index={i}>
                                        <Card style={styles.card}>
                                            <CardContent>
                                                <ul>
                                                    <li>{data.date}</li>
                                                    <li>{data.time}</li>
                                                </ul>
                                                <div style={{textAlign:"right"}}>
                                                    <h1>20%</h1>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </section>
            </React.Fragment>
        );
    }
}

export default Review;
