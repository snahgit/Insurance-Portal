// profileSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { serviceAxiosInstance } from "../../services/axiosServices";

const profileInCompleteData = (
  data: string,
  datafield: string,
  datamsg: string
) => {
  return {
    profileCompleted: false,
    profiledata: {
      for: data,
      field: datafield,
      IconMassage: datamsg,
    },
  };
};

export const getUserPersonalInfo = createAsyncThunk(
  "profile/fetchPersonalInfoStatus",
  async (id, thunkAPI) => {
    // ...fetch and return {isComplete: boolean}

    try {
      const res = await serviceAxiosInstance.get(
        `privatepractice/medicalFacility/${id}`
      );

      const { data } = res;

      if (data.addressinfo.city == null) {
        return profileInCompleteData(
          "Basic Information",
          "city",
          'Inside "basic information" tab in the "address information" section the "city" is need to fill'
        );
      } else if (data.addressinfo.address == null) {
        return profileInCompleteData(
          "Basic Information",
          "address",
          'Inside "basic information" tab in the "address information" section the "street" is need to fill'
        );
      } else if (data.addressinfo.state == null) {
        return profileInCompleteData(
          "Basic Information",
          "state",
          'Inside "basic information" tab in the "address information" section the "state" is need to fill'
        );
      } else if (data.addressinfo.country == null) {
        return profileInCompleteData(
          "Basic Information",
          "country",
          'Inside "basic information" tab in the "address information" section the "country" is need to fill'
        );
      } else if (data.addressinfo.postalCode == null) {
        return profileInCompleteData(
          "Basic Information",
          "postalCode",
          'Inside "basic information" tab in the "address information" section the "postal code" is need to fill'
        );
      } else if (data.NAICScode == undefined || data.NAICScode.length <= 0) {
        return profileInCompleteData(
          "Basic Information",
          "NAICScode",
          'Inside "basic information" tab in the "basic information" section the "NAICS code" is need to fill'
        );
      } else if (
        data.taxonomyCode == undefined ||
        data.taxonomyCode.length <= 0
      ) {
        return profileInCompleteData(
          "Basic Information",
          "taxonomyCode",
          'Inside "basic information" tab in the "basic information" section the "taxonomy code" is need to fill'
        );
      } else if (data.telePhone === "") {
        return profileInCompleteData(
          "Basic Information",
          "telePhone",
          'Inside "basic information" tab in the "basic information" section the "tele phone" is need to fill'
        );
      } else if (
        data.administratorTitle == undefined ||
        data.administratorTitle === ""
      ) {
        return profileInCompleteData(
          "Basic Information",
          "administratorTitle",
          'Inside "basic information" tab in the "basic information" section the "administrator title" is need to fill'
        );
      } else if (
        data.administratorName == undefined ||
        data.administratorName === ""
      ) {
        return profileInCompleteData(
          "Basic Information",
          "administratorName",
          'Inside "basic information" tab in the "basic information" section the "administrator name" is need to fill'
        );
      } else if (data.EIN == undefined || data.EIN === "") {
        return profileInCompleteData(
          "Basic Information",
          "EIN",
          'Inside "basic information" tab in the "basic information" section the "EIN" is need to fill'
        );
      } else if (data.NPI == undefined || data.NPI === "") {
        return profileInCompleteData(
          "Basic Information",
          "NPI",
          'Inside "basic information" tab in the "basic information" section the "NPI" is need to fill'
        );
      } else if (data.faxNumber == undefined || data.faxNumber === "") {
        return profileInCompleteData(
          "Basic Information",
          "faxNumber",
          'Inside "basic information" tab in the "basic information" section the "fax number" is need to fill'
        );
      } else if (
        data.establishedDate == undefined ||
        data.establishedDate === ""
      ) {
        return profileInCompleteData(
          "Basic Information",
          "establishedDate",
          'Inside "basic information" tab in the "basic information" section the "established date" is need to fill'
        );
      } else if (data.tc == undefined || data.tc === "") {
        return profileInCompleteData(
          "Basic Information",
          "tc",
          'Inside "basic information" tab in the "acceptance information" section the "tc" is need to fill'
        );
      } else {
        return {
          profileCompleted: true,
          profiledata: data,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsersCertifications = createAsyncThunk(
  "profile/getusercertificate",
  async (_, thunkAPI) => {
    // ...fetch and return {isComplete: boolean}

    try {
      const res = await serviceAxiosInstance.get(
        "auth/getAllTypeMpcertificationData"
      );
      const { data } = res;

      if (data.certificationDocuments == undefined) {
        return profileInCompleteData(
          "Certification",
          "certificationData",
          'Inside "certification" tab you need to add atlist one "certification info"'
        );
      } else {
        return {
          profileCompleted: true,
          profiledata: data,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserInsurance = createAsyncThunk(
  "profile/getuserinsurance",
  async (_, thunkAPI) => {
    try {
      const res = await serviceAxiosInstance.get("auth/getMpActiveinNetwork");
      const { data } = res;

      if (data.data.length <= 0) {
        return profileInCompleteData(
          "Insurance Covered",
          "insuranceCoveredData",
          'Inside "insurance covered" tab you need to add atlist one "insurance info"'
        );
      } else {
        return {
          profileCompleted: true,
          profiledata: data,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserKYCDocuments = createAsyncThunk(
  "profile/getuserkycdocuments",
  async (_, thunkAPI) => {
    // ...fetch and return {isComplete: boolean}

    try {
      const res = await serviceAxiosInstance.get(
        "privatepractice/getAllTypeMpDocuments"
      );
      const { data } = res;
      if (data.kycDocuments == undefined || data.status == "rejected") {
        return profileInCompleteData(
          "Uploaded Kyc",
          "kycDocumentData",
          'Inside "insurance covered" tab you need to add atlist one "insurance info"'
        );
      } else {
        return {
          profileCompleted: true,
          profiledata: data,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserBankDetails = createAsyncThunk(
  "profile/getuserbankdetails",
  async (_, thunkAPI) => {
    try {
      const res = await serviceAxiosInstance.get("auth/getBankDetails");
      const { data } = res;

      if (data.data.length <= 0) {
        return profileInCompleteData(
          "Account Linked",
          "accountLinkedData",
          'Inside "account linked" tab you need to add atlist one "account info" and make it as "default"'
        );
      } else {
        return {
          profileCompleted: true,
          profiledata: data,
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Optional: Orchestrator for all APIs in parallel/series
export const fetchAllProfileStatuses = createAsyncThunk(
  "profile/fetchAllProfileStatuses",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any; // adjust type accordingly
      const userId = state.authentication.data.user._id;
      const [personal, certificate, insurance, kycdocuments, bankdetails] =
        await Promise.all([
          thunkAPI.dispatch(getUserPersonalInfo(userId)).unwrap(),
          thunkAPI.dispatch(getUsersCertifications()).unwrap(),
          thunkAPI.dispatch(getUserInsurance()).unwrap(),
          thunkAPI.dispatch(getUserKYCDocuments()).unwrap(),
          thunkAPI.dispatch(getUserBankDetails()).unwrap(),
        ]);
      if (personal.profileCompleted != true) return personal;
      if (certificate.profileCompleted != true) return certificate;
      if (insurance.profileCompleted != true) return insurance;
      if (kycdocuments.profileCompleted != true) return kycdocuments;
      if (bankdetails.profileCompleted != true) return bankdetails;

      return {
        profileCompleted: true,
        profiledata: {
          personal: personal.profiledata,
          certificate: personal.profiledata,
          insurance: personal.profiledata,
          kycdocuments: personal.profiledata,
          bankdetails: personal.profiledata,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// === Initial State === //

interface CheckProfileProps {
  allCompleted: boolean;
  allProfileData: any;
  loading: boolean;
  error: string | null;
}

const initialState: CheckProfileProps = {
  allCompleted: false,
  allProfileData: {},
  loading: false,
  error: null,
};

// === Slice === //
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProfileStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllProfileStatuses.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.allCompleted = action.payload.profileCompleted;
          state.allProfileData = action.payload.profiledata;
          state.error = null;
        }
      )
      .addCase(fetchAllProfileStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export default profileSlice.reducer;
