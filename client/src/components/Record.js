import React, { Component } from 'react';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

const styles = {
    section: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        minHeight: "400px",
        verticalAlign: "middle",
        margin: "10vh"
    }
}


class Record extends Component {
    constructor(){
        super()
        this.recognition;
    }
    componentDidMount() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.continuous = true;
        var grammar = '#JSGF V1.0; grammar colors; public <action> =  ^um+$ ;'
        var speechRecognitionList = new window.webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = speechRecognitionList;
        this.recognition.start();
        this.final;
        this.recognition.onend = (e) => {
             axios.post('/speech/test',this.final);
        }
        this.recognition.onresult = (event) => {
            this.final = event.results;
        };
    }
    stopRecording(){
        this.recognition.stop()
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <section style={styles.section}>
                    <Grid container spacing={8}>
                        <Grid item lg={12}>
                            <Card style={styles.card}>
                                <CardContent>
                                    Recording...
                                    <Button onClick= {() => {this.stopRecording()}}>Stop Recording</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </section>
            </React.Fragment>
        );
    }
}

export default Record;
