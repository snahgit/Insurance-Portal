import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import { messages } from "../../../../language";
import type { RootState } from "../../../../redux/store";

export function pharmacyClaimSendSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        subject: z.string().min(2, msg.manageClaim.pharmacy.send.subject),
        content: z.string().min(2, msg.manageClaim.pharmacy.send.content),
    });
}
export type PharmacyClaimSendFormType = {
    subject: string;
    content: string;
} & z.infer<typeof pharmacyClaimSendSchema>;