"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  phone: z.string().min(10, { message: "Por favor, introduce un número de teléfono válido." }),
  checkin: z.string(),
  checkout: z.string(),
  guests: z.string(),
  hotelName: z.string(),
  address: z.string(),
});

export function BookingForm({ hotel, searchParams, onBookingSuccess }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkin: searchParams.get("checkin") || "",
      checkout: searchParams.get("checkout") || "",
      guests: searchParams.get("guests") || "1",
      hotelName: hotel.name,
      address: `${hotel.address}, ${hotel.city}`,
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const response = await axios.post("/api/booking/send-enquiry", values);
      toast({
        title: "¡Solicitud de reserva enviada!",
        description: "Hemos recibido tu solicitud y nos pondremos en contacto en breve.",
      });
      onBookingSuccess(); // Close the modal on success
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo salió mal. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de teléfono</FormLabel>
              <FormControl>
                <Input placeholder="+1 234 567 890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Hidden fields with pre-filled data */}
        <FormField control={form.control} name="hotelName" render={({ field }) => <input type="hidden" {...field} />} />
        <FormField control={form.control} name="address" render={({ field }) => <input type="hidden" {...field} />} />
        <FormField control={form.control} name="checkin" render={({ field }) => <input type="hidden" {...field} />} />
        <FormField control={form.control} name="checkout" render={({ field }) => <input type="hidden" {...field} />} />
        <FormField control={form.control} name="guests" render={({ field }) => <input type="hidden" {...field} />} />

        <div className="pt-4">
            <p className="font-semibold">{form.getValues('hotelName')}</p>
            <p className="text-sm text-gray-600">{form.getValues('address')}</p>
            <p className="text-sm text-gray-600">
                {form.getValues('checkin')} a {form.getValues('checkout')} - {form.getValues('guests')} huésped(es)
            </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar consulta"}
        </Button>
      </form>
    </Form>
  );
}
