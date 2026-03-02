import {
  API_EMPLOYEE_PROFILE_PATH,
  API_EMPLOYEE_UPDATE_PHOTO_PATH,
  API_EMPLOYEE_UPDATE_PROFILE_PATH,
  EmployeeProfileResponse,
  UpdateProfilePictureRequest,
  UpdateProfilePictureResponse,
  UpdateProfileRequest,
} from "@/services/employee";
import useAPI from "../core/use-api";

export function useEmployeeProfile(opts?: { onSuccess?: (data: EmployeeProfileResponse) => void }) {
  return useAPI<EmployeeProfileResponse>(API_EMPLOYEE_PROFILE_PATH, { onSuccess: opts?.onSuccess });
}

export function useUpdateEmployeeProfile(opts?: { onSuccess?: (data: EmployeeProfileResponse) => void; onError?: (error: string) => void }) {
  return useAPI<EmployeeProfileResponse, UpdateProfileRequest>(
    API_EMPLOYEE_UPDATE_PROFILE_PATH,
    { method: "POST", onSuccess: opts?.onSuccess, onError: opts?.onError },
  );
}

export function useUpdateProfilePicture(opts?: { onSuccess?: (data: UpdateProfilePictureResponse) => void; onError?: (error: string) => void }) {
  const { fetcher, ...rest} = useAPI<UpdateProfilePictureResponse, FormData>(
    API_EMPLOYEE_UPDATE_PHOTO_PATH,
    { method: "POST", onSuccess: opts?.onSuccess, onError: opts?.onError },
  ); 

  const uploadProfilePicture = async (payload: UpdateProfilePictureRequest) => {
    const formData = new FormData();
    formData.append("file", payload.file);

    await fetcher(formData);
  }

  return { fetcher: uploadProfilePicture, ...rest };
}