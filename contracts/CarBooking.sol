// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;
// used for mapping -> array ( getBookings() )
pragma experimental ABIEncoderV2;

contract CarBooking{
    uint256 public bookingCount = 0;
    mapping(uint => Booking) public bookings;
    
    struct Booking {
        uint _id;
        uint _carId;
        string _carOwner;
        string _user;
        string _rentStart;
        string _rentEnd;
        uint _rentCost;
        bool _opened;
    }
    
    function confirmBooking(
        uint _carId,
        string memory _carOwner,
        string memory _user,
        string memory _rentStart,
        string memory _rentEnd,
        uint _rentCost
        ) 
        public {
        bookings[bookingCount] = Booking(bookingCount, _carId, _carOwner, _user, _rentStart, _rentEnd, _rentCost, true);
        incrementCount();
    }
    
    function incrementCount() internal {
        bookingCount++;
    }
    
    function getBookings() 
        public view
        returns (Booking[] memory)
    {
        Booking[] memory bookings_array = new Booking[](bookingCount);
        for (uint i = 0; i < bookingCount; i++) {
            bookings_array[i] = bookings[i];
        }
        
        return bookings_array;
    }

    function closeBooking(uint id)
        public
        {
        bookings[id]._opened = false;
    }
}