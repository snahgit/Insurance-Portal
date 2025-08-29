import { z } from "zod";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../language";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function getOutPatientFormSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];
  return z.object({
    firstName: z.string().min(1, msg.appointment.outPatient.firstName),
    lastName: z.string().min(1, msg.appointment.outPatient.lastName),
    dateAdmitted: z.string().min(1, msg.appointment.outPatient.dateAdmitted),
    reasonForAppointment: z.string().min(1, msg.appointment.outPatient.reasonForAppointment),
    diagnosis: z.string().min(1, msg.appointment.outPatient.diagnosis),
    treatmentTaken: z.string().min(1, msg.appointment.outPatient.treatmentTaken),
    timeOfTreatment: z.string().min(1, msg.appointment.outPatient.timeOfTreatment),
    wasTreatmentRequestedByPhysician: z.string().min(1, msg.appointment.outPatient.wasTreatmentRequestedByPhysician),
    treatmentNotes: z.string().min(1, msg.appointment.outPatient.treatmentNotes),
    isFutureTreatmentNeeded: z.string().min(1, msg.appointment.outPatient.isFutureTreatmentNeeded),
    futureTreatmentDate: z.string(),
    futureTreatmentNote: z.string(),
    patientPrescribedMedication: z.string().min(1, msg.appointment.outPatient.patientPrescribedMedication),
    attendingMedicalProvider: z.string().min(1, msg.appointment.outPatient.attendingMedicalProvider),
  }).superRefine((data, ctx) => {
    if (data.isFutureTreatmentNeeded === "Yes") {
      if (!data.futureTreatmentDate || data.futureTreatmentDate.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["futureTreatmentDate"],
          message: msg.appointment.outPatient.futureTreatmentDate,
        });
      }
      if (!data.futureTreatmentNote || data.futureTreatmentNote.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["futureTreatmentNote"],
          message: msg.appointment.outPatient.futureTreatmentNote,
        });
      }
    }
  });
}
export type CreateOutPatientFormValues = {
  firstName: string;
  lastName: string;
  dateAdmitted: string;
  reasonForAppointment: string;
  diagnosis: string;
  treatmentTaken: string;
  timeOfTreatment: string;
  wasTreatmentRequestedByPhysician: string;
  treatmentNotes: string;
  isFutureTreatmentNeeded: string;
  futureTreatmentDate: string;
  futureTreatmentNote: string;
  patientPrescribedMedication: string;
  attendingMedicalProvider: string;
} & z.infer<typeof getOutPatientFormSchema>;
