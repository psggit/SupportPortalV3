import React, { useState, useEffect, useRef, useCallback } from "react";
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
import Moment from "moment";

const placesLib = ["places"];
const mapStyle = require("./styles.json");

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  card: {
    padding: 24,
    paddingBottom: 12,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  overlayView: {
    background: "#606060",
    color: "#fff",
    padding: 5,
    top: "-75px",
    left: "-42px",
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
  const [center, setCenter] = useState(null);

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


  function rad2degr(rad) { return rad * 180 / Math.PI; }
  function degr2rad(degr) { return degr * Math.PI / 180; }

  function getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < latLngInDegr.length; i++) {
      var lat = degr2rad(latLngInDegr[i][LATIDX]);
      var lng = degr2rad(latLngInDegr[i][LNGIDX]);
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    //return ([parseFloat(rad2degr(lat)), parseFloat(rad2degr(lng))]);
    return { lat: parseFloat(rad2degr(lat)), lng: parseFloat(rad2degr(lng)) } 
  }

  function GetCenterFromDegrees(data) {
    if (!(data.length > 0)) {
      return false;
    }

    var num_coords = data.length;

    var X = 0.0;
    var Y = 0.0;
    var Z = 0.0;

    for (var i = 0; i < data.length; i++) {
      var lat = data[i][0] * Math.PI / 180;
      var lon = data[i][1] * Math.PI / 180;

      var a = Math.cos(lat) * Math.cos(lon);
      var b = Math.cos(lat) * Math.sin(lon);
      var c = Math.sin(lat);

      X += a;
      Y += b;
      Z += c;
    }

    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;

    var lon = Math.atan2(Y, X);
    var hyp = Math.sqrt(X * X + Y * Y);
    var lat = Math.atan2(Z, hyp);

    var newX = (lat * 180 / Math.PI);
    var newY = (lon * 180 / Math.PI);

    //return new Array(newX, newY);
    return { lat: parseFloat((newX)), lng: parseFloat((newY)) } 
  }

  const centerData = GetCenterFromDegrees([
    // [
    //   parseFloat(gpsAgent[0]),
    //   parseFloat(gpsAgent[1]),
    // ],
    [
      parseFloat(gpsConsumer[0]),
      parseFloat(gpsConsumer[1]),
    ],
    [
      parseFloat(gpsRetailer[0]),
      parseFloat(gpsRetailer[1]),
    ],
  ])

  console.log("cneter", centerData)
  //setCenterConsumer(centerData)


  useEffect(() => {
    if (mapRef.current && current) {
      mapRef.current.setCenter(current);
      setCenterConsumer(current);
    }
    setCenter(centerData)
  }, [current]);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
    return null;
  };

  const handleBoundsChanged = () => {
    console.log("hhh")
    const mapCenter = mapRef.current.getCenter(); //get map center
    setCenter(mapCenter);
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
            styles: mapStyle,
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
          //position={center}
          //onBoundsChanged={useCallback(handleBoundsChanged)}
          center={center}
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
    }, 10000);
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
    }else{
      setShowError(true);
    }
  }, [props.fetchLiveDataSuccess]);

  return (
    <>
      <Grid container>
        {show && (
          <Grid item xs={12}>
            <Paper className={classes.card} elevation={2}>
              <Typography variant="body1" className={classes.cardHeader}>
                ORDER TRACKING
              </Typography>
              <Grid container spacing={4} className={classes.containerBox}>
                <Grid item xs={4}>
                  <Paper className={classes.root} elevation={0}>
                    <Box
                      display="flex"
                      alignContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img src={mapMarkerIcon} />
                      <Box ml={2}>
                        <Typography variant="body1">Customer name:</Typography>
                        <Typography variant="body2">
                          {details.customer_name.length > 0
                            ? details.customer_name
                            : "-"}
                        </Typography>
                        <br />
                        <Typography variant="body1">
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
                  <Paper className={classes.root} elevation={0}>
                    <Box
                      display="flex"
                      alignContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img src={mapMarkerIcon} />
                      <Box ml={2}>
                        <Typography variant="body1">Retailer name:</Typography>
                        <Typography variant="body2">
                          {details.retailer_name.length > 0
                            ? details.retailer_name
                            : "-"}
                        </Typography>
                        <br />
                        <Typography variant="body1">
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
                  <Paper className={classes.root} elevation={0}>
                    <Box
                      display="flex"
                      alignContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img src={markerIconDA} />
                      <Box ml={2}>
                        <Typography variant="body1">
                          Delivery Agent name:
                        </Typography>
                        <Typography variant="body2">
                          {details.delivery_agent_name.length > 0
                            ? details.delivery_agent_name
                            : "-"}
                        </Typography>
                        <br />
                        <Typography variant="body1">
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
            </Paper>
          </Grid>
        )}
        {show && (
          <Grid item xs={12}>
            <Box mt={4}>
              <Alert severity="error" show={true}>{props.message}</Alert>
            </Box>
          </Grid>
        )}
        {show && (
          <Grid item xs={12}>
            <Box mt={2}>
              <Alert severity="info" show={true}>
                Last Updated at:
                {props.trackData.last_updated_at}
                {/* {props.trackData.last_updated_at
                  ? Moment(props.trackData.last_updated_at).format(
                      "D MMM hh:mm A"
                    )
                  : "-"} */}
                {/* {Moment("2020-11-06 17:40:53.042002432 +0530 IST").format('h:mm A')} */}
              </Alert>
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
