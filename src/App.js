import moment from 'moment';
import Temperature from './components/Temperature';
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import './App.css';

const App = () => {
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
    loading: true,
  });

  const [markers, setMarkers] = useState([]);
  const [userCity, setUserCity] = useState();
  const [userTemp, setUserTemp] = useState();

  const success = (pos) => {
    setUserLocation({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      loading: false,
    });

    const newObj = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
    if(markers.length===0)setMarkers([...markers, newObj]);
  };
  const getCity = async () => {
    if (userLocation.lat && userLocation.lng) {
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.0f91f6fb49272c5e8c83a755ef63d9b1&lat=${userLocation.lat}&lon=${userLocation.lng}&format=json`
      );
      const data = await res.json();
      if(data.address)setUserCity(data.address.city);
    }
  };

  const clickHandler = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers([...markers, newMarker]);
  };

  const getTemp = async () => {
    if (userLocation.lat && userLocation.lng) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=e35ae40247e266200656d50d34631b8c&units=metric`
      );
      const data = await res.json();
      setUserTemp(data.main.temp);
    }
  };
  let date = new Date();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  useEffect(() => {
    getCity();
    getTemp();
  });
  return (
    <div className='App'>
      <div className='whether-container'>
        <h5 style={{ color: 'red' }}>{moment(date).format('lll')}</h5>
        <h1>{userCity ? userCity : 'Loading'}</h1>
        <Temperature userTemp={userTemp} />
      </div>

      <div className='map-container'>
        {!userLocation.loading ? (
          <MapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAJLMKeSBGgDyIfcNFqoleXqmMcQlaS2j8&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onclick={clickHandler}
            markers={markers}
          />
        ) : (
          'Loading'
        )}
      </div>
    </div>
  );
};

export default App;
