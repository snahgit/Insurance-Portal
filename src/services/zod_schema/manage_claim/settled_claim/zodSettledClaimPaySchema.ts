import { z } from "zod";
import type { FlagProps } from "react-world-flags";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { messages } from "../../../../language";

export function settledClaimPaySchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];
  return z.object({
    bankAccount: z.string().min(1, msg.manageClaim.settled.payClaim.bankAccount),
    payingAmount: z.number().min(0, msg.manageClaim.settled.payClaim.payingAmount),
  });
}
export type SettledClaimPayFormType = {
  bankAccount: string;
  payingAmount: number;
} & z.infer<typeof settledClaimPaySchema>;
