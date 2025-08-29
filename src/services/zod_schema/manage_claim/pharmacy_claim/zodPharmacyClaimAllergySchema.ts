import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";

export function pharmacyClaimAllergySchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    dateOfAllergy: z.string().min(1, msg.manageClaim.pharmacy.allergy.dateOfAllergy),
    numberOfVialsAllergy: z.number().min(1, msg.manageClaim.pharmacy.allergy.numberOfVialsAllergy),
    numberOfTreatmentsAllergy: z.number().min(1, msg.manageClaim.pharmacy.allergy.numberOfTreatmentsAllergy),
    daysSupplyAllergy: z.string().min(1, msg.manageClaim.pharmacy.allergy.daysSupplyAllergy),
    vialContainsAllergy: z.string().min(1, msg.manageClaim.pharmacy.allergy.vialContainsAllergy),
    administeredByAllergy: z.string().min(1, msg.manageClaim.pharmacy.allergy.administeredByAllergy),
    directionsAllergy: z.string().min(1, msg.manageClaim.pharmacy.allergy.directionsAllergy).default(""),
    ingredientsAllergy: z.string().min(1, msg.manageClaim.pharmacy.allergy.ingredientsAllergy).default(""),
    chargePerTreatmentAllergy: z.number().min(1, msg.manageClaim.pharmacy.allergy.chargePerTreatmentAllergy),
    chargeForPreparationAllergy: z.number().min(1, msg.manageClaim.pharmacy.allergy.chargeForPreparationAllergy),
    totalChargeAllergy: z.number().min(1, msg.manageClaim.pharmacy.allergy.totalChargeAllergy),
  });
}

export type PharmacyClaimAllergyFormType = {
  dateOfAllergy: string;
  numberOfVialsAllergy: number;
  numberOfTreatmentsAllergy: number;
  daysSupplyAllergy: string;
  vialContainsAllergy: string;
  administeredByAllergy: string;
  directionsAllergy: string;
  ingredientsAllergy: string;
  chargePerTreatmentAllergy: number;
  chargeForPreparationAllergy: number;
  totalChargeAllergy: number;
} & z.infer<typeof pharmacyClaimAllergySchema>;