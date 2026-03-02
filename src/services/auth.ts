export const API_SIGN_IN_PATH = "/auth/signin";
export const API_SIGN_OUT_PATH = "/auth/signout";

export type SignInRequest = {
  email: string;
  password: string;
}

export type SignInResponse = {
  accessToken: string
};
