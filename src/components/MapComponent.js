import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng}}
    onClick = {(event)=>{props.onclick(event)}}
  >
    {props.markers.map((marker,idx)=>{
        if(idx===0)
            return (<Marker 
                key={marker.id}
                position={{ lat:marker.lat , lng:marker.lng }}
                icon={{
                    url:"/avatar.png",
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)
                }}
                />)
       return (<Marker 
       key={marker.id}
       position={{ lat:marker.lat , lng:marker.lng }}
       icon={{
        url:"/pointer.png",
        scaledSize: new window.google.maps.Size(30,30)
    }}
       />)
    })}
  </GoogleMap>
))

export default MapComponent;