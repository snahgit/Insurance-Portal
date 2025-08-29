import { z } from "zod";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../language";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function getAppointmentPrescriptionSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];
  return z.object({
    pharmacyZip: z.string().min(1, msg.appointment.addPaperPrescription.pharmacyZip),
    pharmacy: z.string().min(1, msg.appointment.addPaperPrescription.pharmacy),
    ncpdp: z.string().min(1, msg.appointment.addPaperPrescription.ncpdp),
    prescriptionType: z.string().min(1, msg.appointment.addPaperPrescription.prescriptionType),
    physicianDea: z.string().min(1, msg.appointment.addPaperPrescription.physicianDea),
    file: z.string().min(1, msg.appointment.addPaperPrescription.file),
    prescriptionNotes: z.string().min(1, msg.appointment.addPaperPrescription.prescriptionNotes),
    additionalNotes: z.string().min(1, msg.appointment.addPaperPrescription.additionalNotes),
    bloodPressureHigh: z.string().min(1, msg.appointment.addPaperPrescription.bloodPressureHigh),
    bloodPressureLow: z.string().min(1, msg.appointment.addPaperPrescription.bloodPressureLow),
    oxygen: z.string().min(1, msg.appointment.addPaperPrescription.oxygen),
    ecg: z.string().min(1, msg.appointment.addPaperPrescription.ecg),
    healthInformation: z.string().min(1, msg.appointment.addPaperPrescription.healthInformation),
    treatment: z.string().min(1, msg.appointment.addPaperPrescription.treatment),
    otherCare: z.string().min(1, msg.appointment.addPaperPrescription.otherCare),
  });
}
export type AppointmentPrescriptionFormType = {
  pharmacyZip: string;
  pharmacy: string;
  ncpdp: string;
  prescriptionType: string;
  physicianDea: string;
  file: string;
  prescriptionNotes: string;
  additionalNotes: string;
  bloodPressureHigh: string;
  bloodPressureLow: string;
  oxygen: string;
  ecg: string;
  healthInformation: string;
  treatment: string;
  otherCare: string;
} & z.infer<typeof getAppointmentPrescriptionSchema>;
