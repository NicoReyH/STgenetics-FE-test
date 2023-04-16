import React from "react";

const Cart = ({ items, totalPrice }) => {
  const groupItems = () => {
    const groupedItems = [];
    items.forEach((item) => {
      const existingItem = groupedItems.find((gi) => gi.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        groupedItems.push({ ...item, quantity: 1 });
      }
    });
    return groupedItems;
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md my-4">
      <h3 className="text-lg font-medium mb-2">Cart</h3>
      {items.length > 0 ? (
        <>
          <ul className="mb-2">
            {groupItems().map((item) => (
              <li key={item.id} className="flex justify-between">
                <p>
                  {item.name} x {item.quantity}
                </p>
                <div className="flex items-center">
                  <p className="mr-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="font-medium">Total: ${totalPrice.toFixed(2)}</p>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
