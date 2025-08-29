import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { messages } from "../../../language";

export function profileKycDocumentSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        documentType: z.string().min(2, msg.profile.kycDocument.documentType),
        documentNumber: z.string().min(2, msg.profile.kycDocument.documentNumber),
        document: z.string().min(2, msg.profile.kycDocument.document),
    });
}

export type ProfileKycDocumentFormType = {
    documentType: string,
    documentNumber: string,
    document: string,
} & z.infer<ReturnType<typeof profileKycDocumentSchema>>;