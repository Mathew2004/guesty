import { Wind, Tv, Wifi, UtensilsCrossed, Car, Droplets, Sun, PawPrint, Waves, Heater, Flame, WashingMachine, Trees, Dumbbell, Fan, CookingPot } from 'lucide-react';

export const allAmenities = [
    // Popular
    { en: "Beach front", es: "Frente a la playa", icon: <Waves size={18} />, type: 'popular' },
    { en: "Pool", es: "Piscina", icon: <Droplets size={18} />, type: 'popular' },
    { en: "Wireless Internet", es: "WiFi", icon: <Wifi size={18} />, type: 'popular' },
    { en: "Air conditioning", es: "Aire acondicionado", icon: <Wind size={18} />, type: 'popular' },
    { en: "Pets friendly", es: "Admite mascotas", icon: <PawPrint size={18} />, type: 'popular' },
    { en: "Kitchen", es: "Cocina", icon: <UtensilsCrossed size={18} />, type: 'popular' },

    // Other
    { en: "Terrace", es: "Terraza", icon: <Sun size={18} />, type: 'other' },
    { en: "Garden", es: "Jardín", icon: <Trees size={18} />, type: 'other' },
    { en: "Free parking", es: "Aparcamiento gratuito", icon: <Car size={18} />, type: 'other' },
    { en: "Washing machine", es: "Lavadora", icon: <WashingMachine size={18} />, type: 'other' },
    { en: "Heating", es: "Calefacción", icon: <Heater size={18} />, type: 'other' },
    { en: "Fireplace", es: "Chimenea", icon: <Flame size={18} />, type: 'other' },
    { en: "Barbecue", es: "Barbacoa", icon: <CookingPot size={18} />, type: 'other' },
    { en: "TV", es: "Televisión", icon: <Tv size={18} />, type: 'other' },
    { en: "Hair dryer", es: "Secador de pelo", icon: <Fan size={18} />, type: 'other' },
    { en: "Gym", es: "Gimnasio", icon: <Dumbbell size={18} />, type: 'other' },
];
