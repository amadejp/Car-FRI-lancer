// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Message {
  address private owner;
  string public message;
    
  constructor(string memory initialMessage) public {
    owner = msg.sender;
    message = initialMessage;
  }

  function setMessage(string memory newMessage) public {
    message = newMessage;
  }

  function getMessage() public view returns (string memory) {
    return message;
  }
    
	function kill() public {
    require(msg.sender == owner);
    selfdestruct(msg.sender);
  }
}
