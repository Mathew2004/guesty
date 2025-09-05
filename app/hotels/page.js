"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Bed,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
  Wifi,
  Globe
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/BookingForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAmenityIcon } from "@/components/HotelResults";
import { allAmenities } from "@/lib/amenities";

export default function HotelDetails() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelCode = searchParams.get("code");
        const checkin = searchParams.get("checkin") || "2025-09-01";
        const checkout = searchParams.get("checkout") || "2025-09-05";
        const guests = searchParams.get("guests") || 1;

        if (!hotelCode) {
          throw new Error("Hotel code is required");
        }

        const response = await axios.post("/api/hotels/details", {
          hotelCode,
          checkin,
          checkout,
          guests: parseInt(guests),
        });

        setHotel(response.data);
      } catch (err) {
        setError(err.response?.data?.details || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [searchParams]);

  const nextImage = () => {
    if (hotel && hotel.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
    }
  };

  const prevImage = () => {
    if (hotel && hotel.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        {/* Shimmer for Image Carousel */}
        <Skeleton className="h-[500px] w-full rounded-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Shimmer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Shimmer */}
            <Card className="p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </Card>

            {/* Description Shimmer */}
            <Card className="p-6">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-2" />
            </Card>

            {/* Contact Info Shimmer */}
            <Card className="p-6">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          </div>

          {/* Right Column Shimmer */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="mt-6 space-y-3">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </Card>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    let errorMessage = error;
    if (typeof error === 'object' && error !== null) {
      errorMessage = error.error || JSON.stringify(error);
    }
    return <div className="container mx-auto p-4 text-red-500 text-center">Error: {errorMessage}</div>;
  }
  if (!hotel) return <div className="container mx-auto p-4 text-center">No se encontraron detalles del hotel.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Image Carousel */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-8">
        {hotel.images && hotel.images.length > 0 ? (
          <>
            <Image
              src={hotel.images[currentImageIndex]}
              alt={`${hotel.name} - Imagen ${currentImageIndex + 1}`}
              fill
              className="object-contain transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white">
              <ChevronLeft />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white">
              <ChevronRight />
            </button>
          </>
        ) : (
          <div className="h-full bg-gray-200 flex items-center justify-center">No hay imágenes disponibles</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2">
          {/* Basic Info */}
          <Card className="p-6 mb-6">
            <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={16} className="mr-2" />
              <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <Bed size={16} className="mr-2" /> {hotel.accommodationType}
              </span>
              {hotel.rating && (
                <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <Star size={16} className="mr-2" /> {hotel.rating} Estrellas
                </span>
              )}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Sobre este hotel</h2>
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
          </Card>

          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {hotel.amenities.map((amenity, index) => {
                  const icon = getAmenityIcon(amenity);
                  const amenityName = allAmenities.find(item => item.en.toLowerCase() === amenity.toLowerCase())?.es || amenity;
                  if(!icon ) return null;
                  return (
                    <div key={index} className={`flex items-center justify-center bg-gray-100 px-3 py-2 rounded-full text-sm text-gray-700`}>
                      {icon || ""}
                      <span className={`text-xs ml-1.5 `}>{amenityName}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Contact Info */}
          {/* <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Información de contacto</h2>
            <div className="space-y-3">
              {hotel.email && (
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  <a href={`mailto:${hotel.email}`} className="text-blue-600 hover:underline">{hotel.email}</a>
                </div>
              )}
              {hotel.web && (
                <div className="flex items-center">
                  <Globe size={16} className="mr-2 text-gray-500" />
                  <a href={hotel.web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{hotel.web}</a>
                </div>
              )}
              {hotel.phones && hotel.phones.map((phone, index) => (
                <div key={index} className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-500" />
                  <span>{phone.phoneNumber} ({phone.phoneType})</span>
                </div>
              ))}
            </div>
          </Card> */}
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-2xl font-semibold mb-4">Detalles de la reserva</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Precio desde:</span>
                <span className="text-2xl font-bold text-green-600">{hotel.currency} {hotel.minRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Precio máximo:</span>
                <span className="text-lg font-semibold">{hotel.currency} {hotel.maxRate}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Habitaciones disponibles</h3>
              {hotel.rooms && hotel.rooms.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {hotel.rooms.map((room, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium">{room.name}</h4>
                      {room.rates && room.rates.map((rate, rateIndex) => (
                        <div key={rateIndex} className="mt-2 text-sm">
                          <div className="flex justify-between">
                            <span>{rate.boardName}</span>
                            <span className="font-bold">{hotel.currency} {rate.net}</span>
                          </div>
                          <div className="text-gray-500 text-xs mt-1">Pago: {rate.paymentType}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay habitaciones disponibles para las fechas seleccionadas.</p>
              )}
            </div>

            <Button className="w-full mt-6" onClick={() => setIsBookingOpen(true)}>Reservar ahora</Button>

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quiero mi contraoferta</DialogTitle>
                </DialogHeader>
                <BookingForm
                  hotel={hotel}
                  searchParams={searchParams}
                  onBookingSuccess={() => setIsBookingOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </Card>
        </div>
      </div>
    </div>
  );
}
