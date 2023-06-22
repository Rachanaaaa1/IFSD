import React, { useState } from 'react';

function RouteScene() {
  const [routeCount, setRouteCount] = useState(0);
  const [legCounts, setLegCounts] = useState([]);
  const [legData, setLegData] = useState([]);

  const handleRouteCountChange = (event) => {
    const count = parseFloat(event.target.value);
    setRouteCount(count);
    setLegCounts(Array(count).fill(0));
    setLegData(Array(count).fill([]));
  };

  const handleLegCountChange = (event, index) => {
    const count = parseFloat(event.target.value);
    const newLegCounts = [...legCounts];
    newLegCounts[index] = count;
    setLegCounts(newLegCounts);
    setLegData([...legData]);
  };

  const handleLegDataChange = (event, routeIndex, legIndex, field) => {
    const value = event.target.value;
    const newLegData = [...legData];
    newLegData[routeIndex][legIndex][field] = value;
    setLegData(newLegData);
  };

  const handleAddLeg = (routeIndex) => {
    const newLegData = [...legData];
    newLegData[routeIndex].push({ cityA: '', cityB: '', cost: '' });
    setLegData(newLegData);
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    for (const legs of legData) {
      let routeCost = 0;
      for (const leg of legs) {
        routeCost += parseFloat(leg.cost);
      }
      totalCost += routeCost;
    }
    return totalCost;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalCost = calculateTotalCost();
    console.log(`The total cost of the trip is: ${totalCost}`);
  };

  return (
    <div className="scene">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="routeCount">Enter the number of routes:</label>
          <input
            type="number"
            id="routeCount"
            value={routeCount}
            onChange={handleRouteCountChange}
          />
        </div>

        {legCounts.map((legCount, routeIndex) => (
          <div key={routeIndex} className="route">
            <div className="form-group">
              <label htmlFor={`legCount${routeIndex}`}>
                Enter the number of legs for Route {routeIndex + 1}:
              </label>
              <input
                type="number"
                id={`legCount${routeIndex}`}
                value={legCount}
                onChange={(event) => handleLegCountChange(event, routeIndex)}
              />
            </div>

            {legData[routeIndex].map((leg, legIndex) => (
              <div key={legIndex} className="leg">
                <div className="form-group">
                  <label htmlFor={`cityA${routeIndex}${legIndex}`}>
                    Enter the first city for Leg {legIndex + 1}:
                  </label>
                  <input
                    type="text"
                    id={`cityA${routeIndex}${legIndex}`}
                    value={leg.cityA}
                    onChange={(event) =>
                      handleLegDataChange(event, routeIndex, legIndex, 'cityA')
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`cityB${routeIndex}${legIndex}`}>
                    Enter the second city for Leg {legIndex + 1}:
                  </label>
                  <input
                    type="text"
                    id={`cityB${routeIndex}${legIndex}`}
                    value={leg.cityB}
                    onChange={(event) =>
                      handleLegDataChange(event, routeIndex, legIndex, 'cityB')
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`cost${routeIndex}${legIndex}`}>
                    Enter the cost for Leg {legIndex + 1}:
                  </label>
                  <input
                    type="number"
                    id={`cost${routeIndex}${legIndex}`}
                    value={leg.cost}
                    onChange={(event) =>
                      handleLegDataChange(event, routeIndex, legIndex, 'cost')
                    }
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddLeg(routeIndex)}
              className="add-leg-button"
            >
              Add Leg
            </button>
          </div>
        ))}

        <button type="submit" className="calculate-button">
          Calculate Total Cost
        </button>
      </form>
    </div>
  );
}

export default RouteScene;
