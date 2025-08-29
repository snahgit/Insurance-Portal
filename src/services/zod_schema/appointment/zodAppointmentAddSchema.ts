import { z } from "zod";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../language";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function getAppointmentAddSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    searchPatient: z.string().min(1, msg.appointment.create.searchPatient),
    patient: z.string().min(1, msg.appointment.create.patient),
    physician: z.string().min(1, msg.appointment.create.physician),
    appointmentType: z.string().min(1, msg.appointment.create.appointmentType),
    appointmentDate: z.string().min(1, msg.appointment.create.appointmentDate),
    medicalIssue: z.string().min(1, msg.appointment.create.medicalIssue),
    appointmentReason: z.string().min(1, msg.appointment.create.appointmentReason),
    symptoms: z.string().min(1, msg.appointment.create.symptoms),
  });
}
export type AppointmentAddFormType = {
  searchPatient: string;
  patient: string;
  physician: string;
  appointmentType: string;
  appointmentDate: string;
  medicalIssue: string;
  appointmentReason: string;
  symptoms: string;
} & z.infer<typeof getAppointmentAddSchema>;
