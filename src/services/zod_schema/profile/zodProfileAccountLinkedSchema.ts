import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { messages } from "../../../language";

export function profileAccountLinkedSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        accountHolderName: z.string().min(2, msg.profile.accountLinked.accountHolderName),
        accountNumber: z.string().min(2, msg.profile.accountLinked.accountNumber),
        bankName: z.string().min(2, msg.profile.accountLinked.bankName),
        branchName: z.string().min(2, msg.profile.accountLinked.branchName),
        routingNumber: z.string().min(2, msg.profile.accountLinked.routingNumber),
        accountType: z.string().min(2, msg.profile.accountLinked.accountType),
        accountOwnership: z.string().min(2, msg.profile.accountLinked.accountOwnership),
        street: z.string().min(2, msg.profile.accountLinked.street),
        city: z.string().min(2, msg.profile.accountLinked.city),
        state: z.string().min(2, msg.profile.accountLinked.state),
        zipCode: z.string().min(2, msg.profile.accountLinked.zipCode),
    });
}

export type ProfileAccountLinkedFormType = {
    accountHolderName: string,
    accountNumber: string,
    bankName: string,
    branchName: string,
    routingNumber: string,
    accountType: string,
    accountOwnership: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
} & z.infer<ReturnType<typeof profileAccountLinkedSchema>>;