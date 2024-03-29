// import { useState } from "react";

const Price = () => {
  // const [price, setPrice] = useState(90);

  // Function to handle changes in the range input
  // const handlePriceChange = () => {
  //   // Update the state with the new value of the range input
  //   setPrice(parseInt(event.target.value));
  // };

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Price</h3>
      <input
        type="range"
        name="price"
        id="price"
        min="0"
        max="100"
        // value={price} // Set the value of the range input to the state value
        step="20"
        // onChange={handlePriceChange} // Call handlePriceChange when the input value changes
      />
    </div>
  );
};

export default Price;
