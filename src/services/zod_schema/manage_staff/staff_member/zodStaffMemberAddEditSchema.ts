import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

export function staffMemberAddEditSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        firstName: z.string().min(2, msg.staffMember.createUpdate.firstName).max(50, msg.staffMember.createUpdate.firstName),
        lastName: z.string().min(2, msg.staffMember.createUpdate.lastName).max(50, msg.staffMember.createUpdate.lastName),
        email: z.string().email(msg.staffMember.createUpdate.email),
        mobile: z.string().regex(/^\d{10,15}$/, msg.staffMember.createUpdate.mobile),
        dob: z.string().min(2, msg.staffMember.createUpdate.dob).max(50, msg.staffMember.createUpdate.dob),
        joiningDate: z.string().min(2, msg.staffMember.createUpdate.joiningDate).max(50, msg.staffMember.createUpdate.joiningDate),
        pin: z.string().min(2, msg.staffMember.createUpdate.pin).max(50, msg.staffMember.createUpdate.pin),
        gender: z.enum(["male", "female", "other"], msg.staffMember.createUpdate.gender),
        institutionName: z.string().min(2, msg.staffMember.createUpdate.institutionName).max(50, msg.staffMember.createUpdate.institutionName),
        departmentName: z.string().min(2, msg.staffMember.createUpdate.departmentName).max(50, msg.staffMember.createUpdate.departmentName),
        degree: z.string().min(2, msg.staffMember.createUpdate.degree).max(50, msg.staffMember.createUpdate.degree),
        courseDuration: z.tuple([z.string().date(), z.string().date()]).nullable(),
        organizationName: z.string().min(2, msg.staffMember.createUpdate.organizationName).max(50, msg.staffMember.createUpdate.organizationName),
        position: z.string().min(2, msg.staffMember.createUpdate.position).max(50, msg.staffMember.createUpdate.position),
        workExperienceDuration: z.tuple([z.string().date(), z.string().date()]).nullable(),
        country: z.string().min(2, msg.staffMember.createUpdate.country).max(50, msg.staffMember.createUpdate.country),
        city: z.string().min(2, msg.staffMember.createUpdate.city).max(50, msg.staffMember.createUpdate.city),
        state: z.string().min(2, msg.staffMember.createUpdate.state).max(50, msg.staffMember.createUpdate.state),
        pinCode: z.string().regex(/^\d{4,10}$/, msg.staffMember.createUpdate.pinCode),
        about: z.string().min(2, msg.staffMember.createUpdate.about).max(50, msg.staffMember.createUpdate.about),
    });
}
export type StaffMemberAddEditFormType = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    dob: string;
    joiningDate: string;
    pin: string;
    gender: string;
    institutionName: string;
    departmentName: string;
    degree: string;
    courseDuration?: [string, string] | null | undefined;
    organizationName: string;
    position: string;
    workExperienceDuration?: [string, string] | null | undefined;
    country: string;
    city: string;
    state: string;
    pinCode: string;
    about: string;
} & z.infer<typeof staffMemberAddEditSchema>;