import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

const styles = {
    section: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"100vh",
        overflow: "auto"
    }
}



class LogPage extends Component {
    state = {
        data :  {}
    }

    componentDidMount(){
        // API CALL GOES HERE
        axios.get(`/api/speech/test/${this.props.match.params.timestamp}`)
        .then(res => {
            this.setState({data : {
                labels: ['So', 'And', 'Like', 'Actually', 'You Know', 'Totally', 'I Mean', 'Just', 'Literaly', 'So Basically', 'Anyway'],
                datasets: [
                  {
                    label: 'Number of Times Used',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: res.data.fillersCount
                  }
                ]
              }});
        });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <section style={styles.section}>
                    <Bar
                        data={this.state.data}
                        height={50}
                        width={200}
                        redraw= {true}
                        option={{
                            maintainAspectRatio: false
                        }}
                    />
                </section>
            </React.Fragment>
        );
    }
}

export default LogPage;
