import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng}}
    onClick = {(event)=>{props.onclick(event)}}
  >
    {props.markers.map((marker)=>{
       return (<Marker 
       key={marker.id}
       position={{ lat:marker.lat , lng:marker.lng }}
       />)
    })}
  </GoogleMap>
))

export default MapComponent;