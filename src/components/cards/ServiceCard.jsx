"use client"

import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  const {
    _id,
    name,
    slug,
    shortDescription,
    image,
    startingPrice,
    priceUnit,
    features,
  } = service;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Service Image */}
      <div className="relative h-72 w-full overflow-hidden bg-base-200">
        <Image
          src={image || "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 badge badge-primary font-semibold text-white shadow-md">
          ৳{startingPrice} / {priceUnit}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body p-6 flex flex-col grow">
        <h3 className="card-title text-2xl font-bold text-base-content">{name}</h3>
        <p className="text-sm text-base-content/70 mt-1 line-clamp-2">{shortDescription}</p>

        {/* Features List */}
        <div className="mt-4 space-y-2 grow">
          {features?.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-base-content/80">
              <FaCheckCircle className="text-primary shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        {/* Card Actions / Buttons */}
        <div className="card-actions mt-6 pt-4 border-t border-base-200 grid grid-cols-2 gap-3">
          <Link
            href={`/services/${_id}`}
            className="btn btn-outline btn-primary btn-sm rounded-lg w-full"
          >
            View Details
          </Link>
          <Link
            href={`/booking/${_id}`}
            className="btn btn-primary text-white btn-sm rounded-lg w-full shadow-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;