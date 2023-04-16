import React, { useState } from "react";
import Menu from "./components/Menu";
import Orders from "./components/Orders";

const App = () => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Good Hamburguer</h1>
      <Menu onAddOrder={addOrder} />
      <Orders orders={orders} />
    </div>
  );
};

export default App;
