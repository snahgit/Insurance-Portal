import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

export function memberAddFundSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        firstName: z.string().min(2, msg.manageMember.member.firstName),
        lastName: z.string().min(2, msg.manageMember.member.lastName),
        personName: z.string().min(2, msg.manageMember.member.personName),
        authorizedBy: z.string().min(2, msg.manageMember.member.authorizedBy),
        dateTime: z.string().min(2, msg.manageMember.member.dateTime),
        amount: z.string().min(2, msg.manageMember.member.amount),
        bankAccount: z.string().min(2, msg.manageMember.member.bankAccount),
    });
}
export type MemberAddFundFormType = {
    firstName: string;
    lastName: string;
    personName: string;
    authorizedBy: string;
    dateTime: string;
    amount: string;
    bankAccount: string;
} & z.infer<typeof memberAddFundSchema>;