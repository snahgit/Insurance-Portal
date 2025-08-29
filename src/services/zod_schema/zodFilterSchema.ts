import z from "zod";

export function filterSchema() {
    // const language = useSelector((state: RootState) => {
    //     const lang = state.language.language;
    //     return { ...lang, id: String(lang.id) } as FlagProps;
    // });
    // const code = (language.code ?? "us") as keyof typeof messages;
    // const msg = messages[code];

    return z.object({
        statusFilter: z.string().optional(),
        genderFilter: z.string().optional(),
        scheduleFilter: z.string().optional(),
        transactionFilter: z.string().optional(),
        walletFilter: z.string().optional(),
        textFilter: z.string().optional(),
        propertyFilter: z.string().optional(),
        stateFilter: z.string().optional(),
        dateFilter: z.string().optional(),
        claimFilter: z.string().optional(),
    });
}
export type FilterFormType = {
    statusFilter?: string;
    genderFilter?: string;
    scheduleFilter?: string;
    transactionFilter?: string;
    walletFilter?: string;
    textFilter?: string;
    propertyFilter?: string;
    stateFilter?: string;
    claimFilter?: string;
    dateFilter?: string | null;
} & z.infer<typeof filterSchema>;