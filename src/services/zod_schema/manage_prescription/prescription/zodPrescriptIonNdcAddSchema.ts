import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";


export function prescriptIonNdcAddSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    ndcNumber: z.string().min(1, msg.managePrescription.prescription.ndcAdd.ndcNumber),
    selectedNDC: z.string().min(2, msg.managePrescription.prescription.ndcAdd.ndcNumber),
  });
}

export type PrescriptIonNdcAddFormType = {
  ndcNumber: string,
  selectedNDC: string,
} & z.infer<ReturnType<typeof prescriptIonNdcAddSchema>>;