import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CancellationSummaryCard from "../../components/card";
import List from "@material-ui/core/List";
import { CancellationSummaryItem } from "./components/cancellationSummaryItem";
import Moment from "moment";
import { Divider, Button } from "@material-ui/core";
import ErrorMsg from "../../components/errorMsg";

function CancellationSummaryComponent(props) {
  const { orderInfo, triggerRefundProgress, triggerRefund } = props;
  const {
    cancellation_reason,
    total_cancellation_charges,
    trigger_refund_button,
    refund_details,
  } = orderInfo.cancellation_summary;

  const handleTriggerRefund = () => {
    triggerRefund({
      orderId: orderInfo.order_id,
    });
  };

  const actionButtons = [
    <Button
      key={"refund-btn"}
      variant="contained"
      color="primary"
      onClick={handleTriggerRefund}
      disabled={triggerRefundProgress}
    >
      Trigger Refund
    </Button>,
  ];

  useEffect(() => {
    if (props.triggerRefundSuccess === true) {
      location.reload();
    }
  }, [props.triggerRefundSuccess]);

  return (
    <CancellationSummaryCard
      title="Cancellation Summary"
      actions={trigger_refund_button ? actionButtons : []}
      id="cancellation-summary"
    >
      <List disablePadding>
        <CancellationSummaryItem
          title="Cancellation Reason"
          value={cancellation_reason ? cancellation_reason : "-"}
        />
        <CancellationSummaryItem
          title="Total Cancellation Charges"
          value={total_cancellation_charges ? total_cancellation_charges : "-"}
        />
        <CancellationSummaryItem
          title="Total Refund Amount"
          value={
            refund_details.total_refund_amount
              ? refund_details.total_refund_amount
              : "-"
          }
        />
        <CancellationSummaryItem
          title="Hipbar Wallet"
          value={
            refund_details.hipbar_wallet ? refund_details.hipbar_wallet : "-"
          }
        />
        <CancellationSummaryItem
          title="Gift Wallet"
          value={refund_details.gift_wallet ? refund_details.gift_wallet : "-"}
        />
        <CancellationSummaryItem
          title="Nodal Amount"
          value={
            refund_details.nodal_amount ? refund_details.nodal_amount : "-"
          }
        />
        {refund_details && refund_details.length > 0 && (
          <CancellationSummaryItem
            title="Refund Details"
            value={""}
            type="button"
          >
            {refund_details.map((item, index) => {
              const {
                refund_transaction_id,
                refunded_amount,
                status,
                rrn,
                reference_no,
                updated_at,
              } = item;
              return (
                <>
                  <CancellationSummaryItem
                    title="Transaction ID:"
                    value={refund_transaction_id ? refund_transaction_id : "-"}
                  />
                  <CancellationSummaryItem
                    title="Refund Amount:"
                    value={refunded_amount ? refunded_amount : "-"}
                  />
                  <CancellationSummaryItem
                    title="Status:"
                    value={status ? status : "-"}
                  />
                  <CancellationSummaryItem
                    title="RRN:"
                    value={rrn ? rrn : "-"}
                  />
                  <CancellationSummaryItem
                    title="Reference Number:"
                    value={reference_no ? reference_no : "-"}
                  />
                  <CancellationSummaryItem
                    title="Updated At:"
                    value={
                      updated_at
                        ? Moment(updated_at).format("D MMM h:mm A")
                        : "-"
                    }
                  />
                  {index !== refund_details.length - 1 ? <Divider /> : ""}
                </>
              );
            })}
          </CancellationSummaryItem>
        )}
      </List>
      {props.triggerRefundFailed && (
        <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
      )}
      {props.triggerRefundSuccess && (
        <ErrorMsg show={true} message={props.successMsg.message} type={"success"} />
      )}
      <Divider />
    </CancellationSummaryCard>
  );
};


CancellationSummaryComponent.propTypes = {
  orderInfo: PropTypes.object,
  triggerRefund: PropTypes.func,
  triggerRefundProgress: PropTypes.bool,
  triggerRefundSuccess: PropTypes.bool,
  triggerRefundFailed: PropTypes.bool,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.object,
};

export { CancellationSummaryComponent };
