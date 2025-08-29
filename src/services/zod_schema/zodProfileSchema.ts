import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { FlagProps } from "../../component/includes/Header";

import { messages } from "../../language";

export function getProfileSchema(langCode: FlagProps) {
  const msg = messages[langCode.code];

  const phoneSchema = z
    .string()
    .min(1, msg.phone_required)
    .refine(
      (val) => {
        const phoneNumber = parsePhoneNumberFromString(val, "IN");
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      {
        message: msg.phone_required,
      }
    );

  const proifleSchema = z.object({
    snah_id: z.string().min(1, msg.snah_id),
    full_name: z.string().min(1, msg.full_name),
    email: z.string().min(1, msg.email_required).email(msg.email_invalid),
    phone: phoneSchema,
    tel_phone: z.string().min(1, msg.tel_phone),
    establishedDate: z
      .string()
      .min(1, msg.establishedDate_required)
      .refine((val) => !isNaN(Date.parse(val)), {
        message: msg.establishedDate_invalid,
      }),
    ein: z.string().min(1, msg.ein),
    npl: z.string().min(1, msg.npl),
    createdDate: z
      .string()
      .min(1, msg.createdDate_required)
      .refine((val) => !isNaN(Date.parse(val)), {
        message: msg.createdDate_invalid,
      }),
    registrationId: z.string().min(1, msg.registrationId),
    user_name: z.string().min(1, msg.user_name),
    admin_rep_name: z.string().min(1, msg.admin_rep_name),
    admin_rep_title: z.string().min(1, msg.admin_rep_title),
    faxnumber: z.string().min(1, msg.faxnumber),
    tax: z.string().min(1, msg.tax),
    about: z.string().min(1, msg.about),
    address: z.string().min(1, msg.address),
    streetAddress: z.string().min(1, msg.streetAddress),
    city: z.string().min(1, msg.city),
    state: z.string().min(1, msg.state),
    zipcode: z.string().min(1, msg.zipcode),
    county: z.string().min(1, msg.county),
    taxonomy: z.array(z.string()).min(1, "Please select at least one taxonomy"),
    nasic: z.array(z.string()).min(1, "Please select at least one NASIC code"),
  });

  return proifleSchema;
}

// Compose them together for a full form schema as needed
