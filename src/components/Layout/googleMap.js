import React from 'react';
import {
  GoogleMap,
  // useJsApiLoader,
  useLoadScript,
  // Marker,
  //  InfoWindow,
} from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
  },
}));
const libraries = ['places'];

export default function googleMap() {
  const classes = useStyles();
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_CLIENT_SECRET,
    libraries,
  });
  if (loadError) return 'erro no carregamento do mapa';
  if (!isLoaded) return 'Louding Map';
  return (
    <div>
      <GoogleMap className={classes.hoot} zoom={8}>
        map
      </GoogleMap>
    </div>
  );
}
