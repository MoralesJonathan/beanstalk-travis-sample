import React, { Component } from 'react';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    section: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"100vh"
    },
    card: {
        minHeight:"400px",
        verticalAlign:"middle",
        margin:"10vh"
    }
}

/*
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
*/

class Review extends Component {
    state = {
        data:[],
        expanded: 'panel0'
    }

    handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
    };

    componentDidMount(){
        axios.get('/api/speech/list/test')
        .then(res => {
            this.setState({data : res.data});
        });
    }

    render() {
        const { expanded } = this.state;

        return (
            <React.Fragment>
                <NavBar/>
                <section style={styles.section}>
                    <Grid container spacing={8} justify="center" alignItems="center">
                        <Grid item lg={12} style={{marginTop:"15vh"}}>
                            <div className={classNames("animated", "slideInUp")} style={{marginLeft:"20vh", marginRight:"20vh"}}>
                            <h1 style={{fontWeight:"100", fontSize:"2em"}}>Captured Speeches</h1>
                                {
                                    this.state.data.map((data, i) => {
                                        return (
                                            <ExpansionPanel expanded={expanded === 'panel'+i} onChange={this.handleChange('panel'+i)}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                    <Typography variant="title" style={{flexBasis: '20%'}}>{new Date(data.startTimestamp).toDateString()}</Typography>
                                                    <Typography>{new Date(data.startTimestamp).toLocaleTimeString()}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Grid container justify="center" alignItems="center">
                                                        <Grid item lg={12}>
                                                            <Link to={"/dashboard/review/"+data.startTimestamp} style={{textDecoration:"none"}}>
                                                                <Button color="primary" variant="contained">
                                                                    View Log
                                                                </Button>
                                                            </Link>
                                                        </Grid>
                                                    </Grid>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        )
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>
                </section>
            </React.Fragment>
        );
    }
}

export default Review;
