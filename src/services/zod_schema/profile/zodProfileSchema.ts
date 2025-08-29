import type { FlagProps } from "react-world-flags";
import z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { messages } from "../../../language";

export function profileSchema() {
    const language = useSelector((state: RootState) => {
        const lang = state.language.language;
        return { ...lang, id: String(lang.id) } as FlagProps;
    });
    const code = (language.code ?? "us") as keyof typeof messages;
    const msg = messages[code];

    return z.object({
        name: z.string().min(2, msg.profile.profile.name),
        registrationId: z.string().min(2, msg.profile.profile.registrationId),
        phone: z.string().min(2, msg.profile.profile.phone),
        telPhone: z.string().min(2, msg.profile.profile.telPhone),
        createUserName: z.string().min(2, msg.profile.profile.createUserName),
        adminRepFullName: z.string().min(2, msg.profile.profile.adminRepFullName),
        adminRepTitle: z.string().min(2, msg.profile.profile.adminRepTitle),
        faxNumber: z.string().min(2, msg.profile.profile.faxNumber),
        tax: z.string().min(2, msg.profile.profile.tax),
        npi: z.string().min(2, msg.profile.profile.npi),
        ein: z.string().min(2, msg.profile.profile.ein),
        establishedDate: z.string().min(2, msg.profile.profile.establishedDate),
        taxonomy: z.array(z.string()).min(1, msg.profile.profile.taxonomy),
        naicsCode: z.array(z.string()).min(1, msg.profile.profile.naicsCode),
        about: z.string().min(2, msg.profile.profile.about),
        address: z.string().min(2, msg.profile.profile.address),
        streetAddress: z.string().min(2, msg.profile.profile.streetAddress),
        city: z.string().min(2, msg.profile.profile.city),
        state: z.string().min(2, msg.profile.profile.state),
        zipCode: z.string().min(2, msg.profile.profile.zipCode),
        country: z.string().min(2, msg.profile.profile.country),
    });
}

export type ProfileFormType = {
    name: string,
    registrationId: string,
    phone: string,
    telPhone: string,
    createUserName: string,
    adminRepFullName: string,
    adminRepTitle: string,
    faxNumber: string,
    tax: string,
    npi: string,
    ein: string,
    establishedDate: string,
    taxonomy: string[],
    naicsCode: string[],
    about: string,
    address: string,
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
} & z.infer<ReturnType<typeof profileSchema>>;