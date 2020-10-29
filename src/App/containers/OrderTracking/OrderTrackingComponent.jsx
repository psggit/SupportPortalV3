import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import TopBar from "../../components/topBar";
import SimpleMenuBar from "../../components/simpleMenuBar";
import { Grid, Box, Typography } from "@material-ui/core";
import ErrorMsg from "../../components/errorMsg";
import {
  markerIcon,
  markerIconDA,
  markerIconConsumer,
} from "../../assets/images";

const placesLib = ["places"];
// const mapStyle = require("./styles.json");

const icons = {
  custom: {
    icon: markerIcon,
  },
};

const onLoadMarker = (marker) => {
  console.log("marker: ", marker);
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    padding: 24,
    height: "100vh",
  },
}));

const MapComponent = (props) => {
  const gpsAgent = props.trackData.agent_gps.split(",");
  const gpsConsumer = props.trackData.consumer_gps.split(",");
  const gpsRetailer = props.trackData.retailer_gps.split(",");
  const mapRef = useRef(null);
  const [positionAgent, setCenterAgent] = useState({
    lat: parseFloat(gpsAgent[0]),
    lng: parseFloat(gpsAgent[1]),
  });
  const [positionConsumer, setCenterConsumer] = useState({
    lat: parseFloat(gpsConsumer[0]),
    lng: parseFloat(gpsConsumer[1]),
  });
  const [positionRetailer, setCenterRetailer] = useState({
    lat: parseFloat(gpsRetailer[0]),
    lng: parseFloat(gpsRetailer[1]),
  });
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (mapRef.current && current) {
      mapRef.current.setCenter(current);
      setCenterConsumer(current);
    }
  }, [current]);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
    return null;
  };

  const onCenterChanged = () => {
    if (!mapRef.current) return;
    // const newPos = mapRef.current.getCenter().toJSON();
    // setCenter(newPos);
  };

  //12.930229,80.213797

  console.log(props, positionAgent, positionConsumer, positionRetailer);

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyCHGLLAB117OiC9rDD9ON3gRP1LQLAAQmI"
        libraries={placesLib}
      >
        <GoogleMap
          id="gmap"
          options={{
            streetViewControl: false,
            keyboardShortcuts: false, // disable keyboard shortcuts
            mapTypeControl: false,
            zoomControl: true,
            rotateControl: false,
            fullscreenControl: false,
            scaleControl: false, // allow scale controle
            scrollwheel: true, // allow scroll wheel
          }}
          mapContainerStyle={{
            width: "100%",
            bottom: "60px",
            top: "60px",
            height: "50vh",
          }}
          center={positionConsumer}
          zoom={16}
          onLoad={onLoad}
          onDragEnd={onCenterChanged}
          onUnmount={onUnmount}
        >
          <Marker
            onLoad={onLoadMarker}
            position={positionAgent}
            icon={markerIconDA}
          />
          {/* <InfoWindow position={positionConsumer}>
            <div>
              <h4>Agent</h4>
            </div>
          </InfoWindow> */}
          {/* <InfoWindow position={positionConsumer}>
            <div>
              <h4>Consumer</h4>
            </div>
          </InfoWindow> */}
          <Marker
            onLoad={onLoadMarker}
            position={positionConsumer}
            icon={markerIconConsumer}
          />
          <Marker
            onLoad={onLoadMarker}
            position={positionRetailer}
            icon={markerIcon}
          />
          {/* <InfoWindow position={positionRetailer}>
            <div>
              <h4>Retailer</h4>
            </div>
          </InfoWindow> */}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

function OrderTrackingComponent(props) {
  const history = useHistory();
  let orderID = history.location.state.orderId;
  const classes = useStyles();
  useEffect(() => {
    props.fetchDeliveryStatus(orderID);
  }, []);

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (props.fetchLiveDataSuccess) {
      setShow(true);
      console.log(props);
      setDetails(history.location.state.orderInfo);
      if (props.trackData.agent_gps.trim().length == 0) {
        setShowError(true);
      }
    }
  }, [props.fetchLiveDataSuccess]);

  return (
    <>
      <TopBar />
      <SimpleMenuBar orderId={orderID}>
        {show && <p>TRACK ORDER: {orderID}</p>}
      </SimpleMenuBar>
      {showError && show && (
        <ErrorMsg show={true} message={props.trackData.message} type="error" />
      )}
      <Grid container>
        <Grid item xs={3}>
          {show && (
            <Box className={classes.root} elevation={0}>
              <Typography variant="body2">Customer name:</Typography>
              <Typography variant="body2">
                {details.customer_name.length > 0 ? details.customer_name : "-"}
              </Typography>
              <Typography variant="body2">Customer phone number:</Typography>
              <Typography variant="body2">
                {details.customer_contact_number > 0
                  ? details.customer_contact_number
                  : "-"}
              </Typography>
              <Box mt={2} />
              <Typography variant="body2">Retailer name:</Typography>
              <Typography variant="body2">
                {details.retailer_name.length > 0 ? details.retailer_name : "-"}
              </Typography>
              <Typography variant="body2">Retailer phone number:</Typography>
              <Typography variant="body2">
                {details.retailer_contact_number > 0
                  ? details.retailer_contact_number
                  : "-"}
              </Typography>
              <Box mt={2} />
              <Typography variant="body2">Delivery Agent name:</Typography>
              <Typography variant="body2">
                {details.delivery_agent_name.length > 0
                  ? details.delivery_agent_name
                  : "-"}
              </Typography>
              <Typography variant="body2">
                Delivery Agent phone number:
              </Typography>
              <Typography variant="body2">
                {details.delivery_agent_contact_number.length > 0
                  ? details.delivery_agent_contact_number
                  : "-"}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={9}>
          <Box width="80%" mx="auto">
            {show && <MapComponent {...props} />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

OrderTrackingComponent.propTypes = {
  orderId: PropTypes.number,
  fetchDeliveryStatus: PropTypes.func,
  fetchLiveDataProgress: PropTypes.bool,
  fetchLiveDataSuccess: PropTypes.bool,
  fetchLiveDataFailure: PropTypes.bool,
  trackData: PropTypes.object,
};

export { OrderTrackingComponent };
