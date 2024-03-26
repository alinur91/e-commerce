type NoResultsMessageProps = {
  imageUrl: string;
  message: string;
};

const NoSearchResultsMessage = ({
  imageUrl,
  message,
}: NoResultsMessageProps) => {
  return (
    <div className="flex flex-col">
      <img className="h-52 object-contain md:h-80" src={imageUrl} alt="" />
      <p className="text-sm font-semibold text-gray-400 md:text-lg">
        {message}
      </p>
    </div>
  );
};

export default NoSearchResultsMessage;
