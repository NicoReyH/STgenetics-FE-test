import React, { useState } from "react";
import menuData from "../menuData.json";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import OrderForm from "./OrderForm";

const Menu = ({ onAddOrder }) => {
  const [filter, setFilter] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [isOrderEmpty, setOrderEmpty] = useState(false);
  const [discount, setDiscount] = useState("No discount");

  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleAddToCart = (item) => {
    let newCartItems = [...cartItems];

    const existingItem = newCartItems.find(
      (cartItem) => cartItem.category === item.category
    );
    if (existingItem) {
      alert(`You can only select one ${existingItem.name} per order.`);
      return;
    }

    newCartItems.push(item);

    // Calculate order total and discount
    let orderTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price,
      0
    );
    let newDiscount = 0;
    if (newCartItems.some((cartItem) => cartItem.category === "sandwiches")) {
      if (
        newCartItems.some((cartItem) => cartItem.name === "Fries") &&
        newCartItems.some((cartItem) => cartItem.name === "Soft drink")
      ) {
        newDiscount = orderTotal * 0.2;
        setDiscount("20% off!");
      } else if (
        newCartItems.some((cartItem) => cartItem.name === "Soft drink")
      ) {
        newDiscount = orderTotal * 0.15;
        setDiscount("15% off!");
      } else if (newCartItems.some((cartItem) => cartItem.name === "Fries")) {
        newDiscount = orderTotal * 0.1;
        setDiscount("10% off!");
      }
    }
    orderTotal -= newDiscount;

    // Update state
    setOrderEmpty(false);
    setCartItems(newCartItems);
    setOrderTotal(orderTotal);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleSubmitOrder = () => {
    if (cartItems.length < 1) {
      setOrderEmpty(true);
      return;
    }
    alert(
      `Order for ${customerName} sent, order total is $${orderTotal.toFixed(
        2
      )}.`
    );
    setCartItems([]);
    setCustomerName("");
    setOrderTotal(0);
    onAddOrder({ customerName, items: cartItems, total: orderTotal });
  };

  const filteredMenuData = menuData.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Our Menu</h2>
          <div>
            <label htmlFor="filter" className="mr-2 font-medium">
              Filter by:
            </label>
            <select
              id="filter"
              className="border border-gray-300 rounded-md px-2 py-1"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="sandwiches">Sandwiches</option>
              <option value="extras">Extras</option>
            </select>
          </div>
        </div>
        <ul>
          {filteredMenuData.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onAddOrder={onAddOrder}
              cartItems={cartItems}
            />
          ))}
        </ul>
        {cartItems.length > 0 && (
          <p className="mt-4 font-medium text-center">
            Order Total: ${orderTotal.toFixed(2)} ({discount})
          </p>
        )}
      </div>
      <Cart items={cartItems} totalPrice={orderTotal} />
      <OrderForm
        customerName={customerName}
        onCustomerNameChange={handleCustomerNameChange}
        onSubmitOrder={handleSubmitOrder}
        orderEmpty={isOrderEmpty}
      />
    </>
  );
};

export default Menu;
