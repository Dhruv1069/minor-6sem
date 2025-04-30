import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      GetPlacePhotos();
    }
  }, [trip]);

  const GetPlacePhotos = async () => {
    const address = trip?.userSelection?.place?.formatted_address;
    if (!address) {
      console.warn("No address found for place query");
      return;
    }

    const data = {
      textQuery: address
    };

    try {
      const response = await GetPlaceDetails(data);
      const photoName = response.data?.places?.[0]?.photos?.[7]?.name;

      if (photoName) {
        const url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
        setPhotoUrl(url);
      } else {
        console.warn("No photo available for this place.");
      }
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || '/placeholder.jpg'}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Place"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.place?.formatted_address}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📅 {trip.userSelection?.noOfdays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🥂 No. Of Traveler: {trip.userSelection?.Travelers}
            </h2>
          </div>
        </div>

        <button>
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}

export default InfoSection;
