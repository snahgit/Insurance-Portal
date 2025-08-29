import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import { messages } from "../../../../language";
import type { RootState } from "../../../../redux/store";

export function patientSendReportSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        email: z.string().min(2, msg.staffMember.profilePin.newPin).max(50, msg.staffMember.profilePin.newPin),
        subject: z.string().min(2, msg.staffMember.profilePin.newPin).max(50, msg.staffMember.profilePin.newPin),
        content: z.string().min(2, msg.staffMember.profilePin.confirmNewPin).max(50, msg.staffMember.profilePin.confirmNewPin),
    });
}
export type PatientSendReportFormType = {
    email: string;
    subject: string;
    content: string;
} & z.infer<typeof patientSendReportSchema>;