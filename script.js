async function fetchAPIData() {
  try {
    const AmazonProductsTable = document.getElementById('AmazonProductsTable');
    
    // Fetching data from API
    const response = await fetch("https://s3.amazonaws.com/open-to-cors/assignment.json");

    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }

    // Converting promise to JSON object
    const data = await response.json();
    
    if (!data || !data.products) {
      throw new Error('Invalid data format or missing products');
    }

    const products = data.products;

    // Creating array of objects and sorting based on popularity
    const productsArray = Object.values(products);
    const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);

    // Generating HTML for table rows
    const tableRowsHTML = sortedProducts.map((product) => `
      <tr>
        <td>${product.subcategory}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.popularity}</td>
      </tr>
    `).join('');

    // Update the table content
    AmazonProductsTable.innerHTML = tableRowsHTML;
    
  } catch (error) {
    console.error("Error while fetching or processing data:", error);
    // Handle error gracefully, e.g., show a user-friendly message
  }
}

// Call the function
fetchAPIData();

