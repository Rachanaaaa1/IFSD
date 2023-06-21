const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rachanams54:mongodbpwd@cluster0.yxo5ugx.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the Route collection
const routeSchema = new mongoose.Schema({
  route: Number,
  legs: [{
    cityA: String,
    cityB: String,
    cost: Number
  }],
  routeCost: Number
});

// Create a Route model based on the schema
const Route = mongoose.model('Route', routeSchema);

// Create
async function createRoute(routeData) {
  try {
    const route = new Route(routeData);
    const savedRoute = await route.save();
    console.log('Route created successfully:', savedRoute);
  } catch (error) {
    console.error('Error creating route:', error);
  }
}

// Read
async function getRoutes() {
  try {
    const routes = await Route.find();
    console.log('Routes:', routes);
  } catch (error) {
    console.error('Error retrieving routes:', error);
  }
}

// Update
async function updateRoute(routeId, updatedData) {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(routeId, updatedData, { new: true });
    console.log('Route updated successfully:', updatedRoute);
  } catch (error) {
    console.error('Error updating route:', error);
  }
}

// Delete
async function deleteRoute(routeId) {
  try {
    const deletedRoute = await Route.findByIdAndDelete(routeId);
    console.log('Route deleted successfully:', deletedRoute);
  } catch (error) {
    console.error('Error deleting route:', error);
  }
}

// Usage example
async function main() {
  // Create a route
  const routeData = {
    route: 1,
    legs: [
      { cityA: 'City A', cityB: 'City B', cost: 10 },
      { cityA: 'City B', cityB: 'City C', cost: 15 }
    ],
    routeCost: 25
  };
  await createRoute(routeData);

  // Get all routes
  await getRoutes();

  // Update a route
  const updatedData = {
    legs: [
      { cityA: 'City A', cityB: 'City B', cost: 10 },
      { cityA: 'City B', cityB: 'City C', cost: 20 }
    ],
    routeCost: 30
  };
  await updateRoute('routeIdHere', updatedData);

  // Delete a route
  await deleteRoute('routeIdHere');

  // Get all routes again to verify deletion
  await getRoutes();

  // Close the Mongoose connection
  mongoose.connection.close();
}

main();


