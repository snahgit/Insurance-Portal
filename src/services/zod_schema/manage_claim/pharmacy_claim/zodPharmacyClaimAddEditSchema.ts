import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";

export function pharmacyClaimAddEditSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    appointmentDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    appointmentId: z.string().min(1, msg.manageClaim.pharmacy.claim.appointmentId),
    patientInsurance: z.string().min(1, msg.manageClaim.pharmacy.claim.patientInsurance),
    additionalComments: z.string().min(1, msg.manageClaim.pharmacy.claim.additionalComments),
    onSitePharmacy: z.string().min(1, msg.manageClaim.pharmacy.claim.onSitePharmacy),
    pharmacistSignature: z.string().min(1, msg.manageClaim.pharmacy.claim.pharmacistSignature),
    filingReason: z.string().min(1, msg.manageClaim.pharmacy.claim.filingReason),
    otherProvideReason: z.string().min(1, msg.manageClaim.pharmacy.claim.otherProvideReason),
    medicationOutsideUS: z.string().min(1, msg.manageClaim.pharmacy.claim.medicationOutsideUS),
    purchasedOutsideCountry: z.string().min(1, msg.manageClaim.pharmacy.claim.purchasedOutsideCountry),
    purchasedOutsideCurrency: z.string().min(1, msg.manageClaim.pharmacy.claim.purchasedOutsideCurrency),
    anyMedicinesTaken: z.string().min(1, msg.manageClaim.pharmacy.claim.anyMedicinesTaken),
    medicineCoveredByOtherInsurance: z.string().min(1, msg.manageClaim.pharmacy.claim.medicineCoveredByOtherInsurance),
    otherCoverage: z.string().min(1, msg.manageClaim.pharmacy.claim.otherCoverage),
    nameOfInsuranceCompany: z.string().min(1, msg.manageClaim.pharmacy.claim.nameOfInsuranceCompany),
    insuranceId: z.string().min(1, msg.manageClaim.pharmacy.claim.insuranceId),
    memberSignature: z.string().min(1, msg.manageClaim.pharmacy.claim.memberSignature),
    signatureDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    numberOfPrescriptions: z.number().min(1, msg.manageClaim.pharmacy.claim.numberOfPrescriptions),
    prescribingPhysicianNpiNumber: z.string().min(1, msg.manageClaim.pharmacy.claim.prescribingPhysicianNpiNumber),
    prescribingPhysicianPhoneNumber: z.string().min(1, msg.manageClaim.pharmacy.claim.prescribingPhysicianPhoneNumber),
    prescribingPhysicianName: z.string().min(1, msg.manageClaim.pharmacy.claim.prescribingPhysicianName),
    prescribingPhysicianAddress: z.string().min(1, msg.manageClaim.pharmacy.claim.prescribingPhysicianAddress),
    prescribingPhysicianCityStateZip: z.string().min(1, msg.manageClaim.pharmacy.claim.prescribingPhysicianCityStateZip),
    prescribingPhysicianAdditionalComments: z.string().min(1, msg.manageClaim.pharmacy.claim.prescribingPhysicianAdditionalComments),
    invoiceDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    grandTotal: z.number().min(1, msg.manageClaim.pharmacy.claim.grandTotal),
    otherInformation: z.string().min(1, msg.manageClaim.pharmacy.claim.otherInformation),
  });
}

export type PharmacyClaimAddEditFormType = {
  appointmentDate: Date | null;
  appointmentId: string;
  patientInsurance: string;
  additionalComments: string;
  onSitePharmacy: string;
  pharmacistSignature: string;
  filingReason: string;
  otherProvideReason: string;
  medicationOutsideUS: string;
  purchasedOutsideCountry: string;
  purchasedOutsideCurrency: string;
  anyMedicinesTaken: string;
  medicineCoveredByOtherInsurance: string;
  otherCoverage: string;
  nameOfInsuranceCompany: string;
  insuranceId: string;
  memberSignature: string;
  signatureDate: Date | null;
  numberOfPrescriptions: number;
  prescribingPhysicianNpiNumber: string;
  prescribingPhysicianPhoneNumber: string;
  prescribingPhysicianName: string;
  prescribingPhysicianAddress: string;
  prescribingPhysicianCityStateZip: string;
  prescribingPhysicianAdditionalComments: string;
  invoiceDate: Date | null;
  grandTotal: number;
  otherInformation: string;
} & z.infer<typeof pharmacyClaimAddEditSchema>;