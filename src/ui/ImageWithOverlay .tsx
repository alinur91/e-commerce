type ImageWithOverlayProps = {
  imageUrl: string;
};

const ImageWithOverlay = ({ imageUrl }: ImageWithOverlayProps) => {
  return (
    <div className="hidden h-full lg:block lg:w-[57%]">
      <img className="h-full object-cover" src={imageUrl} />
    </div>
  );
};

export default ImageWithOverlay;
