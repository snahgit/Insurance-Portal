export interface UserDetailsInterface {
  snah_id: string;
  full_name: string;
  email: string;
  phone: string;
  tel_phone: string;
  establishedDate: string;
  ein: string;
  npl: string;
  createdDate: string;
  registrationId: string;
  user_name: string;
  admin_rep_name: string;
  admin_rep_title: string;
  faxnumber: string;
  tax: string;
  taxonomy?: string[] | undefined;
  nasic?: string[] | undefined;
  about: string;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  county: string;
}

export interface LangaugeInterface {
  us: string;
  de: string;
  es: string;
  fr: string;
  pt: string;
  zh: string;
  ar: string;
}

export interface UserLoginProps {
  email: string;
  password: string;
  userrole: number;
  userType: number;
  firebaseToken: string;
  gRecaptchaResponse: string;
}

export interface ViewProfileTabs {
  editMode: boolean;
  profileCompleteStatus: boolean;
}

export interface DateInputProps {
  label: string;
  name: string;
  errorPara: string;
  value: string;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldProps {
  id: number;
  label: string;
  value: string;
  name: string;
  errorPara: string;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
