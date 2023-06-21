const mongoose = require('mongoose');

// Define the Route schema
const routeSchema = new mongoose.Schema({
  route: Number,
  legs: [
    {
      cityA: String,
      cityB: String,
      cost: Number,
    },
  ],
  routeCost: Number,
});

// Define the Route model
const Route = mongoose.model('Route', routeSchema);

class NLegs {
  constructor() {
    this.routes = [];
  }

  addRoute(route) {
    this.routes.push(route);
  }
}

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://rachanams54:mongodbpwd@cluster0.yxo5ugx.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the MongoDB server');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Store routes in the database
async function storeRoutes(routes) {
  try {
    await Route.insertMany(routes);
    console.log('Routes stored successfully');

    // Read routes
    const readRoutes = await Route.find();
    console.log('Read routes:', readRoutes);

    // Update a route
    const routeToUpdate = { route: 1 }; // Replace with the actual route number to update
    const updatedRoute = { $set: { routeCost: 200 } }; // Specify the fields to update
    await Route.updateOne(routeToUpdate, updatedRoute);
    console.log('Route updated successfully!');

    // Delete a route
    const routeToDelete = { route: 3 }; // Replace with the actual route number to delete
    await Route.deleteOne(routeToDelete);
    console.log('Route deleted successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Close the MongoDB connection
async function close() {
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
}

// Usage
const nLegs = new NLegs();
nLegs.getInput();
const routes = nLegs.routes;

async function main() {
  await connect();
  await storeRoutes(routes);
  await close();
}

main();


