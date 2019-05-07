import React, { Component } from 'react';
import axios from 'axios';


import '../../node_modules/react-vis/dist/style.css';
import {XYPlot,
        VerticalBarSeries,
        HeatmapSeries,
        MarkSeries,
        LineSeries,
        VerticalGridLines,
        HorizontalGridLines,
        YAxis,
        XAxis
      } from 'react-vis';


const Server = "http://192.168.1.165:1337/";

export default class EnvData extends Component {
  constructor(props) {
    super(props);
      this.state = {envis: []};
  }

  componentDidMount() {
    var serverLocation = Server + 'envi/';
    axios.get(serverLocation)
        .then(res => {
        this.setState({ envis: res.data });
      })
      .catch(function (error){
        console.log(error);
      });// console.log({this.state.envis})
  }

    render() {

        const data = this.state.envis.map((envi)=> {
          var xTime = Date.parse(envi.time);
          // console.log(xTime);
          return {x: Date.parse(envi.time), y: envi.temperature}
        });

        return (
            <div className="container">
            <h1> Environment Temperature </h1><br/>
            <XYPlot
  width={600}
  height={300}>
  <XAxis />
  <YAxis />
  <HeatmapSeries
    data={data}/>
</XYPlot>

            <XYPlot height={300} width={600} >
            <XAxis />
            <YAxis />
              <LineSeries data={data} />
            </XYPlot>


            </div>
        )
    }
}
