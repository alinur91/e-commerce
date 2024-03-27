import { MdError } from "@utils/icons";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <MdError className="text-[200px] text-red-600" /> {message}
    </div>
  );
};

export default ErrorMessage;
