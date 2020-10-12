import { connect } from "react-redux";
import { Rewards } from "./RewardsComponent";
import { Reward } from "./mockData";

const mapStateToProps = () => {
  return {
    rewardsList: Reward,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const RewardsContainer = connect(mapStateToProps, mapDispatchToProps)(Rewards);

export { RewardsContainer };