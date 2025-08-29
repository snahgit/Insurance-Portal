import { z } from "zod";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../language";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function zodAppointmentNdcSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];
  return z.object({
    prescriptionReason: z.string().min(1, msg.appointment.service.totalServiceFee),
    ndcNumber: z.string().min(1, msg.appointment.service.totalServiceFee),
    ndc: z.string().min(1, msg.appointment.service.totalServiceFee),
  });
}
export type AppointmentNdcFormType = {
  prescriptionReason: string;
  ndcNumber: string;
  ndc: string;
} & z.infer<typeof zodAppointmentNdcSchema>;
