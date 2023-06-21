const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://rachanams54:mongodbpwd@cluster0.yxo5ugx.mongodb.net/?retryWrites=true&w=majority';

// Database and collection names
const dbName = 'finalcost';
const collectionName = 'costs';

// Connect to MongoDB
async function connect() {
  try {
    const client = await MongoClient.connect(uri);
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Create a new route
async function createRoute(routeData) {
  const collection = await connect();
  const result = await collection.insertOne(routeData);
  console.log('Route created:', result.insertedId);
  return result.insertedId;
}

// Read all routes
async function readRoutes() {
  const collection = await connect();
  const routes = await collection.find().toArray();
  console.log('Routes:', routes);
}

// Update a route
async function updateRoute(routeId, updatedRouteData) {
  const collection = await connect();
  const result = await collection.updateOne({ _id: ObjectId(routeId) }, { $set: updatedRouteData });
  console.log('Route updated:', result.modifiedCount);
}

// Delete a route
async function deleteRoute(routeId) {
  const collection = await connect();
  const result = await collection.deleteOne({ _id: ObjectId(routeId) });
  console.log('Route deleted:', result.deletedCount);
}

// Route class
class Route {
  constructor(route) {
    this.route = route;
    this.legs = [];
  }

  addLeg(leg) {
    this.legs.push(leg);
  }
}

// Main function
async function main() {
  const route1 = new Route(1);
  route1.addLeg({ cityA: 'City A', cityB: 'City B', cost: 10 });
  route1.addLeg({ cityA: 'City B', cityB: 'City C', cost: 15 });

  const route2 = new Route(2);
  route2.addLeg({ cityA: 'City X', cityB: 'City Y', cost: 8 });
  route2.addLeg({ cityA: 'City Y', cityB: 'City Z', cost: 12 });

  // Create routes and store the IDs
  const route1Id = await createRoute(route1);
  const route2Id = await createRoute(route2);

  // Read routes
  await readRoutes();

  // Update a route
  const updatedRouteData = new Route(1);
  updatedRouteData.addLeg({ cityA: 'City A', cityB: 'City B', cost: 10 });
  updatedRouteData.addLeg({ cityA: 'City B', cityB: 'City C', cost: 15 });
  updatedRouteData.addLeg({ cityA: 'City C', cityB: 'City D', cost: 20 });
  await updateRoute(route1Id, updatedRouteData);

  // Delete a route
  await deleteRoute(route2Id);
}

main();


