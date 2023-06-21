const prompt = require('prompt-sync')();

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

  getInput() {
    const routeCount = parseFloat(prompt('Enter the number of routes: '));

    for (let i = 0; i < routeCount; i++) {
      const routeInstance = new Route(i + 1);

      const legCount = parseFloat(prompt('Enter the number of legs: '));

      let routeCost = 0;

      for (let j = 0; j < legCount; j++) {
        const cityA = prompt('Enter the first city: ');
        const cityB = prompt('Enter the second city: ');
        const cost = parseFloat(prompt('Enter the cost for this leg: '));
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

function main() {
  const nLegs = new NLegs();
  nLegs.getInput();
  const totalCost = nLegs.calculateTotalCost();
  console.log(`The total cost of the trip is: ${totalCost}`);
}

main();
