**Car FRI-lancer** is a student project [@UL-FRI](https://www.fri.uni-lj.si/en), used to learn about blockchain, smart contracts and creating a dapp.
The project serves as a POC of a decentralized shared mobility app, with which users can lend their own personal car when it is not used or rent other users' cars. 
Because of the nature of this project, it is only run locally and not deployed whatsoever. Furthermore, it only serves the purpose of proving a concept of a shared mobility dapp and many perfomance, ux and security issues were not answered at that point of development. Also note that some of the code and UI could still be in Slovene and not translated to English. 

# Requirements and instructions to run application Car FRI-lancer

First we need to make sure that we have all the requirements for developing a dapp (VSCode with Solidity extension, Metamask, Ganache, Truffle, Nodejs, npm).

Once the setup is done, meaning Ganache blockchain is running and our smart contracts are deployed, we need to install npm package that allows us to use a local database: *npm install json-server*

We will essentially need three terminal windows open:
- truffle console (execute *truffle console* from app root), that should already be running
- local server (npm start, executed from /app)*
- local database (exectue *npx json-server db.json --port 3003* from app root)

<sub>*- if there are any npm packages missing, they should be installed
before retrying to start nodejs server<sub>

    
# Documentation of the Car FRI-lancer dapp

## Application
For simplicity and convenience, we used the React framework to build the app. We used Bootstrap and SweetAlert2 for the frontend development. We use the *web3js* library to communicate between backend and the Ethereum network.
    
## Smart contracts
Smart contracts are written in Solidity.

## Database
The database was implemented locally using the npm json-server library.
This allows us to easily implement a REST API that serves us a local .json file (db.json). For the REST API calls we used Axios.

In db.json we store a list of cars, with all their data, such as:
- car name,
- various statistics,
- the owner's public account,
- coordinates,
- etc.

## Map 
To display the comoponets on the map, we used:
- Google Maps API
    - location data retrieval
    - note that API key is hidden in the code, therefore use your own when deploying
- npm library google-map-react
    - map display
    - displaying components on the map
- npm library react-geocode
    - converting named locations to coordinates
    - convert coordinates to a named location

