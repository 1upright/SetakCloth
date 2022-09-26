import * as React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '200px'
};

const center = {
  lat: 37.4985,
  lng: 127.048
};

const GoogleMaps = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBCHS8icBuTSI65fUALpTUuu8uxF2KYlaI">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(GoogleMaps);