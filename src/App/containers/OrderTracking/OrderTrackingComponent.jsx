import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GoogleMap,
  LoadScript,
  Marker,
  // InfoWindow,
} from "@react-google-maps/api";
import { OverlayView } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { Grid, Paper, Box, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  markerIcon,
  markerIconDA,
  markerIconConsumer,
  mapMarkerIcon,
} from "../../assets/images";

const placesLib = ["places"];

const useStyles = makeStyles(() => ({
  root: {
    padding: 24,
  },
  overlayView: {
    background: "#606060",
    color: "#fff",
    padding: 5,
    top: "-60px",
    left: "-45px",
    position: "absolute",
    width: 80,
    textAlign: "center",
    display: "block",
  },
}));

const MapComponent = (props) => {
  const classes = useStyles();
  const gpsAgent = props.trackData.agent_gps.split(",");
  const gpsConsumer = props.trackData.consumer_gps.split(",");
  const gpsRetailer = props.trackData.retailer_gps.split(",");
  const mapRef = useRef(null);
  const [positionAgent] = useState({
    lat: parseFloat(gpsAgent[0]),
    lng: parseFloat(gpsAgent[1]),
  });
  const [positionConsumer, setCenterConsumer] = useState({
    lat: parseFloat(gpsConsumer[0]),
    lng: parseFloat(gpsConsumer[1]),
  });
  const [positionRetailer] = useState({
    lat: parseFloat(gpsRetailer[0]),
    lng: parseFloat(gpsRetailer[1]),
  });
  const [current] = useState(null);

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

  // console.log(props, positionAgent, positionConsumer, positionRetailer);

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
            height: "65vh",
          }}
          center={positionConsumer}
          zoom={16}
          onLoad={onLoad}
          onDragEnd={onCenterChanged}
          onUnmount={onUnmount}
        >
          <OverlayView
            position={positionConsumer}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className={classes.overlayView}>
              <Typography variant="mapLabel">Delivery Point</Typography>
            </div>
          </OverlayView>
          <Marker
            position={positionAgent}
            icon={markerIconDA}
            title={"DeliveryAgent"}
          />
          <Marker
            position={positionConsumer}
            icon={mapMarkerIcon}
            title={"Customer"}
          />
          <Marker
            position={positionRetailer}
            icon={mapMarkerIcon}
            title={"Retailer"}
          />
          <OverlayView
            position={positionRetailer}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className={classes.overlayView}>
              <Typography variant="mapLabel">Pickup Point</Typography>
            </div>
          </OverlayView>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

MapComponent.propTypes = {
  trackData: PropTypes.any,
};

function OrderTrackingComponent(props) {
  let orderID = props.orderId;
  const classes = useStyles();
  useEffect(() => {
    props.fetchDeliveryStatus(orderID);
    // let count = 0;
    let interval = setInterval(function () {
      // console.log("update location", count);
      // count++;
      props.fetchDeliveryStatus(orderID);
    }, 60000);
    return () => {
      clearInterval(interval);
      props.resetOnUnmountFunction();
    };
  }, []);

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [details, setDetails] = useState("");
  let message = "";

  useEffect(() => {
    if (props.fetchLiveDataSuccess) {
      setShow(true);
      setDetails(props.orderInfo);
      if (
        props.trackData.agent_gps.trim().length == 0 &&
        props.trackData.status !== "delivered"
      ) {
        message = "Unable to locate Delivery Agent's location.";
        if (props.trackData.message.trim().length !== 0) {
          message = props.trackData.message;
        }
        setShowError(true);
      }
    }
  }, [props.fetchLiveDataSuccess]);

  return (
    <>
      <Grid container>
        {show && (
          <Grid item xs={12}>
            <Box>
              <Grid container spacing={4} className={classes.containerBox}>
                <Grid item xs={4}>
                  <Paper className={classes.root} elevation={2}>
                    <Box
                      display="flex"
                      alignContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img src={mapMarkerIcon} />
                      <Box ml={2}>
                        <Typography variant="body2">Customer name:</Typography>
                        <Typography variant="body2">
                          {details.customer_name.length > 0
                            ? details.customer_name
                            : "-"}
                        </Typography>
                        <br />
                        <Typography variant="body2">
                          Customer phone number:
                        </Typography>
                        <Typography variant="body2">
                          {details.customer_contact_number > 0
                            ? details.customer_contact_number
                            : "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.root} elevation={2}>
                    <Box
                      display="flex"
                      alignContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img src={mapMarkerIcon} />
                      <Box ml={2}>
                        <Typography variant="body2">Retailer name:</Typography>
                        <Typography variant="body2">
                          {details.retailer_name.length > 0
                            ? details.retailer_name
                            : "-"}
                        </Typography>
                        <br />
                        <Typography variant="body2">
                          Retailer phone number:
                        </Typography>
                        <Typography variant="body2">
                          {details.retailer_contact_number > 0
                            ? details.retailer_contact_number
                            : "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.root} elevation={2}>
                    <Box
                      display="flex"
                      alignContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img src={markerIconDA} />
                      <Box ml={2}>
                        <Typography variant="body2">
                          Delivery Agent name:
                        </Typography>
                        <Typography variant="body2">
                          {details.delivery_agent_name.length > 0
                            ? details.delivery_agent_name
                            : "-"}
                        </Typography>
                        <br />
                        <Typography variant="body2">
                          Delivery Agent phone number:
                        </Typography>
                        <Typography variant="body2">
                          {details.delivery_agent_contact_number.length > 0
                            ? details.delivery_agent_contact_number
                            : "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
        {props.fetchLiveDataSuccess && (
          <Grid item xs={12}>
            <Box mt={4}>
              <Alert severity="error" show={true}>{props.message}</Alert>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box mb={10}>{show && <MapComponent {...props} />}</Box>
        </Grid>
      </Grid>
    </>
  );
}

OrderTrackingComponent.propTypes = {
  orderId: PropTypes.string,
  fetchDeliveryStatus: PropTypes.func,
  resetOnUnmountFunction: PropTypes.func,
  fetchLiveDataProgress: PropTypes.bool,
  fetchLiveDataSuccess: PropTypes.bool,
  fetchLiveDataFailure: PropTypes.bool,
  trackData: PropTypes.object,
  errorMsg: PropTypes.string,
  orderInfo: PropTypes.any,
};

export { OrderTrackingComponent };
