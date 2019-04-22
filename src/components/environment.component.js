import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


import '../../node_modules/react-vis/dist/style.css';
import {XYPlot,
        VerticalBarSeries,
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
          console.log(xTime);
          return {x: Date.parse(envi.time), y: envi.temperature}
        });

        return (
            <div>
            <XYPlot height={200} width={200}>
              <VerticalBarSeries data={data} />
            </XYPlot>
            <XYPlot height={200} width={200}>
              <LineSeries data={data} />
            </XYPlot>
            <XYPlot height={200} width={200}>
              <MarkSeries data={data} />
            </XYPlot>

            </div>
        )
    }
}
