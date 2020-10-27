import { connect } from "react-redux";
import { Rewards } from "./RewardsComponent";
import { fetchRewardsList } from "./duck";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    rewardsList: state.rewards.rewardsList,
    customerId: state.order.orderInfo.customerId,
    rewardsProgress: state.rewards.rewardsProgress,
    rewardsSuccess: state.rewards.rewardsSuccess,
    rewardsFail: state.rewards.rewardsFail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRewardsList: (payload) => dispatch(fetchRewardsList(payload)),
  };
};

const RewardsContainer = connect(mapStateToProps, mapDispatchToProps)(Rewards);

export { RewardsContainer };
