import { z } from "zod";
import type { FlagProps } from "../../component/includes/Header";
import { messages } from "../../language";
export function getLoginSchema(langCode: FlagProps) {
  const msg = messages[langCode.code];
  const loginSchema = z.object({
    email: z.string().min(1, msg.email_required).email(msg.email_invalid),
    password: z.string().min(1, msg.phone_required),
  });
  return loginSchema;
}