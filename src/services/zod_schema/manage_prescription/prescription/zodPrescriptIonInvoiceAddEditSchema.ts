import { useSelector } from "react-redux";
import { z } from "zod";
import type { RootState } from "../../../../redux/store";
import type { FlagProps } from "react-world-flags";
import { messages } from "../../../../language";

// const numberFromNumberInput = (label: string) =>
//   z.preprocess(
//     (v) => (v === "" || v === null || v === undefined ? undefined : v),
//     z.number()
//       .nonnegative(`${label} cannot be negative`)
//       .refine((val) => val !== undefined && val !== null, {
//         message: `${label} is required`,
//       })
//   );

export function prescriptIonInvoiceAddEditSchema() {
  const language = useSelector((state: RootState) => {
    const lang = state.language.language;
    return { ...lang, id: String(lang.id) } as FlagProps;
  });
  const code = (language.code ?? "us") as keyof typeof messages;
  const msg = messages[code];

  return z.object({
    claimType: z.string().min(1, msg.managePrescription.prescription.invoice.claimType),
    appointmentId: z.string().min(1, msg.managePrescription.prescription.invoice.appointmentId),
    patientInsurance: z.string().min(1, msg.managePrescription.prescription.invoice.patientInsurance),
    invoiceDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    medicationStartDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    appointmentDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    startDate: z.preprocess(
      (val) => {
        if (!val) return null;
        if (val instanceof Date) return val;
        if (typeof val === 'string') return new Date(val);
        return null;
      },
      z.date().nullable()
    ),
    grandTotal: z.number().min(1, msg.managePrescription.prescription.invoice.grandTotal),
    coPay: z.number().min(1, msg.managePrescription.prescription.invoice.coPay),
    patientPay: z.number().min(1, msg.managePrescription.prescription.invoice.patientPay),
    insurancePay: z.number().min(1, msg.managePrescription.prescription.invoice.insurancePay),
    otherInformation: z.string().min(1, msg.managePrescription.prescription.invoice.otherInformation),
    medicineType: z.string().min(1, msg.managePrescription.prescription.invoice.medicineType),
    frequency: z.string().min(1, msg.managePrescription.prescription.invoice.frequency),
    foodRequirementType: z.string().min(1, msg.managePrescription.prescription.invoice.foodRequirementType),
    durationType: z.string().min(1, msg.managePrescription.prescription.invoice.durationType),
    durationNumber: z.number().min(1, msg.managePrescription.prescription.invoice.durationNumber),
    dosage: z.string().min(1, msg.managePrescription.prescription.invoice.dosage),
    isRefill: z.string().min(1, msg.managePrescription.prescription.invoice.isRefill),
    instructions: z.string().min(1, msg.managePrescription.prescription.invoice.instructions),
    notes: z.string().min(1, msg.managePrescription.prescription.invoice.notes),
    price: z.number().min(1, msg.managePrescription.prescription.invoice.price),
    quantity: z.number().min(1, msg.managePrescription.prescription.invoice.quantity),
    tax: z.number().min(1, msg.managePrescription.prescription.invoice.tax),
    total: z.number().min(1, msg.managePrescription.prescription.invoice.total),
    // prescriptionsFiles: z.array(z.any()).optional(),
    // receiptsFiles: z.array(z.any()).optional(),
    // costSharingFiles: z.array(z.any()).optional(),
  });
}

export type PrescriptIonInvoiceAddEditFormType = {
  claimType: string,
  appointmentDate: Date | null,
  appointmentId: string,
  patientInsurance: string,
  invoiceDate: Date | null,
  medicationStartDate: Date | null,
  grandTotal: number,
  coPay: number,
  patientPay: number,
  insurancePay: number,
  otherInformation: string,
  medicineType: string,
  frequency: string,
  foodRequirementType: string,
  durationType: string,
  durationNumber: number,
  startDate: Date | null,
  dosage: string,
  isRefill: string,

  instructions: string,
notes: string,
price: number,
quantity: number,
tax: number,
total: number,
  // prescriptionsFiles: File[],
  // receiptsFiles: File[],
  // costSharingFiles: File[],
} & z.infer<ReturnType<typeof prescriptIonInvoiceAddEditSchema>>;