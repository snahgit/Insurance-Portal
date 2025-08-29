import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { messages } from "../../../language";

export function profileWalletWithdrawSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        bank: z.string().min(2, msg.profile.insuranceCovered.providerId),
        amount: z.number().min(2, msg.profile.insuranceCovered.endYear),
    });
}

export type ProfileWalletWithdrawFormType = {
    bank: string,
    amount: number,
} & z.infer<ReturnType<typeof profileWalletWithdrawSchema>>;