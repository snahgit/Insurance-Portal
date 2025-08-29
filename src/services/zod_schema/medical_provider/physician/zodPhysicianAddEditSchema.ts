import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { messages } from "../../../../language";


const educationEntrySchema = (msg: any) => z.object({
    institutionName: z.string().min(2, msg.staffMember.createUpdate.institutionName).max(100, msg.medicalProvider.physician.institutionName),
    boardCertifications: z.string().min(2, msg.medicalProvider.physician.boardCertifications).max(100, msg.medicalProvider.physician.boardCertifications),
    degree: z.string().min(2, msg.medicalProvider.physician.degree).max(100, msg.medicalProvider.physician.degree),
    courseDuration: z.tuple([
        z.date({ message: "Start date is required" }),
        z.date({ message: "End date is required" })
    ]).refine(([start, end]) => start < end, {
        message: "End date must be after start date",
    }),
});
const experienceEntrySchema = (msg: any) => z.object({
    organizationName: z.string().min(2, msg.staffMember.createUpdate.organizationName).max(100, msg.staffMember.createUpdate.organizationName),
    departmentName: z.string().min(2, msg.medicalProvider.physician.departmentName).max(100, msg.medicalProvider.physician.departmentName),
    position: z.string().min(2, msg.medicalProvider.physician.position).max(100, msg.medicalProvider.physician.position),
    workExperienceDuration: z.tuple([
        z.date({ message: "Start date is required" }),
        z.date({ message: "End date is required" })
    ]).refine(([start, end]) => start < end, {
        message: "End date must be after start date",
    }),
});

export function physicianAddEditSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        firstName: z.string().min(2, msg.medicalProvider.physician.firstName).max(50, msg.medicalProvider.physician.firstName),
        lastName: z.string().min(2, msg.medicalProvider.physician.lastName).max(50, msg.medicalProvider.physician.lastName),
        email: z.string().email(msg.medicalProvider.physician.email),
        phone: z.string().regex(/^\d{10,15}$/, msg.medicalProvider.physician.phone),
        licenseNumber: z.string().min(2, msg.medicalProvider.physician.licenseNumber).max(50, msg.medicalProvider.physician.licenseNumber),
        position: z.string().min(2, msg.medicalProvider.physician.position).max(50, msg.medicalProvider.physician.position),
        npiNumber: z.string().min(2, msg.medicalProvider.physician.npiNumber).max(50, msg.medicalProvider.physician.npiNumber),
        specialty: z.string().min(1, msg.medicalProvider.physician.specialty).max(100, msg.medicalProvider.physician.specialty),
        department: z.string().min(1, msg.medicalProvider.physician.department).max(100, msg.medicalProvider.physician.department),
        experience: z.string().min(1, msg.medicalProvider.physician.experience).max(100, msg.medicalProvider.physician.experience),
        dob: z.string().min(2, msg.medicalProvider.physician.dob).max(50, msg.medicalProvider.physician.dob),
        language: z.string().min(1, msg.medicalProvider.physician.language).max(50, msg.medicalProvider.physician.language),
        insurance: z.string().min(1, msg.medicalProvider.physician.insurance).max(50, msg.medicalProvider.physician.insurance),
        about: z.string().min(10, msg.medicalProvider.physician.about).max(500, msg.medicalProvider.physician.about),
        country: z.string().min(2, msg.medicalProvider.physician.country).max(50, msg.medicalProvider.physician.country),
        street: z.string().min(2, msg.medicalProvider.physician.street).max(100, msg.medicalProvider.physician.street),
        city: z.string().min(2, msg.medicalProvider.physician.city).max(50, msg.medicalProvider.physician.city),
        state: z.string().min(2, msg.medicalProvider.physician.state).max(50, msg.medicalProvider.physician.state),
        postalCode: z.string().min(2, msg.medicalProvider.physician.postalCode).max(20, msg.medicalProvider.physician.postalCode),
        educationDetails: z.array(educationEntrySchema(msg)),
        experienceDetails: z.array(experienceEntrySchema(msg)),
    });
}

export type EducationEntry = {
    institutionName: string;
    boardCertifications: string;
    degree: string;
    courseDuration: [Date, Date];
};

export type ExperienceEntry = {
    organizationName: string;
    departmentName: string;
    position: string;
    workExperienceDuration: [Date, Date];
};

export type PhysicianAddEditFormType = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    licenseNumber: string,
    position: string,
    npiNumber: string,
    specialty: string,
    department: string,
    experience: string,
    dob: string,
    language: string,
    insurance: string,
    about: string,
    country: string,
    street: string,
    city: string,
    state: string,
    postalCode: string,
    educationDetails: EducationEntry[],
    experienceDetails: ExperienceEntry[],
} & z.infer<ReturnType<typeof physicianAddEditSchema>>;