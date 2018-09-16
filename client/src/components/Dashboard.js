import React, { Component } from 'react';
import NavBar from './NavBar';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Mic from '@material-ui/icons/Mic';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { Link } from 'react-router-dom';

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
        maxWidth:"400px",
        margin:"auto"
    }
}

class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <section style={styles.section}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={styles.card}>
                                <Link to="/dashboard/record" style={{textDecoration:"none"}}>
                                    <CardActionArea style={{width:"100%", height:"400px"}}>
                                        <CardContent>
                                            <Typography style={{textAlign:"center"}}>
                                                <h1>Record</h1>
                                                <Mic/>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card style={styles.card}>
                                <Link to="/dashboard/review" style={{textDecoration:"none"}}>
                                    <CardActionArea style={{width:"100%", height:"400px"}}>
                                            <CardContent>
                                                <Typography style={{textAlign:"center"}}>
                                                    <h1>Review</h1>
                                                    <LibraryBooks/>
                                                </Typography>
                                            </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    </Grid>
                </section>
            </div>
        );
    }
}

export default Dashboard;
