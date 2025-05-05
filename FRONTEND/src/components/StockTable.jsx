import React from "react";

const StockTable = () => {
  const stockData = [
    { id: 1, item: "Item A", quantity: 50, status: "In Stock" },
    { id: 2, item: "Item B", quantity: 0, status: "Out of Stock" },
    { id: 3, item: "Item C", quantity: 20, status: "Low Stock" },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Stock Table</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Item</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock) => (
            <tr key={stock.id}>
              <td className="border border-gray-300 px-4 py-2">{stock.id}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.item}</td>
              <td className="border border-gray-300 px-4 py-2">
                {stock.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {stock.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
