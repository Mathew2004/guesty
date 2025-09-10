import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const containerStyle = {
    width: "100%",
    height: "500px"
};

export function HotelsMap({ hotels, selectedCurrency, convertPrice, getCurrencySymbol }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // <-- put your API key
    });

    const center = { lat: hotels[0]?.coordinates?.latitude, lng: hotels[0]?.coordinates?.longitude };

    const [selectedHotel, setSelectedHotel] = useState(null);

    const getRedirectUrl = (hotel) => {
        if (hotel?.source === 'guesty') {
            return `https://guestyz.guestybookings.com/es/properties/${hotel.id}?city=${hotel.city}&country=${hotel.country}&minOccupancy=${hotel.minOccupancy || 2}&checkIn=${hotel.checkin || ''}&checkOut=${hotel.checkout || ''}`;
        } else if (hotel?.source === 'booking' && hotel?.hotel_link) {
            // return `${hotel.hotel_link}?checkin=${hotel.searchParams?.checkin || ''}&checkout=${hotel.searchParams?.checkout || ''}`;
            return `https://www.booking.com/searchresults.html?ss=${hotel.city}&ssne=${hotel.city}&ssne_untouched=${hotel.city}&highlighted_hotels=${hotel.id}&checkin=${hotel.searchParams?.checkin || ''}&checkout=${hotel.searchParams?.checkout || ''}`;
        } else if (hotel?.source === 'hotelbeds') {
            return `/hotels?code=${hotel.code}&checkin=${hotel.checkin || ''}&checkout=${hotel.checkout || ''}&guests=${hotel.guests || '2'}`;
        }
        return null;
    };

    return (
        isLoaded && (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
            >
                {hotels.map((hotel) => (
                    <Marker
                        key={hotel.id}
                        position={{ lat: hotel?.coordinates?.latitude, lng: hotel?.coordinates?.longitude }}
                        title={hotel.name}
                        onClick={() => setSelectedHotel(hotel)}
                    />
                ))}

                {selectedHotel && (
                    <InfoWindow
                        position={{ lat: selectedHotel.coordinates.latitude, lng: selectedHotel.coordinates.longitude }}
                        onCloseClick={() => setSelectedHotel(null)}
                    >
                        <div style={{
                            width: "300px",
                            backgroundColor: "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}>
                            {/* Hotel Image */}
                            <div style={{ position: "relative", width: "100%", height: "80px" }}>
                                <img
                                    src={selectedHotel.images?.[0] || selectedHotel.image || 'https://via.placeholder.com/300x180?text=No+Image'}
                                    alt={selectedHotel.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>

                            {/* Hotel Details */}
                            <div style={{ padding: "16px" }}>
                                <h3 style={{
                                    margin: "0 0 8px 0",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#1f2937",
                                    lineHeight: "1.2"
                                }}>
                                    {selectedHotel.name}
                                </h3>

                                <p style={{
                                    fontSize: "13px",
                                    color: "#6b7280",
                                    margin: "0 0 12px 0",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <span style={{ marginRight: "4px" }}>
                                        <MapPin size={14} className="text-gray-400" />
                                    </span>
                                    {selectedHotel.address || selectedHotel.location || `${selectedHotel.city}, ${selectedHotel.country}`}
                                </p>

                                {/* Property Type and Features */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "12px",
                                    color: "#6b7280",
                                    marginBottom: "12px",
                                    flexWrap: "wrap",
                                    gap: "8px"
                                }}>
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        🏠 {selectedHotel.accommodationType || selectedHotel.type || 'House'}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        👥 {selectedHotel.maxGuests || selectedHotel.guests || 8} Guests
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        🛏️ {selectedHotel.bedrooms || 3} Bedrooms
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        🚿 {selectedHotel.bathrooms || 2} Bathrooms
                                    </span>
                                </div>

                                {/* Price Section */}
                                <div style={{ marginBottom: "12px" }}>
                                    <p style={{
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        margin: "0 0 4px 0"
                                    }}>
                                        Price per night
                                    </p>
                                    <p style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#1f2937",
                                        margin: "0"
                                    }}>
                                        {convertPrice && getCurrencySymbol ? 
                                            `${getCurrencySymbol()}${convertPrice(selectedHotel.price || selectedHotel.minRate || selectedHotel.prices?.basePrice || 294).toLocaleString()}` :
                                            `€${Math.round(selectedHotel.price || selectedHotel.minRate || selectedHotel.prices?.basePrice || 294)}`
                                        }
                                    </p>
                                    <p style={{
                                        fontSize: "11px",
                                        color: "#9ca3af",
                                        margin: "2px 0 0 0"
                                    }}>
                                        Additional charges may apply
                                    </p>
                                </div>

                                {/* View Deal Button */}
                                <a href={getRedirectUrl(selectedHotel)} target="_blank" rel="noopener noreferrer"
                                    className="bg-[#486698] text-white text-center px-8 py-3 text-md font-medium transition-colors w-full">
                                    Buscar oferta
                                </a>
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        )
    );
}
