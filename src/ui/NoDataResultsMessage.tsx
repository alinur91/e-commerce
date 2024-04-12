type NoResultsMessageProps = {
  imageUrl: string;
  message?: string;
  imgClassName?: string;
};

const NoDataResultsMessage = ({ imageUrl, message }: NoResultsMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img className={`h-52 object-contain md:h-80`} src={imageUrl} alt="" />
      {message && (
        <p className="text-sm font-semibold text-gray-400 md:text-lg">
          {message}
        </p>
      )}
    </div>
  );
};

export default NoDataResultsMessage;
