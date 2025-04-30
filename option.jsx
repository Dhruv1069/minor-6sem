export const AI_PROMPT = 'Generate travel plan for location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel Address,Price,Hotel Image url, geo coordinates, rating, description and suggest itinerary with placeName, place Details, place image url, geocoordinates, ticket pricing, time travel each of the location for {totalDays} days with each day plan with best time to visit in json format.';



export const AI_PROMPT = `Generate a travel plan based on the following inputs:
Location: {location}
Total Days: {totalDays}
Traveler Type: {traveler}
Budget: {budget}

Produce the output *strictly* in the following JSON format. Adhere exactly to the specified key names, data types (string, number, map, array), and nesting structure as shown below.


**Required JSON Structure:**

{
  "id": "(string) - Generate a unique string identifier (e.g., using timestamp)",
  "tripData": { // map
    "travelPlan": { // map
      "budget": "(string) - The specified {budget}",
      "duration": "(string) - Formatted string like '{totalDays} Days'",
      "hotels": [ // array of maps
        {
          "description": "(string) - Description of the hotel.",
          "geoCoordinates": { // map
            "latitude": "(string) - Latitude coordinate.",
            "longitude": "(string) - Longitude coordinate."
          },
          "hotelAddress": "(string) - Full address of the hotel.",
          "hotelImageUrl": "(string) - A valid URL to an image of the hotel.",
          "hotelName": "(string) - Name of the hotel.",
          "price": "(string) - Estimated price range (e.g., '$150-250', '$1000+').",
          "rating": "(string) - Hotel rating (e.g., '4.5')."
        }
        // Include 2-3 relevant hotel options matching the budget
      ],
      "itinerary": [ // array of maps
        {
          "day": "(number) - The day number (e.g., 1, 2, ... {totalDays})",
          "plan": [ // array of maps
            {
              "geoCoordinates": { // map
                "latitude": "(string) - Latitude coordinate of the place.",
                "longitude": "(string) - Longitude coordinate of the place."
              },
              "placeDetails": "(string) - Details or description of the activity/place.",
              "placeImageUrl": "(string) - A valid URL to an image of the place/activity.",
              "placeName": "(string) - Name of the place or activity.",
              "ticketPricing": "(string) - Estimated ticket price (e.g., 'Free', '$25', 'Varies').",
              "timeToVisit": "(string) - Suggested time to visit (e.g., 'Morning', 'Afternoon', '9 AM - 1 PM')."
            }
            // Include 2-4 plan items for this day
          ]
        }
        // Include one map object for each day up to {totalDays}
      ]
    },
    "location": "(string) - The input {location}",
    "travelers": "(number) - The number of travelers specified by {traveler} (interpret 'Couple' as 2, 'Family' as maybe 4, 'Solo' as 1, adjust as needed or use a specific number input if available)",
    "userEmail": "(string) - The user's email address (You might need to pass this separately if it's sensitive, or use a placeholder if not available)"
  },
  "userSelection": { // map - Reflect the user's input parameters
    "Travelers": "(string) - The original {traveler} input string or derived number as string",
    "budget": "(string) - The specified {budget}",
    "noOfdays": "(string) - The specified {totalDays} as a string"
  },
  "place": { // map - Details about the primary {location}
    "formatted_address": "(string) - The formatted address for {location}.",
    "geometry": { // map
      "location": { // map
        "lat": "(number) - Latitude of the primary {location}.",
        "lng": "(number) - Longitude of the primary {location}."
      }
    },
    "name": "(string or null) - The name of the place, often same as location or null.",
    "place_id": "(string) - A unique identifier for the place (e.g., Google Place ID, if possible to determine)."
  }
}`;
