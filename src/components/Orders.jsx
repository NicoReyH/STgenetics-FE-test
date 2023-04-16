import React from "react";

const Orders = ({ orders }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">All Orders</h2>
      {orders.map((order, index) => {
        return (
          <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
            <h3 className="text-lg font-medium mb-2">{order.customerName}</h3>
            <ul className="list-disc ml-6 mb-2">
              {order.items.map((item, index) => (
                <li key={index}>
                  <span className="font-medium">{item.name}</span> x1 $
                  {item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="text-md font-medium mb-2">
              Total: ${order.total.toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
