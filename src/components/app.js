import React, {PropTypes, Component } from 'react';
import Geosuggest from 'react-geosuggest';

import Map from './map/Map';
import PlaceCard from './map/PlaceCard';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-geosuggest/module/geosuggest.css';

// defaults init
export default class App extends Component {


  constructor() {
    super();

    this.state = {
      suggestedPlace: {},
      placesNearSearch:[],

      mapOptions: {
        center: {lat: 14.554729, lng: 121.02444519999995},
      }
    };

  }

  componentDidMount() {
    const attribution = document.createElement('div');
    attribution.className = 'hidden';

    this.placesService = new google.maps.places.PlacesService(document.getElementById('root')
        .appendChild(attribution));
  }

  componentWillUnmount() {
    // cancel existing request
  }

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  handleSelectSuggest(suggestedPlace) {
    // fetch nearby places
    const {lat,lng} = suggestedPlace.location;
    const request = {
      location: new google.maps.LatLng(lat,lng),
      radius: '500',
      types: ['store','food']
    };

    const mapOptions = {
      center: {lat, lng}
    };
    console.log(mapOptions);
    this.setState({suggestedPlace, mapOptions});

    this.placesService.nearbySearch(request,this.handleNearbyPlacesRetrieved.bind(this));
  }

  handleNearbyPlacesRetrieved(results,status) {
    // todo, we can create marker in the maps
    if (results && status === google.maps.places.PlacesServiceStatus.OK) {
      this.setState({
        placesNearSearch: results
      });
    } else {
      this.setState({
        placesNearSearch: []
      })
    }
  }

  onChange(value) {
  }

  render() {
    const { mapOptions } = this.state;

    return (
        <section>
        <section>
        <Map {...mapOptions}/>
  <Geosuggest onSuggestSelect={ suggest => this.handleSelectSuggest(suggest) } />
  </section>

    <section>
    { this.state.placesNearSearch.map( (place,id) => <PlaceCard {...place} service={this.placesService} key={id} /> )}
  </section>

    </section>
  );
  }
}