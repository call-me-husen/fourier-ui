export const API_EMPLOYEE_PROFILE_PATH = "/employees/profile";
export const API_EMPLOYEE_UPDATE_PROFILE_PATH = "/employees/profile/update";
export const API_EMPLOYEE_UPDATE_PHOTO_PATH = "/employees/profile/photo";
export const API_EMPLOYEE_CHANGE_PASSWORD_PATH = "/employees/change-password";

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateProfileRequest = {
  phone?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
};

export type UpdateProfilePictureRequest = {
  file: File;
};

export type UpdateProfilePictureResponse = {
  photoUrl: string;
};

export type EmployeeProfileResponse = {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  role: string;
  employmentType: string;
  departmentId: string;
  department: {
    id: string;
    name: string;
    parentId: string | null;
  };
  positionId: string;
  position: {
    id: string;
    name: string;
    level: number;
  };
  gender: string;
  dateOfBirth: string;
  contact: {
    phone: string | null;
    address: string | null;
    emergencyContact: string | null;
    emergencyPhone: string | null;
  };
};
