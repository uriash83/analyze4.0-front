import React from 'react';
import {  Line } from 'react-chartjs-2';


class Chart extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
    }
       

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }
    render() {
        return (
                    <Line
                    data={{
                        labels: this.props.data.map((key, value) => key.date),
                        datasets: [
                            {
                                label: 'rTSS',
                                data: this.props.data.map((key, value) => key.tss),
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgb(227, 191, 9)',
                                borderColor: 'rgb(227, 191, 9)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgb(227, 191, 9)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgb(227, 191, 9)',
                                pointHoverBorderColor: 'rgb(227, 191, 9)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                            },
                            {
                                label: 'ATL',
                                data: this.props.data.map((key, value) => key.atl),
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgb(29, 89, 153)',
                                borderColor: 'rgb(29, 89, 153)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgb(29, 89, 153)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgb(29, 89, 153)',
                                pointHoverBorderColor: 'rgb(29, 89, 153)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                            },
                            {
                                label: 'CTL',
                                data: this.props.data.map((key, value) => key.ctl),
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(75,192,192,0.4)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(75,192,192,0.4)',
                                pointHoverBorderColor: 'rgba(75,192,192,0.4)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                            },
                            {
                                label: 'TBS',
                                data: this.props.data.map((key, value) => key.tbs),
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgb(97, 97, 89)',
                                borderColor: 'rgb(97, 97, 89)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgb(97, 97, 89)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgb(97, 97, 89)',
                                pointHoverBorderColor: 'rgb(97, 97, 89)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Performance Efforts Chart',
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                >


                </Line>
             
            
        );
    }
}




export default Chart;