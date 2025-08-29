import { z } from "zod";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../language";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export function zodAppointmentServiceSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];
  return z.object({
    services: z.array(z.object({
      serviceName: z.string().min(1, msg.appointment.service.serviceName),
      serviceFee: z.string().min(1, msg.appointment.service.serviceFee),
    })).min(1, "At least one service is required"),
    totalServiceFee: z.string().min(1, msg.appointment.service.totalServiceFee),
    taxPercentage: z.string().min(1, msg.appointment.service.taxPercentage),
    totalEstimatedCharge: z.string().min(1, msg.appointment.service.totalEstimatedCharge),
    userPay: z.string().min(1, msg.appointment.service.userPay),
    insurancePay: z.string().min(1, msg.appointment.service.insurancePay),
    insuranceCompany: z.string().min(1, msg.appointment.service.insuranceCompany),
  });
}
export type AppointmentServiceFormType = {
  services: Array<{
    serviceName: string;
    serviceFee: string;
  }>;
  totalServiceFee: string;
  taxPercentage: string;
  totalEstimatedCharge: string;
  userPay: string;
  insurancePay: string;
  insuranceCompany: string;
} & z.infer<typeof zodAppointmentServiceSchema>;
