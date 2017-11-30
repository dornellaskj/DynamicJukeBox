import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
    constructor(props) {
        super(props);

        this.renderWeather = this.renderWeather.bind(this);
        this.createChart = this.createChart.bind(this);
    }
    renderWeather (cityData) {
        let size = 5;
        const name = cityData.city.name;
        const temps = cityData.list.slice(0, size).map( weather => (Math.round((weather.main.temp - 273.15)*1.8)+32));
        const humidity = cityData.list.slice(0, size).map( weather => Math.round(weather.main.humidity));
        const pressure = cityData.list.slice(0, size).map( weather => Math.round(weather.main.pressure));
        return (
            <tr key={name}>
                <td>{name}</td>
                <td>
                    {this.createChart(temps, size, "red")}
                </td>
                <td>
                    {this.createChart(pressure, size)}
                </td>
                <td>
                    {this.createChart(humidity, size, "green")}
                </td>
            </tr>
        );
    }
    createChart(data, size, color) {
        let labels = [];
        var date = new Date();
        for(let i = 0; i < size; i++) {
            labels.push(getDay(date.getDay() + i));
        }
        let rgb;
        switch(color) {
            case 'blue':
                rgb = "rgba(0,0,255,0.2)";
                break;
            case 'red':
                rgb = "rgba(255,0,0,0.2)";
                break;
            case 'green':
                rgb = "rgba(0,255,0,0.2)";
                break;
            default:
                rgb = "rgba(0,255,255,0.2)";
                break;
        }
        let lineChartData = {
			labels : labels,
			datasets : [
				{
					label: "My First dataset",
					fillColor : rgb,
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : data
				}
			]
        }
        return (
            <div>
            </div>
        );
    }
    render() {
        return (
            <div className="table-container">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature</th>
                            <th>Pressure</th>
                            <th>Humidity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weather.map(this.renderWeather)}
                    </tbody>
                </table>
            </div>
        );
    }
}
//{weather} === state.weather
//state coming from reducers/index.js 
function mapStateToProps({ weather }) {
    return { weather };
}
function getDay(dayNum) {
    switch(dayNum) {
        case 0:
            return "S";
        case 1:
            return "M";
        case 2:
            return "T";
        case 3:
            return "W";
        case 4:
            return "T";
        case 5:
            return "F";
        case 6:
            return "S";
    }
}

export default connect(mapStateToProps)(WeatherList);