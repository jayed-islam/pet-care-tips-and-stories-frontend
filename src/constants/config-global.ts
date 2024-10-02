import { paths } from "../layouts/paths";

export const emailRegex = /^[\w-.]+@([\w-]+.)+[\w]{2,4}$/i;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const WEBSITE_LOGIN_PATH = paths.root;

export const bdMobileRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
