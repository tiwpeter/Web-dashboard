import React from "react";

type CardProps = {
  image: string;
  title: string;
  value: string;
  percentage: string;
  subtitle: string;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  value,
  percentage,
  subtitle,
}) => {
  return (
    <div className="px-3 sm:w-1/2 mb-6 mt-4">
      <div className="rounded-xl bg-gray-800">
        <div className="p-4">
          <div>
            <img
              src={image}
              alt={title}
              className="object-cover rounded-full"
            />
          </div>
          <div className="rounded-md flex-grow flex flex-col mt-2">
            <span className="text-white">{title}</span>
            <span className="mb-3 text-lg font-bold text-white">{value}</span>
            <div className="flex items-center space-x-1">
              <span className="text-emerald-500 font-semibold">
                {percentage}
              </span>
              <span className="text-gray-400">{subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
