const Message = artifacts.require("Message");
const CarBooking = artifacts.require("CarBooking");

module.exports = function (deployer) {
  deployer.deploy(Message, "Default message");
  deployer.deploy(CarBooking);
};
