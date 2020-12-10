// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.8.0;

contract CarBooking{
    uint256 public bookingCount = 0;
    mapping(uint => Booking) public bookings;

    address private owner;

    modifier isOwner(){
        require(owner == msg.sender, "You do not have permission to confirm a booking.");
        _;
    }

    struct Booking {
        uint _id;
        string _carHash;
        string _userHash;
        uint _dateTime; // current dateTime (epoch)
        string _rentDateTime;
        uint _rentCost;
        uint _lor; //length of rental
    }

    constructor() {
        owner = msg.sender; // owner is contract deployer
    }

    function confirmBooking(
        string memory _carHash,
        string memory _userHash,
        string memory _rentDateTime,
        uint _rentCost,
        uint _lor
    )
    public isOwner{
        incrementCount();
        bookings[bookingCount] = Booking(bookingCount, _carHash, _userHash, block.timestamp, _rentDateTime, _rentCost, _lor);
    }

    function incrementCount() internal {
        bookingCount++;
    }


}