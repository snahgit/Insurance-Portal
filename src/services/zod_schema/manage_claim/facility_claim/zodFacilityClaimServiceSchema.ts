import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";

export function facilityClaimServiceSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
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
    placeOfService: z.string().min(1, msg.manageClaim.facility.service.placeOfService),
    emg: z.string().min(1, msg.manageClaim.facility.service.emg),
    cptNumber: z.string().min(1, msg.manageClaim.facility.service.cptNumber),
    cptHcpcs: z.string().min(1, msg.manageClaim.facility.service.cptHcpcs),
    modifier: z.string().min(1, msg.manageClaim.facility.service.modifier),
    diagnosisPointer: z.string().min(1, msg.manageClaim.facility.service.diagnosisPointer),
    charges: z.number().min(0, msg.manageClaim.facility.service.charges).default(0),
    daysOrUnits: z.number().min(1, msg.manageClaim.facility.service.daysOrUnits).default(1),
    epsdtFamilyPlan: z.string().min(1, msg.manageClaim.facility.service.epsdtFamilyPlan),
    idQual: z.string().min(1, msg.manageClaim.facility.service.idQual),
    referringProviderId: z.string().min(1, msg.manageClaim.facility.service.referringProviderId),
  });
}

export type FacilityClaimServiceFormType = {
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
} & z.infer<typeof facilityClaimServiceSchema>;