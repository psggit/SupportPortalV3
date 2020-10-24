/* eslint-disable react/jsx-key */
import React from "react";
import FullWidthTabs from "../../components/menuBar";
import { Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function HorizontalBar() {
  const history = useHistory();

  const handleCustomerDetail = () => {
    history.push("/customer-detail");
  };

  const handleGiftSoaChange = () => {
    console.log("gift-soa");
    history.push("/gift-soa");
  };

  const handleRewardChange = () => {
    console.log("rewards");
    history.push("/rewards");
  };

  const handleSoaChange = () => {
    console.log("soa");
    history.push("/soa");
  };

  const handleNotesChange = () => {
    history.push("/notes");
  };

  const handleBack = () => {
    history.push("/order-info");
  };

  const menuLabels = [
    <Tab label="< Back" onClick={handleBack} />,
    <Tab label="Customer Details" onClick={handleCustomerDetail} />,
    <Tab label="SOA" onClick={handleSoaChange} />,
    <Tab label="Gift SOA" onClick={handleGiftSoaChange} />,
    <Tab label="Rewards" onClick={handleRewardChange} />,
    <Tab label="Notes" onClick={handleNotesChange} />,
  ];

  return <FullWidthTabs labels={menuLabels} />;
}
