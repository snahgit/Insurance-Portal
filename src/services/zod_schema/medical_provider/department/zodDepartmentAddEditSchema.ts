import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { messages } from "../../../../language";

export function departmentAddEditSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];
    return z.object({
        name: z.string()
            .min(2, msg.categoryNameMinLength)
            .max(50, msg.categoryNameMaxLength),
        description: z.string()
            .min(10, msg.categoryNameMinLength)
            .max(200, msg.categoryNameMaxLength),
    });
}
export type DepartmentAddEditFormType = {
    name: string;
    description: string;
} & z.infer<typeof departmentAddEditSchema>;