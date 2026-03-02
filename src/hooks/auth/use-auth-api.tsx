"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAPI from "../core/use-api";
import {
  SignInResponse,
  SignInRequest,
  API_SIGN_IN_PATH,
  API_SIGN_OUT_PATH,
} from "@/services/auth";

export function useSignIn() {
  const { fetcher, isSuccess, ...rest } = useAPI<SignInResponse, SignInRequest>(
    API_SIGN_IN_PATH,
    {
      method: "POST",
    },
  );

  useEffect(() => {
    if (isSuccess) {
      const redirectPath = new URLSearchParams(window.location.search).get(
        "redirect",
      );
      window.location.href = redirectPath || "/";
    }
  }, [isSuccess]);

  return { fetcher, isSuccess, ...rest };
}

export function useSignOut() {
  const { fetcher, isSuccess, isError, error } = useAPI(API_SIGN_OUT_PATH, {
    method: "POST",
  });

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/signin";
    }
  }, [isSuccess]);

  return { fetcher, isSuccess, isError, error };
}
