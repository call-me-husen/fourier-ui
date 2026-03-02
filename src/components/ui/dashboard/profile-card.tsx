"use client";

import { useUser } from "@/hooks/user/use-user";
import { User, Camera, Shield, Briefcase, Building2, Loader2, X, UploadCloud } from "lucide-react";
import Image from "next/image";
import { Modal } from "../common/modal";
import { useState, useRef, useCallback } from "react";
import UploadFileModal from "./profile-picture-modal";


export default function ProfileCard() {
  const { isLoading: isUserLoading, data: user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    firstName,
    lastName,
    email,
    role,
    employeeNumber,
    department,
    photoUrl,
  } = user || {};

  return (
    <div
      className={
        "bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-8 shadow-2xl"
      }
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="h-36 w-36 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 overflow-hidden">
            {isUserLoading || !photoUrl ? (
              <User className="h-20 w-20 text-white" />
            ) : (
              <Image
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                width={144}
                height={144}
                className="h-36 w-36 object-cover"
              />
            )}
          </div>
          <button
            className="absolute bottom-0 right-0 p-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <h2 className={"text-2xl font-bold"}>
          {firstName} {lastName}
        </h2>
        <p className="text-muted-foreground mt-1">{email}</p>
        <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/20">
          <Shield className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-500">
            {role === "admin" ? "Administrator" : "Employee"}
          </span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30">
          <div className="p-2 rounded-xl bg-blue-500/10">
            <Briefcase className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Employee ID</p>
            <p className="font-medium">{employeeNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30">
          <div className="p-2 rounded-xl bg-emerald-500/10">
            <Building2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Department</p>
            <p className="font-medium">{department?.name}</p>
          </div>
        </div>
      </div>

      <UploadFileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPhotoUrl={photoUrl}
        onSuccess={() => {
          // 
        }}
      />
    </div>
  );
}

