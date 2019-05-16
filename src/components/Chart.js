import React, { Component } from 'react';
import Highcharts from 'highcharts';



class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef();
  }

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.chartContainer.current,
      this.props.options
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div ref={this.chartContainer} />;
  }
}
export default Chart;
