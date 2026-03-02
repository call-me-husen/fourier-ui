"use client";

import { useUser } from "@/hooks/user/use-user";
import cn from "@/lib/styles/cn";
import {
  X,
  Loader2,
  Save,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { ConfirmationModal } from "../common/confirmation-modal";
import { useUpdateEmployeeProfile } from "@/hooks/employee/use-employee-api";
import useSnackbar from "@/hooks/core/use-snackbar";

export default function ProfileForm() {
  const { data: user, setUser } = useUser();
  const { show } = useSnackbar();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [isLoading] = useState<boolean>(false);
  const { fetcher: postUpdateProfile } = useUpdateEmployeeProfile({
    onSuccess: (data) => {
      setOpenConfirmation(false);
      setIsEditing(false);
      setUser(data);

      show("Profile updated successfully", { type: "success" });
    },
    onError: (error) => {
      setOpenConfirmation(false);
      setIsEditing(false);
      show(error, { type: "error" });
    },
  });

  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.contact?.phone || "",
  );
  const [address, setAddress] = useState<string>(user?.contact?.address || "");

  const [emergencyContactName, setEmergencyContactName] = useState<string>(
    user?.contact?.emergencyContact || "",
  );
  const [emergencyContactPhone, setEmergencyContactPhone] = useState<string>(
    user?.contact?.emergencyPhone || "",
  );

  const formattedDOB = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  useEffect(() => {
    setPhoneNumber(user?.contact?.phone || "");
    setAddress(user?.contact?.address || "");
    setEmergencyContactName(user?.contact?.emergencyContact || "");
    setEmergencyContactPhone(user?.contact?.emergencyPhone || "");
  }, [
    user?.contact?.address,
    user?.contact?.emergencyContact,
    user?.contact?.emergencyPhone,
    user?.contact?.phone,
  ]);

  const formatPhone = (phone: string = "") => {
    return phone.startsWith("+") || !phone.length ? phone : `+${phone}`;
  };

  const handleCancel = () => {
    setPhoneNumber(user?.contact?.phone || "");
    setAddress(user?.contact?.address || "");
    setEmergencyContactName(user?.contact?.emergencyContact || "");
    setEmergencyContactPhone(user?.contact?.emergencyPhone || "");
    setIsEditing(false);
  };

  const handleSave = () => {
    postUpdateProfile({
      phone: formatPhone(phoneNumber),
      address,
      emergencyContact: emergencyContactName,
      emergencyPhone: formatPhone(emergencyContactPhone),
    });
  };

  const personalDetailsForm = [
    {
      label: "First Name",
      value: user?.firstName,
      icon: User,
    },
    {
      label: "Last Name",
      value: user?.lastName,
      icon: User,
    },
    {
      label: "Email Address",
      value: user?.email,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: formatPhone(phoneNumber),
      icon: Phone,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPhoneNumber(e.target.value.replace(/\D/g, "")),
    },
    {
      label: "Date of Birth",
      value: formattedDOB,
      icon: Calendar,
    },
    {
      label: "Position",
      value: user?.position?.name,
      icon: Briefcase,
    },
    {
      label: "Address",
      value: address,
      icon: MapPin,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setAddress(e.target.value),
      fullRow: true,
    },
  ];

  const emergencyContactForm = [
    {
      label: "Contact Name",
      value: emergencyContactName,
      icon: User,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setEmergencyContactName(e.target.value),
    },
    {
      label: "Contact Phone",
      value: formatPhone(emergencyContactPhone),
      icon: Phone,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setEmergencyContactPhone(e.target.value.replace(/\D/g, "")),
    },
  ];

  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-xl font-bold">Personal Information</h2>
          <p className="text-sm text-muted-foreground">
            Update your personal details
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-2xl border border-border hover:bg-muted transition-all font-medium"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-2xl border border-border hover:bg-muted transition-all flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={() => setOpenConfirmation(true)}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all flex items-center gap-2 font-medium shadow-lg shadow-indigo-500/25"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {personalDetailsForm.map((form) => (
          <div
            className={cn([form.fullRow && "md:col-span-2", "space-y-3"])}
            key={form.label}
          >
            <label className="text-sm font-medium">{form.label}</label>
            {isEditing && form.onChange ? (
              <input
                type="text"
                value={form.value}
                onChange={form.onChange}
                className="w-full p-4 rounded-2xl border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-muted/30">
                <form.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{form.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-border/50">
        <h3 className="text-lg font-bold mb-5">Emergency Contact</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {emergencyContactForm.map((form) => (
            <div className="space-y-3" key={form.label}>
              <label className="text-sm font-medium">{form.label}</label>
              {isEditing && form.onChange ? (
                <input
                  type="text"
                  value={form.value}
                  onChange={form.onChange}
                  className="w-full p-4 rounded-2xl border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-muted/30">
                  <form.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{form.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ConfirmationModal
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={handleSave}
        title="Confirm Changes"
        message="Are you sure you want to save these changes to your profile?"
        confirmLabel="Yes, Save Changes"
      />
    </div>
  );
}
