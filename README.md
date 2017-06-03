Test solution base on Angular | [Ionic](http://ionicframework.com/docs/) frameworks.

## Demo
If you have any difficulty to run it, please contact me by xsoroton@gmail.com

## How to run
Install Node.js first if need it
```
https://nodejs.org/en/
https://nodejs.org/en/download/package-manager/
```

Clone it and pull dependency.
Note than: `npm install` may take about 5 min.
```bash
$ git clone https://github.com/xsoroton/next_race_test
$ cd next_race_test
$ npm install
```

###### Run it browser `ionic serve` and navigate to server `http://localhost:8100/`
```bash
$ ionic serve
```

In case you want to run it on mobile device
```bash
$ ionic cordova platform add andorid
$ ionic run android --device 
```

## Files to check

#### Data
###### would be better if you give access to your Sandbox API
```bash
./src/assets/data.json
```

#### Api service class
```bash
./src/providers/api-data-service.ts
```

#### Home page
```bash
./src/pages/home/home.ts
./src/pages/home/home.html
```

#### Race page
```bash
./src/pages/race/race.ts
./src/pages/race/race.html
```
