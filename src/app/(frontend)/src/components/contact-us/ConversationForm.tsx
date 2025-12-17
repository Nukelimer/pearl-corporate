"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Calendar, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  ApplyFormData,
  applySchema,
} from "@/src/app/(frontend)/lib/applySchema";
import {
  ConversationFormData,
  conversationSchema,
} from "@/src/app/(frontend)/lib/conversationSchema";

// --- Time slots
const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function ConversationForm() {
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ConversationFormData>({
    resolver: zodResolver(conversationSchema),
  });

  const onSubmit = async (data: ConversationFormData) => {
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
      className="w-5/6 max-w-xl md:max-w-5xl mx-auto space-y-4 mb-12 flex flex-col  border p-5 rounded-md bg-white shadow-2xl mt-8 ">
      <h4 className="py-6">Send us a Message.</h4>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex  flex-col gap-4">
          <label htmlFor="fName">Full Name*</label>
          <Input
            placeholder="Enter your full name*"
            {...register("name")}
            className="bg-white  py-8"
            id="fName"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex  flex-col gap-4">
          <label className="" htmlFor="phone">
            Phone*
          </label>
          <Input
            type="tel"
            placeholder="Phone*"
            {...register("phone")}
            className="bg-white  py-8"
            id="phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex  flex-col gap-4">
          <label htmlFor="email">Email*</label>
          <Input
            placeholder="Email Address*"
            {...register("email")}
            className="bg-white  py-8"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex  flex-col gap-4">
          <label className="" htmlFor="boe">
            Brief of Enquiry *
          </label>
          <Textarea
            id="boe"
            placeholder="Please provide details about your legal inquiry. Be specific as possible to help us better understand your needs....*"
            rows={5}
            {...register("message")}
            className="bg-white border min-h-40 resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
      </div>

      <Controller
        control={control}
        name="availability"
        render={({ field }) => (
          <div className="space-y-2 hidden">
            <label htmlFor="avl" className="font-medium flex text-sm mb-4">
              Availability*
            </label>
            <select
              id="avl"
              value={field.value?.time || ""}
              onChange={(e) =>
                field.onChange({ ...field.value, time: e.target.value })
              }
              className="bg-white border border-gray-300 w-full py-2 px-2 rounded-md">
              <option value="" className="text-white/80 text-sm">
                Select your Availability
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="text-sm">
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

      {/* <div>
        <Input
          placeholder="Message*"
          rows={5}
          {...register("message")}
          className="bg-white  min-h-40 resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div> */}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-[96%] flex flex-row mx-auto bg-accent hover:bg-accent/90 text-white gap-2">
        {loading ? "Submitting..." : "Submit Your Enguiry"}
        <Calendar className="w-4 h-4" />
      </Button>
    </form>
  );
}
