**Car FRI-lancer** is a student project [@UL-FRI](https://www.fri.uni-lj.si/en), used to learn about blockchain, smart contracts and creating a dapp.
The project serves as a POC of a decentralized shared mobility app, with which users can lend their own personal car when it is not used or rent other users' cars. 
Because of the nature of this project, it is only run locally and not deployed whatsoever. It was also created back in 2020/2021, so compatibility issues with dependencies' versions could be a problem. Furthermore, it only serves the purpose of proving a concept of a shared mobility dapp and many perfomance, ux and security issues were not answered at that point of development. Also note that some of the code and UI could still be in Slovene and not translated to English. 

# Requirements and instructions to run application Car FRI-lancer

First we need to make sure that we have all the [requirements for developing a dapp](#extra---how-to-run-a-dapp) (VSCode with Solidity extension, Metamask, Ganache, Truffle, Nodejs, npm).

Then, a bit of hardcoding (sorry, it is a bit awkwardly made as it is only a POC) - in db.json, change eth addresses under "owner" to the ones in your local blockchain, running on Ganache. You can keep track of which cars are connected to which account, so it is easier to use the app as you know which account to switch to.
Also, change our old API key "AIzaSyDeTGhQkbsgRiM7eN8l3pWJ5eWItc_r0Ys" to your Google API key.

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



# EXTRA - How to run a dapp?

To run the application it is neccessary to have:
- [Ganache](https://trufflesuite.com/ganache/) based blockchain network that runs on 127.0.0.1:8545
- [Truffle](https://trufflesuite.com/docs/vscode-ext/installation-guide/) cli
- [Metamask](https://metamask.io/) connected to Ganache network and using a Ganache wallet address
- [Nodejs](https://nodejs.org/en/)

Compile and deploy the smart contracts:
- change directory to [application-directory]
- truffle commit
- truffle migrate
    
    
The application can be run from the following location [application-directory]/app, where you need to run the following commands:
- npm install
- npm start
- The application will be available at localhost:3000.

