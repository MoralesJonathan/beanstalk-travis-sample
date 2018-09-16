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
        axios.get('https://api.myjson.com/bins/dh07k')
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
                                                    <Typography variant="title" style={{flexBasis: '20%'}}>{data.date}</Typography>
                                                    <Typography>{data.time}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Grid container justify="center" alignItems="center">
                                                        <Grid item lg={8}>
                                                            <Typography>
                                                                {data.text}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item lg={4}>
                                                            <Grid lg={12} item>
                                                                <span style={{fontWeight:"600"}}>Most used word:</span> depression
                                                            </Grid>
                                                            <Grid lg={12} item>
                                                                <span style={{fontWeight:"600"}}>Total length of speech:</span> 86 s
                                                            </Grid>
                                                            <Grid lg={12} item style={{textAlign:"center"}}>
                                                                <h1>70%</h1>
                                                            </Grid>
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
