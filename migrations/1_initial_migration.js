const CarBooking = artifacts.require("CarBooking");
const CarRegistration = artifacts.require("CarRegistration");

module.exports = function (deployer) {
  deployer.deploy(CarBooking);
  deployer.deploy(CarRegistration);
};
