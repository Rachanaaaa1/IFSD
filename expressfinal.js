const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Route {
  constructor(route) {
    this.route = route;
    this.legs = [];
  }

  addLeg(leg) {
    this.legs.push(leg);
  }
}

class NLegs {
  constructor() {
    this.routes = [];
  }

  getInput(requestBody) {
    const routeCount = parseFloat(requestBody.routeCount);

    for (let i = 0; i < routeCount; i++) {
      const routeInstance = new Route(i + 1);

      const legCount = parseFloat(requestBody.legCounts[i]);

      let routeCost = 0;

      for (let j = 0; j < legCount; j++) {
        const cityA = requestBody.citiesA[i][j];
        const cityB = requestBody.citiesB[i][j];
        const cost = parseFloat(requestBody.costs[i][j]);
        routeCost += cost;

        const leg = { cityA, cityB, cost };
        routeInstance.addLeg(leg);
      }

      routeInstance.routeCost = routeCost;
      this.routes.push(routeInstance);
    }
  }

  calculateTotalCost() {
    let totalCost = 0;
    for (const route of this.routes) {
      totalCost += route.routeCost;
    }
    return totalCost;
  }
}

app.post('/calculateTotalCost', (req, res) => {
  const nLegs = new NLegs();
  const userInput = req.body;
  nLegs.getInput(userInput);
  const totalCost = nLegs.calculateTotalCost();
  res.json({ totalCost });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
