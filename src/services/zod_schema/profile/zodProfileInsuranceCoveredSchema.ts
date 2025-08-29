import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { messages } from "../../../language";

export function profileInsuranceCoveredSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        startDate: z.string()
            .min(1, "Date is required")
            .refine((dateStr) => {
                if (!dateStr || dateStr.trim() === "") return false;
                const date = new Date(dateStr);
                return !isNaN(date.getTime());
            }, {
                message: "Please enter a valid date"
            }).refine((dateStr) => {
                const date = new Date(dateStr);
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                return date <= today;
            }, {
                message: "Certification date cannot be in the future"
            }).refine((dateStr) => {
                const date = new Date(dateStr);
                const minDate = new Date('1900-01-01');
                return date >= minDate;
            }, {
                message: "Please enter a valid certification date"
            }).refine((dateStr) => {
                const date = new Date(dateStr);
                const fiveYearsAgo = new Date();
                fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 50);
                return date >= fiveYearsAgo;
            }, {
                message: "Certification date seems too old. Please verify the date."
            }),
        selectInsurance: z.string().min(2, msg.profile.insuranceCovered.selectInsurance),
        providerId: z.string().min(2, msg.profile.insuranceCovered.providerId),
        endYear: z.number().min(2, msg.profile.insuranceCovered.endYear),
    });
}

export type ProfileInsuranceCoveredFormType = {
    selectInsurance: string,
    startDate: string,
    providerId: string,
    endYear: number,
} & z.infer<ReturnType<typeof profileInsuranceCoveredSchema>>;