import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel.hotelName || hotel.hotelAddress || hotel.HotelName|| hotel.HotelAddress
    };

    try {
      const response = await GetPlaceDetails(data);
      const photoName = response.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
        setPhotoUrl(url);
      } else {
        console.warn("No photo found for hotel");
      }
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName||hotel.HotelName}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || "/placeholder.jpg"}
          className="rounded-xl h-[200px] w-full object-cover"
          alt={hotel.hotelName}
        />
        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName || hotel.HotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress || hotel.HotelAddress}</h2>
          <h2 className="font-medium">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
