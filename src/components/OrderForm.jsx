import React, { useState } from "react";

const OrderForm = ({
  onSubmitOrder,
  onCustomerNameChange,
  customerName,
  orderEmpty,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitOrder();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="customerName"
          className="block text-gray-700 font-medium mb-2"
        >
          Customer Name:
        </label>
        <input
          type="text"
          id="customerName"
          className="border border-gray-400 rounded-md px-3 py-2 w-full"
          value={customerName}
          onChange={onCustomerNameChange}
          required
        />
        {orderEmpty && (
          <p className="text-red-600">You can't submit an empty order</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-500 text-white rounded-md px-4 py-2"
        >
          Submit Order
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
