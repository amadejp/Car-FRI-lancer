# Requirements and instructions to run application Car FRI-lancer

First we need to make sure that we check all the requrements that we got in
TruffleDapps cheat sheet, provided by assistant on laboratory exercises (VSCode with Solidity extension, Metamask, Ganache, Truffle, Nodejs, npm)

Once the setup is done, meaning Ganache blockchain is running and our smart contracts are deployed, we need to install npm package that allows us to use a local database: *npm install json-server*

We will essentially need three terminal windows open:
- truffle console (executed from app root), that should already be running
- local server (npm start, executed from /app)*
- local database (exectue *npx json-server db.json --port 3003* from app root)

<sub>*- if there are any npm packages missing, they should be installed
before retrying to start nodejs server<sub>


# Dokumentacija naše decentralizirane aplikacije Car FRI-lancer.

## Aplikacija
Zaradi enostavnosti in priročnosti smo za izdelavo aplikacije uporabili React okvir. Pri urejanju izgleda smo si pomagali z Bootstrap in SweetAlert2.
Za komunikacijo med _backend_-om ter omrežjem Ethereum uporabljamo knjižnico web3js.

## Baza podatkov
Bazo podatkov smo implementirali lokalno s pomočjo npm knjižnice json-server.
Ta nam omogoča enostavno implementacijo REST API, ki nam servira lokalno .json datoteko (db.json). Za REST API klice smo uporabili Axios.

V db.json shranjujemo seznam avtomobilov, z vsemi njihovimi podatki, kot so:
- ime avtomobila,
- razna statistika,
- javni račun lastnika,
- koordinate,
- idr.

## Zemljevid 
Za prikaz komoponet na zemljevidu smo uporabili:
- Google Maps API
    - pridobivanje podatkov o lokacijah
- npm knjižnico google-map-react
    - prikazovanje zemljevida
    - prikazovanje komponent na zemljevidu
- npm knjižnico react-geocode
    - pretvarjanje imenske lokacije v koordinate
    - pretvarjanje koordinat v imensko lokacijo

