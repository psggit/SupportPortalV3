import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import { fetchOrder, fetchCancelReason } from "../OrderInfo/duck";

/*const tempValue = {
  order_details: {
    order_id: "5001262931859",
    order_date_and_time: "2020-09-30 13:10:38.629836 +0530 +0530",
    partial_delivery: "true",
    slot_time: "",
    customer_name: "geetanjali ",
    customer_id: "515942",
    customer_contact_number: "7795849469",
    CustomerAddressID: "107007",
    customer_address:
      "2,1272, Mettur Rd, Municipal Colony, Edayankattuvalasu, Erode, Tamil Nadu 638011, India  LANDMARK:ananya hospital",
    customer_landmark: "ananya hospital",
    retailer_id: "439",
    retailer_code: "6340",
    retailer_name: "Erode Outlet",
    retailer_contact_number: "9345676543",
    retailer_address: "ERFGJFHGDFS",
    original_cart_total: "₹ 80.00",
    revised_cart_total: "₹ 80.00",
    original_order_total: "₹ 112.00",
    revised_order_total: "₹ 112.00",
    fee_details:
      '[{"fee_value":16,"fee_title":"Delivery Fee","fee_type":"delivery_fee","is_percentage":true,"percentage":20,"is_retailer_fee":false,"retailer_config":{"static_value":0,"retailer_slabs":null}},{"fee_value":8,"fee_title":"Convence Fee","fee_type":"Convenience_fee","is_percentage":true,"percentage":10,"is_retailer_fee":false,"retailer_config":{"static_value":0,"retailer_slabs":null}},{"fee_value":8,"fee_title":"Delivery Fee","fee_type":"delivery_fee","is_percentage":true,"percentage":10,"is_retailer_fee":false,"retailer_config":{"static_value":0,"retailer_slabs":null}}]',
    cart_id: "",
    cart_items: [
      {
        brand_name: "Kingfisher Blue",
        volume: 325,
        sku_price: 80,
        ordered_count: 1,
        deliverable_count: 1,
        total_price: 80,
        revised_total_price: 80,
        sku_id: 1278,
        brand_id: 993,
      },
      {
        brand_name: "Kingfisher Red",
        volume: 325,
        sku_price: 80,
        ordered_count: 2,
        deliverable_count: 1,
        total_price: 80,
        revised_total_price: 80,
        sku_id: 1273,
        brand_id: 993,
      },
    ],
    revised_cart_items: "",
    warehouse_id: "64",
    delivery_agent_id: null,
    delivery_agent_pick_up_date_and_time: "",
    delivery_agent_name: "",
    delivery_agent_vehicle_number: "",
    delivery_agent_contact_number: "",
    delivery_agent_status: "",
    delivery_cancellation_reason: "",
    payment_total: "₹ 112.00",
    hipbar_wallet: "₹ 112.00",
    gift_wallet: "",
    revised_gift_wallet: "",
    revised_hipbar_wallet: "",
    wallet_total: "0",
    revised_wallet_total: "0",
    nodal_amount: "",
    delivery_status: "",
    delivered_date_and_time: "",
    verification_type: "",
    fee_details_struct: [
      {
        fee_value: 16,
        fee_title: "Delivery Fee",
        fee_type: "delivery_fee",
        fee_value_without_taxes: 15.38,
      },
      {
        fee_value: 8,
        fee_title: "Convenience Fee",
        fee_type: "Convenience_fee",
        fee_value_without_taxes: 7.69,
      },
      {
        fee_value: 8,
        fee_title: "Delivery Fee",
        fee_type: "delivery_fee",
        fee_value_without_taxes: 7.69,
      },
    ],
    delivery_fee: 8,
    total_fee: 24,
    total_additional_fee: 32,
    cgst_percentage: 2,
    sgst_percentage: 2,
    igst_percentage: 0,
    taxes: { cgst_total: 0.62, sgst_total: 0.62, igst_total: 0 },
    order_status_button: true,
    cancelled_by: null,
    show_notes: true,
    lot_id: null,
    order_cancelled_time: "",
    reserved_for_da_id: null,
    state_id: 4,
    city_id: 9,
    gps: "11.343048726648705,77.71711483597755",
    platform: "hb",
    to_show_resolve_button: false,
    timing_details: [],
    consumer_upi: [{ name: "", upi_id: "hujhrfhkch@ybl", is_active: true }],
  },
};*/

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderInfo: state.orderInfo.orderInfo,
    fetchOrderInfoProgress: state.orderInfo.fetchOrderInfoProgress,
    cancelReasons: state.orderInfo.cancelReasons,
    fetchOrderInfoSuccess: state.orderInfo.fetchOrderInfoSuccess,
    fetchCancelReasonSuccess: state.orderInfo.fetchCancelReasonSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
    fetchCancelReason: (orderId) => dispatch(fetchCancelReason(orderId)),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
