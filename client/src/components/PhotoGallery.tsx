import { useState } from "react";

const PhotoGallery = ({ photoGallery }: { photoGallery: string[] }) => {
  const [activeImg, setActiveImg] = useState(photoGallery[0]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <img
        src={activeImg}
        alt={activeImg}
        className="rounded-md h-[25rem] object-cover"
      />
      <div className="grid gap-x-4 grid-cols-5">
        {photoGallery.map((photo) => {
          return (
            <img
              key={photo}
              src={photo}
              className={`w-full h-[6rem] object-cover rounded-md ${
                activeImg === photo
                  ? "border-2 border-purple-500 opacity-75"
                  : ""
              }`}
              onClick={() => setActiveImg(photo)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PhotoGallery;
