import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { messages } from "../../../../language";

export function helpSupportAddEditSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];
    return z.object({
        title: z.string()
            .min(2, msg.categoryNameMinLength)
            .max(50, msg.categoryNameMaxLength),
        description: z.string()
            .min(2, msg.categoryNameMinLength)
            .max(200, msg.categoryNameMaxLength),
        category: z.string()
            .min(2, msg.categoryNameMinLength)
            .max(200, msg.categoryNameMaxLength),
        priority: z.string()
            .min(2, msg.categoryNameMinLength)
            .max(200, msg.categoryNameMaxLength),
        message: z.string()
            .min(2, msg.categoryNameMinLength)
            .max(200, msg.categoryNameMaxLength),
    });
}
export type HelpSupportAddEditFormType = {
    title: string;
    description: string;
    category: string;
    priority: string;
    message: string;
} & z.infer<typeof helpSupportAddEditSchema>;