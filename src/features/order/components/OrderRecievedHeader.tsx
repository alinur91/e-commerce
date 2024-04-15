import { orderPlaced } from "@data/index";

const OrderRecievedHeader = () => {
  return (
    <section className="flex flex-col items-center justify-center space-y-1">
      <img className="h-44 md:h-52" src={orderPlaced} alt="" />
      <h1 className="text-xl md:text-2xl font-extrabold uppercase">
        yay! We have received your order
      </h1>
      <p className="text-md md:text-lg font-semibold text-gray-400">
        Your order will be delivered soon...
      </p>
    </section>
  );
};

export default OrderRecievedHeader;
