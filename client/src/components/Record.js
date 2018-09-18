import React, { Component } from 'react';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import LazyLoad from 'react-lazyload';

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
        this.final;
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }

    state = {
        recording : false,
        startTime: null,
        endTime: null
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
        this.recognition.onend = (e) => {
            this.finalArr = [];
            for(var i = 0; i < this.final.length; i++){
                for(var j = 0; j < this.final[i].length; j++){
                    console.log(this.final[i][j].transcript);
                    this.finalArr.push(this.final[i][j].transcript);
                }
            }
             axios.post('/api/speech',{
                "collection": "test",
                "startTime": this.state.startTime,
                "endTime": this.state.endTime,
                "text" : this.finalArr
             }, res => {
                res?window.location.replace("/dashboard/review"):window.location.replace("/dashboard")
             });
        }
        this.recognition.onresult = (event) => {
            this.final = event.results;
        };
    }
    startRecording(){
        this.recognition.start();
        this.setState({
            startTime: new Date().getTime(),
            recording: true
        })
    }
    stopRecording(){
        this.recognition.stop()
        this.setState({
            recording : false,
            endTime: new Date().getTime()
        });
    }

    render() {
        let buttonText;
        let clickAction;
        let loadingImage = null;
        let loadingText = ''
        if(this.state.recording){
            buttonText = "Stop Recording";
            clickAction = this.stopRecording;
            loadingImage = "https://i.imgur.com/8fLfdjJ.gif";
            loadingText = 'Recording...'
        }
        else {
            buttonText = "Start Recording";
            clickAction = this.startRecording;
            loadingImage = "";
            loadingText = '';
        }
        return (
            <React.Fragment>
                <NavBar />
                <section style={styles.section}>
                    <Grid container spacing={8} justify="center" alignItems="center" style={{textAlign:"center"}}>
                        <Grid item lg={12}>
                            <h1 style={{fontSize:"4em", fontWeight:"100"}}>{loadingText}</h1>
                        </Grid>
                        <Grid item lg={12}>
                        <LazyLoad once>
                        <img src={loadingImage}/>
                        </LazyLoad>
                        </Grid>
                        <Grid item lg={12}>
                            <Button color="primary" variant="contained" onClick= {() => {clickAction()}}>{buttonText}</Button>
                        </Grid>
                    </Grid>
                </section>
            </React.Fragment>
        );
    }
}

export default Record;