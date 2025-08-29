import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";

export function facilityClaimDocumentSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    typeOfFile: z.string().min(1, msg.manageClaim.facility.document.typeOfFile),
    document: z.string().min(1, msg.manageClaim.facility.document.document),
  });
}

export type FacilityClaimDocumentFormType = {
  typeOfFile: string;
  document: string;
} & z.infer<typeof facilityClaimDocumentSchema>;