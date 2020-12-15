// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;
// used for mapping -> array ( getCars() )
pragma experimental ABIEncoderV2;

contract CarRegistration{
    uint256 public carsCount = 3;
    mapping(uint => Car) public cars;   
    
    struct Car {
        uint _id;
        string _name;
        uint _power;
        uint _acc;
        string _drive;
        string _trans;
        uint _year;
        string _type;
        string _owner;
        string _location;
        uint _price;
        string _pic;
    }
       
    function addCar(
        string memory _name,
        uint _power,
        uint _acc,
        string memory _drive,
        string memory _trans,
        uint _year,
        string memory _type,
        string memory _owner,
        string memory _location,
        uint _price,
        string memory _pic
        ) 
        public {
        carsCount++;
        cars[carsCount] = Car(carsCount, _name, _power, _acc, _drive,
                                _trans, _year, _type, _owner, _location,
                                _price, _pic);
    }

    function getCars() public view returns (Car[] memory){
        Car[] memory cars_array = new Car[](carsCount);
        for (uint i = 0; i < carsCount; i++) {
            cars_array[i] = cars[i];
        }
    
        return cars_array;
    }
    
}