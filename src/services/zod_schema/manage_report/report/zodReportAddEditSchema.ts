import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

export function reportAddEditSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        appointmentId: z.string().min(2, msg.report.appointmentId),
        planName: z.string().min(2, msg.report.planName),
        description: z.string().min(2, msg.report.description),
        // report: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // prescription: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // surgery: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // consultant: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // testResult: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // therapy: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // treatment: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
        // invoice: z.string().min(2, msg.staffMember.profilePin.confirmNewPin),
    });
}
export type ReportAddEditFormType = {
    appointmentId: string;
    planName: string;
    description: string;
    // report: string;
    // prescription: string;
    // surgery: string;
    // consultant: string;
    // testResult: string;
    // therapy: string;
    // treatment: string;
    // invoice: string;
} & z.infer<typeof reportAddEditSchema>;