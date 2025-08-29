import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";

const numberFromNumberInput = (label: string) =>
  z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.number()
      .nonnegative(`${label} cannot be negative`)
      .refine((val) => val !== undefined && val !== null, {
        message: `${label} is required`,
      })
  );

export function facilityClaimAddEditSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    claimType: z.string().min(1, msg.manageClaim.facility.claim.claimType),
    appointmentDate: z.coerce.date().refine((val) => val !== undefined && val !== null, {
      message: msg.manageClaim.facility.claim.appointmentDate,
    }),
    appointmentId: z.string().min(1, msg.manageClaim.facility.claim.appointmentId),
    patientInsurance: z.string().default(""),
    currentIllnessDate: z.coerce.date().nullable().default(null),
    currentIllnessQual: z.string().default(""),
    otherDate: z.coerce.date().nullable().default(null),
    otherDateQual: z.string().default(""),
    unableToWork: z.preprocess(
      (val) => {
        if (!val || !Array.isArray(val)) return [null, null];
        return val.map(date => {
          if (!date) return null;
          if (date instanceof Date) return date;
          if (typeof date === 'string') return new Date(date);
          return null;
        });
      },
      z.tuple([z.date().nullable(), z.date().nullable()])
    ),
    hospitalization: z.preprocess(
      (val) => {
        if (!val || !Array.isArray(val)) return [null, null];
        return val.map(date => {
          if (!date) return null;
          if (date instanceof Date) return date;
          if (typeof date === 'string') return new Date(date);
          return null;
        });
      },
      z.tuple([z.date().nullable(), z.date().nullable()])
    ),
    referringProvider: z
      .string()
      .min(2, "Name of referring provider is required"),
    additionalClaimInfo: z.string().default(""),
    outsideLab: z.string().default(""),
    outsideLabCharges: z
      .preprocess(
        (v) => (v === "" || v === null || v === undefined ? undefined : v),
        z.number().nonnegative()
      )
      .optional(),
    diagnosis1: z.string().default(""),
    diagnosis2: z.string().default(""),
    diagnosis3: z.string().default(""),
    icdForCpt: z.string().default(""),
    cpt: z.string().default(""),
    resubmissionCode: z.string().default(""),
    resubmissionOriginalRef: z.string().default(""),
    priorAuthNumber: z.string().default(""),
    services: z.array(z.object({
      dateOfService: z.preprocess(
        (val) => {
          if (!val || !Array.isArray(val)) return [null, null];
          return val.map(date => {
            if (!date) return null;
            if (date instanceof Date) return date;
            if (typeof date === 'string') return new Date(date);
            return null;
          });
        },
        z.tuple([z.date().nullable(), z.date().nullable()])
      ),
      placeOfService: z.string(),
      emg: z.string(),
      cptNumber: z.string(),
      cptHcpcs: z.string(),
      modifier: z.string(),
      diagnosisPointer: z.string(),
      charges: z.number(),
      daysOrUnits: z.number(),
      epsdtFamilyPlan: z.string(),
      idQual: z.string(),
      referringProviderId: z.string()
    })).default([]),
    document: z.array(z.object({
      typeOfFile: z.string(),
      document: z.string()
    })).default([]),
    taxIdNumber: z.string().default(""),
    taxIdSSN: z.string().default(""),
    taxIdEIN: z.string().default(""),
    patientAccountNo: z.string().min(1, "Patient's Account No is required"),
    acceptAssignment: z.enum(["Yes", "No"], {
      message: "Accept Assignment is required",
    }),
    totalCharge: numberFromNumberInput("Total Charge"),
    amountPaid: numberFromNumberInput("Amount Paid"),
    nuccReserved: z.string().default(""),
  });
}

export type FacilityClaimAddEditFormType = {
  claimType: string;
  appointmentDate: Date | null;
  appointmentId: string;
  patientInsurance: string;
  currentIllnessDate: Date | null;
  currentIllnessQual: string;
  otherDate: Date | null;
  otherDateQual: string;
  unableToWork: [Date | null, Date | null];
  hospitalization: [Date | null, Date | null];
  referringProvider: string;
  additionalClaimInfo: string;
  outsideLab: string;
  outsideLabCharges?: number | string;
  diagnosis1: string;
  diagnosis2: string;
  diagnosis3: string;
  icdForCpt: string;
  cpt: string;
  resubmissionCode: string;
  resubmissionOriginalRef: string;
  priorAuthNumber: string;
  services: {
    dateOfService: [Date | null, Date | null];
    placeOfService: string;
    emg: string;
    cptNumber: string;
    cptHcpcs: string;
    modifier: string;
    diagnosisPointer: string;
    charges: number;
    daysOrUnits: number;
    epsdtFamilyPlan: string;
    idQual: string;
    referringProviderId: string;
  }[];
  document: { typeOfFile: string; document: string; }[];
  taxIdNumber: string;
  taxIdSSN: string;
  taxIdEIN: string;
  patientAccountNo: string;
  acceptAssignment: "Yes" | "No";
  totalCharge?: number | string;
  amountPaid?: number | string;
  nuccReserved: string;
} & z.infer<typeof facilityClaimAddEditSchema>;