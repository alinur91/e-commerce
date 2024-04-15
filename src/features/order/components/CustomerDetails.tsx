import { useAppSelector } from "@hooks/useAppSelector";
import { selectOrderData } from "@features/order/slices/selector";

const CustomerDetails = () => {
  const { name, phoneNumber, address } = useAppSelector(selectOrderData);

  return (
    <section className="space-y-3">
      <h1 className="mb-4 text-center text-lg md:text-xl font-bold uppercase text-green-400">
        customer details
      </h1>
      <section>
        <span className="text-gray-400">Customer Name: </span>
        <span className="font-bold uppercase">{name}</span>
      </section>
      <section>
        <span className="text-gray-400">Customer Phone Number: </span>
        <span className="font-bold uppercase">{phoneNumber}</span>
      </section>
      <section>
        <span className="text-gray-400">Customer Address: </span>
        <span className="font-bold uppercase">{address}</span>
      </section>
    </section>
  );
};

export default CustomerDetails;
