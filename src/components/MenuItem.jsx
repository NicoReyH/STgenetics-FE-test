import React from "react";

const MenuItem = ({ item, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(item);
  };

  return (
    <li
      key={item.id}
      className="py-2 flex justify-between items-center border-b border-gray-300"
    >
      <div>
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
      <div>
        <span className="text-lg font-medium">${item.price.toFixed(2)}</span>
        <button
          className="ml-4 bg-blue-500 text-white rounded-md px-3 py-1"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default MenuItem;
