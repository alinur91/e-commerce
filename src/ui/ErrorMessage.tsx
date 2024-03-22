import { MdError } from "@utils/icons";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center">
      {message} <MdError className="text-[40px] text-red-600" />{" "}
    </div>
  );
};

export default ErrorMessage;
