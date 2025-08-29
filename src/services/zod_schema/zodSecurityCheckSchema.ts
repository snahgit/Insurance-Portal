import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { messages } from "../../language";

export function securityCheckSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];
    return z.object({
        securityPin: z.string().min(2, msg.categoryNameMinLength),
        securityType: z.string().min(2, msg.categoryNameMinLength),
        reason: z.string(),
    }).superRefine((data, ctx) => {
        if (data.securityType === "Other") {
            if (!data.reason || data.reason.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["reason"],
                    message: msg.appointment.outPatient.futureTreatmentDate,
                });
            }
        }
    });
}
export type SecurityCheckSchemaFormType = {
    securityPin: string;
    securityType: string;
    reason: string;
} & z.infer<typeof securityCheckSchema>;