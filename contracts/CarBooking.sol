// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract CarBooking{
    uint256 public bookingCount = 0;
    mapping(uint => Booking) public bookings;
    address private owner;
    
    struct Booking {
        uint _id;
        string _carOwner;
        string _user;
        string _rentStart;
        string _rentEnd;
        uint _rentCost;
    }
    
    constructor() public{
        owner = msg.sender; // owner is contract deployer
    }
    
    function confirmBooking(
        string memory _carOwner,
        string memory _user,
        string memory _rentStart,
        string memory _rentEnd,
        uint _rentCost
        ) 
        public {
        incrementCount();
        bookings[bookingCount] = Booking(bookingCount, _carOwner, _user, _rentStart, _rentEnd, _rentCost);
    }
    
    function incrementCount() internal {
        bookingCount++;
    }
    
    function getBookings() public view returns (Booking[] memory){
        Booking[] memory bookings_array = new Booking[](bookingCount);
        for (uint i = 0; i < bookingCount; i++) {
            bookings_array[i] = bookings[i];
        }
        
        return bookings_array;
    }
}