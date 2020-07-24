import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeojson, setMaxElevationRange, setMinElevationRange,setPolylineOpacity } from './action';
import MapComponent from '../../components/google-map/mapComponent';
import Error from '../../components/error/error';
import Slider from '../../components/slider/slider';
import DropDown from '../../components/dropdown/dropdown';

class App extends React.Component {

  componentDidMount = () => {
    this.props.fetchGeojson();
  };

  handleMinRangeChange(event) {
    const maxRangeElevations = this.props.distinctRangeElevations.filter(e => e > event.target.value);
    this.props.setMinElevationRange({ minElevation: +event.target.value, maxRangeElevations });
  }

  handleMaxRangeChange(event) {
    const minRangeElevations = this.props.distinctRangeElevations.filter(e => e < event.target.value);
    this.props.setMaxElevationRange({ maxElevation: +event.target.value, minRangeElevations });
  }

  handlePolylineOpacity(event) {
    this.props.setPolylineOpacity(event.target.value);
  }

  render() {
    const {
      errMessage,
      maxElevation, 
      minElevation, 
      minRangeElevations, 
      polylineOpacity, 
      geojson, 
      maxRangeElevations } = this.props;
      if (errMessage) {
        return <Error error={this.state.errMessage}/>
      }

    return (
    <>
      <div className="container">
      <section className="filters">
        <h4>Elevation Range</h4>
        <div className="box">
          <label>Min Elevation: </label>
          <DropDown 
            onChange={this.handleMinRangeChange.bind(this)}
            value={minElevation}
            options={minRangeElevations}
          />
        </div>
        <div className="box">
          <label>Max Elevation: </label>
          <DropDown 
            onChange={this.handleMaxRangeChange.bind(this)}
            value={maxElevation}
            options={maxRangeElevations}
          />
        </div>
      </section>

      <section className="filters">
        <h4>Polyline Opacity</h4>
        <div className="box">
          <Slider 
            onChange={this.handlePolylineOpacity.bind(this)}
            min="1"
            max="10"
            value={polylineOpacity}
          />
        </div>
      </section>
      </div>

      { geojson.length ? (
        <MapComponent 
          data={geojson}
          maxElevation={maxElevation}
          minElevation={minElevation}
          strokeOpacity={polylineOpacity/10}
        />
      ) : null }
    </>
    )
  };
}

const mapStateToProps = (state) => {
  const {
    errMessage,
    maxElevation, 
    minElevation, 
    minRangeElevations, 
    polylineOpacity, 
    geojson, 
    distinctRangeElevations,
    maxRangeElevations
  } = state.appReducer;
  
  return { 
    errMessage,
    maxElevation, 
    minElevation, 
    minRangeElevations, 
    polylineOpacity, 
    geojson, 
    distinctRangeElevations,
    maxRangeElevations 
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
  fetchGeojson, setMaxElevationRange, setMinElevationRange, setPolylineOpacity }, dispatch);

App.defaultProps = {
  fetchGeojson: () => {},
  setMaxElevationRange: () => {},
  setMinElevationRange: () => {},
  setPolylineOpacity: () => {},
  geojson: [],
  errMessage: '',
  minElevation: null,
  maxElevation: null,
  minRangeElevations: [],
  maxRangeElevations: [],
  distinctRangeElevations: [],
  polylineOpacity: 10
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
