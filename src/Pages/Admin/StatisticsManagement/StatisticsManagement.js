import React, { useEffect, useState } from "react";
import clientAPI from "../../../client-api/rest-client"; // Assuming this is the correct import

const StatisticsManagement = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Correct the API endpoint to fetch best-selling products
        const response = await clientAPI.get("best-selling");  // Correct API path
        
        console.log("Response data:", response.data);
        setBestSellingProducts(response.data.bestSellingProducts || []);
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Best-Selling Products</h1>
      {bestSellingProducts.length > 0 ? (
        <div>
          {bestSellingProducts.map((product) => (
            <div key={product._id}>
              <h3>{product.nameOfProduct}</h3>
              <p>Quantity Sold: {product.quantitySold}</p>
              <p>Total Revenue: {product.totalRevenue}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No best-selling products available.</p>
      )}
    </div>
  );
};

export default StatisticsManagement;
