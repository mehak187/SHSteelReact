import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { FaXmark } from "react-icons/fa6";
import MultiSelect from "./MultiSelect";
import SingleSelect from "./SingleSelect";
import ColorSelect from "./ColorSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useGetManagersListQuery } from "../../api/apiComponents/managerApi";
import { useGetCoordinatorsListQuery } from "../../api/apiComponents/coordinatorApi";
import Loader from "../Loader/Loader";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

export default function AddNewProject({
  open,
  onOpenChange,
  mode = "new",
  onSubmitHandler,
}) {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      manager_id: null,
      coordinator_id: [],
      schedule_type: null,
      start_date: null,
      misc_duration_weeks: 0,
      shop_duration_weeks: 0,
      field_people: 0,
    },
  });

  const { data: coordinators, isLoading: isFetching } =
    useGetCoordinatorsListQuery();

  const { data: managers, isLoading: isFetchingManagers } =
    useGetManagersListQuery();

  const colorOptions = [
    { label: "Standard", color: "#56CA00", value: "standard" },
    { label: "Front", color: "#33BBFE", value: "front" },
    { label: "Back", color: "#FF4C51", value: "back" },
  ];

  // Watch misc and shop weeks to calculate total duration
  const miscWeeks = watch("misc_duration_weeks") || 0;
  const shopWeeks = watch("shop_duration_weeks") || 0;

  useEffect(() => {
    // Calculate total duration whenever misc or shop weeks change
    const total = Number(miscWeeks) + Number(shopWeeks);
    setValue("duration_weeks", total);
  }, [miscWeeks, shopWeeks, setValue]);

  const onSubmit = async (data) => {
    // Format the data as required by the API
    const payload = {
      name: data.name,
      manager_id: data.manager_id,
      coordinator_id: data.coordinator_id,
      schedule_type: data.schedule_type?.value || "",
      duration_weeks: data.duration_weeks.toString(),
      misc_duration_weeks: Number(data.misc_duration_weeks),
      start_date: data.start_date
        ? new Date(data.start_date).toLocaleDateString("en-GB")
        : "",
      shop_duration_weeks: Number(data.shop_duration_weeks),
      field_people: data.field_people.toString(),
    };

    try {
      const response = await onSubmitHandler(payload);
      toast.success(
        `Project ${mode === "edit" ? "updated" : "created"} successfully!`
      );
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Create manager failed:", error);

      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(error?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <div>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "350px",
          },
        }}
        anchor={"right"}
        open={open}
        onClose={() => {
          reset();
          onOpenChange(false);
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 justify-between p-3 border-b border-[#2E263D1F]">
            <p className="text-lg font-medium text-[#2E263DE5]">
              Add New Project
            </p>
            <button
              type="button"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              <FaXmark className="text-[#2E263DB2]" />
            </button>
          </div>
          <div className="p-2 m-1 h-[calc(100%-120px)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  id="name"
                  className={`border rounded-[6px] block w-full p-3 text-sm ${
                    errors.name ? "border-red-500" : "border-[#2E263D38]"
                  } placeholder:text-[#2E263D66]`}
                  placeholder="Project Name"
                  {...register("name", {
                    required: "Project name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="manager_id"
                  control={control}
                  rules={{ required: "Project manager is required" }}
                  render={({ field }) => (
                    <SingleSelect
                      placeholder="Select Project Manager"
                      options={managers}
                      value={managers?.find((m) => m.id === field.value)}
                      onChange={(option) => field.onChange(option?.id)}
                      error={errors.manager_id}
                      errorMessage={errors.manager_id?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="coordinator_id"
                  control={control}
                  rules={{
                    required: "At least one coordinator is required",
                    validate: (value) =>
                      value?.length > 0 ||
                      "At least one coordinator is required",
                  }}
                  render={({ field }) => (
                    <MultiSelect
                      options={coordinators}
                      placeholder="Select Project Coordinator"
                      value={field.value}
                      onChange={(selectedIds) => field.onChange(selectedIds)}
                      error={errors.coordinator_id}
                      errorMessage={errors.coordinator_id?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="schedule_type"
                  control={control}
                  rules={{ required: "Schedule type is required" }}
                  render={({ field }) => (
                    <ColorSelect
                      options={colorOptions}
                      placeholder="Schedule Type"
                      value={field.value}
                      onChange={(option) => field.onChange(option)}
                      error={errors.schedule_type}
                      errorMessage={errors.schedule_type?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="start_date"
                  control={control}
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className={`border rounded-[6px] block w-full p-3 text-sm ${
                        errors.start_date
                          ? "border-red-500"
                          : "border-[#2E263D38]"
                      } placeholder:text-[#2E263D66]`}
                      placeholderText="Select Start Date"
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="duration_weeks"
                  readOnly
                  className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                  placeholder="Duration Weeks"
                  {...register("duration_weeks")}
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium text-lg">Departments</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <p className="font-medium">Shop</p>
                </div>
                <div>
                  <input
                    type="number"
                    id="shop_duration_weeks"
                    className={`border rounded-[6px] block w-full p-3 text-sm ${
                      errors.shop_duration_weeks
                        ? "border-red-500"
                        : "border-[#2E263D38]"
                    } placeholder:text-[#2E263D66]`}
                    placeholder="Man Weeks"
                    {...register("shop_duration_weeks", {
                      required: "Shop weeks is required",
                      min: { value: 0, message: "Must be 0 or greater" },
                    })}
                  />
                  {errors.shop_duration_weeks && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.shop_duration_weeks.message}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-medium">Misc</p>
                </div>
                <div>
                  <input
                    type="number"
                    id="misc_duration_weeks"
                    className={`border rounded-[6px] block w-full p-3 text-sm ${
                      errors.misc_duration_weeks
                        ? "border-red-500"
                        : "border-[#2E263D38]"
                    } placeholder:text-[#2E263D66]`}
                    placeholder="Man Weeks"
                    {...register("misc_duration_weeks", {
                      required: "Misc weeks is required",
                      min: { value: 0, message: "Must be 0 or greater" },
                    })}
                  />
                  {errors.misc_duration_weeks && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.misc_duration_weeks.message}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-medium">Field</p>
                </div>
                <div>
                  <input
                    type="number"
                    id="field_people"
                    className={`border rounded-[6px] block w-full p-3 text-sm ${
                      errors.field_people
                        ? "border-red-500"
                        : "border-[#2E263D38]"
                    } placeholder:text-[#2E263D66]`}
                    placeholder="Field People"
                    {...register("field_people", {
                      required: "Field people is required",
                      min: { value: 0, message: "Must be 0 or greater" },
                    })}
                  />
                  {errors.field_people && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.field_people.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 flex items-center gap-3">
            <button
              type="submit"
              className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              className="text-[#88191F] text-sm font-medium bg-white border border-[#88191F] rounded-[6px] py-2 px-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </Drawer>

      <Loader loading={isFetching || isFetchingManagers} />
    </div>
  );
}
