// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.8.0;

contract CarRegistration{
    uint256 public carsCount = 0;
    mapping(uint => Car) public cars;

    address private owner;

    modifier isOwner(){
        require(owner == msg.sender, "You do not have permission to add a car.");
        _;
    }

    struct Car {
        uint _id;
        string _brand;
        string _model;
        uint _year;
        uint _vin;
    }

    constructor() {
        owner = msg.sender; // owner is contract deployer
    }

    function addCar(
        string memory _brand,
        string memory _model,
        uint _year,
        uint _vin
    )
    public isOwner{
        incrementCount();
        cars[carsCount] = Car(carsCount, _brand, _model, _year, _vin);
    }

    function incrementCount() internal {
        carsCount++;
    }
}