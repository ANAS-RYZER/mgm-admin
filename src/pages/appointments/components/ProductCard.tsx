import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  sku: string;
}

const ProductCard = ({ image, name, sku }: ProductCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm p-3 bg-white">
      <img className="w-50 h-50 rounded mb-3" src={image} alt={name} />
      <h1 className="text-xl font-medium ml-3 line-clamp-2">{name}</h1>
      <p className=" text-xs text-muted-foreground ml-3 mt-1">
        sku-id: <span className="text-black uppercase">{sku}</span>
      </p>
    </div>
  );
};

export default ProductCard;
