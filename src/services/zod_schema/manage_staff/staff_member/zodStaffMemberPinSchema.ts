import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

export function staffMemberPinSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        newPin: z.string().min(2, msg.staffMember.profilePin.newPin).max(50, msg.staffMember.profilePin.newPin),
        confirmNewPin: z.string().min(2, msg.staffMember.profilePin.confirmNewPin).max(50, msg.staffMember.profilePin.confirmNewPin),
    });
}
export type StaffMemberPinFormType = {
    newPin: string;
    confirmNewPin: string;
} & z.infer<typeof staffMemberPinSchema>;