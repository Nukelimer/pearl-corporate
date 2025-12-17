"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  ContactFormData,
  contactSchema,
} from "@/src/app/(frontend)/lib/contactSchema";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// --- Time slots
const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      toast.success(
        `Message sent! You booked ${data.availability.day.toDateString()} at ${
          data.availability.time
        }`
      );
      reset();
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-4 flex flex-col  ">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Name*"
            {...register("name")}
            className="bg-white border py-6 md:py-4"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Email*"
            {...register("email")}
            className="bg-white border py-6 md:py-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          type="tel"
          placeholder="Phone*"
          {...register("phone")}
          className="bg-white border py-6 md:py-4"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="availability"
        render={({ field }) => (
          <div className="space-y-2">
            <p className="font-medium text-sm mt-2 md:hidden">Select Time*</p>
            <select
              value={field.value?.time || ""}
              onChange={(e) =>
                field.onChange({ ...field.value, time: e.target.value })
              }
              className="bg-white border border-gray-300 w-full py-2 px-2 rounded-md">
              <option value="">Select availability</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="">
                  {slot}
                </option>
              ))}
            </select>
            {errors.availability?.time && (
              <p className="text-red-500 text-sm">
                {errors.availability.time.message}
              </p>
            )}

            <div className="flex items-center justify-between  mt-6">
              <p className="font-medium full">Select Day*</p>
              <Button
                variant={"ghost"}
                className="border"
                onClick={(e) => {
                  e.preventDefault();

                  setShowCalendar(!showCalendar);
                }}>
                {" "}
                Show Cal
              </Button>
            </div>

            {showCalendar && (
              <div className="">
                <DayPicker
                  mode="single"
                  selected={field.value?.day}
                  onSelect={(day) => field.onChange({ ...field.value, day })}
                  className=" rounded-md border-4 mx-auto w-full "
                />
                {errors.availability?.day && (
                  <p className="text-red-500 text-sm">
                    {errors.availability.day.message}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      />

      <div>
        <Textarea
          placeholder="Message*"
          rows={5}
          {...register("message")}
          className="bg-white border min-h-40 md:min-h-12 resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>
      {/* --- Submit Button --- */}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-4/6 md:w-full mx-auto bg-accent hover:bg-accent/90 text-white gap-2">
        {loading ? "Sending..." : "Submit Inquiry"}
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
