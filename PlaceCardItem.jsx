import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from "@/service/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName || place.placeAddress
    };

    try {
      const response = await GetPlaceDetails(data);
      const photoName = response.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
        setPhotoUrl(url);
      } else {
        console.warn("No photo found for place");
      }
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
    }
  };

  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img
        src={photoUrl || "/placeholder.jpg"}
        alt={place.placeName}
        className='w-[130px] h-[130px] rounded-xl object-cover'
      />
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <h2>{place.ticketPricing}</h2>
        <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target='_blank'>
          <div className='mt-2'>
            <Button size="sm"><FaMapLocationDot /></Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
