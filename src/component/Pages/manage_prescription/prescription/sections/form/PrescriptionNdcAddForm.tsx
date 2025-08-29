import { Box, Card, Grid, Group, Text, ActionIcon } from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { PageSelect, PageTextInput } from "../../../../../common/PageInput";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { prescriptIonNdcAddSchema, type PrescriptIonNdcAddFormType } from "../../../../../../services/zod_schema/manage_prescription/prescription/zodPrescriptIonNdcAddSchema";

type NDCSearchResult = {
    ndcNumber: string;
    name: string;
    dosageForm: string;
    route: string;
    nonProprietaryName: string;
    pharmClass: string;
    consultancyPurpose: string;
    department: string;
};

export const PrescriptionNdcAddForm = (props: { dataPass: any }) => {
    const { handleNDCSelection, existingNDCList = [] } = props.dataPass;
    const [ndcSearchResults, setNdcSearchResults] = useState<NDCSearchResult[]>([]);
    const [selectedNDCInfo, setSelectedNDCInfo] = useState<NDCSearchResult | null>(null);
    const prescriptIonNdcAddObject = prescriptIonNdcAddSchema();

    const form = useFormHelper<PrescriptIonNdcAddFormType>({
        initialValues: {
            ndcNumber: '',
            selectedNDC: '',
        },
        validationSchema: prescriptIonNdcAddObject,
        mode: "controlled",
    });
    const isLoading = false;
    const isNDCAlreadyAdded = (ndcNumber: string) => {
        return existingNDCList.some((ndc: any) => ndc.ndcNumber === ndcNumber);
    };
    const mockNDCData: NDCSearchResult[] = [
        {
            ndcNumber: "0009-0271",
            name: "Depo-Estradiol",
            dosageForm: "INJECTION",
            route: "INTRAMUSCULAR",
            nonProprietaryName: "Estradiol cypionate",
            pharmClass: "Estrogen [EPC],Estrogens [CS]",
            consultancyPurpose: "Women's Health",
            department: "Obstetrics/Gynecology"
        },
        {
            ndcNumber: "0002-3004",
            name: "Prozac",
            dosageForm: "CAPSULE, DELAYED RELEASE",
            route: "ORAL",
            nonProprietaryName: "Fluoxetine hydrochloride",
            pharmClass: "Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]",
            consultancyPurpose: "Mental Health",
            department: "Psychiatry"
        },
        {
            ndcNumber: "0003-2408",
            name: "Acetaminophen",
            dosageForm: "TABLET",
            route: "ORAL",
            nonProprietaryName: "Acetaminophen",
            pharmClass: "Analgesic [EPC] Pain Relief Medication [MoA]",
            consultancyPurpose: "Pain Management",
            department: "Pain Management"
        }
    ];
    const handleSearch = () => {
        const searchTerm = form.values.ndcNumber.toLowerCase();
        const results = mockNDCData.filter(ndc =>
            ndc.ndcNumber.toLowerCase().includes(searchTerm) ||
            ndc.name.toLowerCase().includes(searchTerm)
        );
        setNdcSearchResults(results);
    };
    const handleNDCSelect = (value: string) => {
        form.setFieldValue("selectedNDC", value);
        const selected = ndcSearchResults.find(ndc =>
            `${ndc.ndcNumber} (${ndc.name})` === value
        );

        if (selected && isNDCAlreadyAdded(selected.ndcNumber)) {
            notifications.show({
                title: "Already Added",
                message: `NDC ${selected.ndcNumber} (${selected.name}) is already in your list.`,
                color: "orange",
            });
        }

        setSelectedNDCInfo(selected || null);
    };
    const onSubmitCall = (_data: PrescriptIonNdcAddFormType) => {
        if (selectedNDCInfo && handleNDCSelection) {
            if (isNDCAlreadyAdded(selectedNDCInfo.ndcNumber)) {
                notifications.show({
                    title: "Duplicate NDC",
                    message: `NDC ${selectedNDCInfo.ndcNumber} (${selectedNDCInfo.name}) has already been added to the list.`,
                    color: "red",
                });
                return;
            }
            handleNDCSelection(selectedNDCInfo);
            setTimeout(() => {
                notifications.show({
                    title: "Success!",
                    message: "NDC selected successfully.",
                    color: "green",
                });
                form.reset();
                setNdcSearchResults([]);
                setSelectedNDCInfo(null);
            }, 600);
        }
    };

    return (
        <Box>
            <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
                <Card.Section>
                    <Grid>
                        <Grid.Col span={{ base: 12 }}>
                            <Card withBorder radius="md" className="border-sky-200">
                                <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                                    <Group justify="space-between">
                                        <Group gap="xs">
                                            <IconSearch size={16} color="teal" />
                                            <Text fw={600} size="sm" className="text-sky-800">Search NDC</Text>
                                        </Group>
                                        {existingNDCList.length > 0 && (
                                            <Text size="xs" className="text-sky-600 bg-sky-200 px-2 py-1 rounded">
                                                {existingNDCList.length} NDC{existingNDCList.length > 1 ? 's' : ''} already added
                                            </Text>
                                        )}
                                    </Group>
                                </Card.Section>
                                <Card.Section className="px-3 py-3">
                                    <FormWrapper
                                        form={form}
                                        onSubmit={onSubmitCall}
                                        submitButtonText={selectedNDCInfo && isNDCAlreadyAdded(selectedNDCInfo.ndcNumber) ? "Already Added" : "Add Selected NDC"}
                                        isLoading={isLoading}
                                        submitButtonIcon={<IconPlus size={16} />}
                                    >
                                        <Grid>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                                                <FormField label="Type NDC number" required>
                                                    <PageTextInput
                                                        placeholder="Type NDC number to search"
                                                        {...form.getInputProps("ndcNumber")}
                                                        size="sm"
                                                        rightSection={
                                                            <ActionIcon
                                                                variant="subtle"
                                                                aria-label="Search appointment"
                                                                onClick={handleSearch}
                                                            >
                                                                <IconSearch size={16} />
                                                            </ActionIcon>
                                                        }
                                                    />
                                                </FormField>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6 }}>
                                                <FormField label="Select one NDC" required>
                                                    <PageSelect
                                                        placeholder="Select NDC"
                                                        data={ndcSearchResults.map(ndc => {
                                                            const isAlreadyAdded = isNDCAlreadyAdded(ndc.ndcNumber);
                                                            return {
                                                                value: `${ndc.ndcNumber} (${ndc.name})`,
                                                                label: `${ndc.ndcNumber} (${ndc.name})${isAlreadyAdded ? ' - Already Added' : ''}`,
                                                                disabled: isAlreadyAdded
                                                            };
                                                        })}
                                                        {...form.getInputProps("selectedNDC")}
                                                        onChange={handleNDCSelect}
                                                        size="sm"
                                                        searchable
                                                        disabled={ndcSearchResults.length === 0}
                                                    />
                                                </FormField>
                                            </Grid.Col>

                                            {selectedNDCInfo && (
                                                <Grid.Col span={12}>
                                                    <Box className={isNDCAlreadyAdded(selectedNDCInfo.ndcNumber) ? "bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-700" : "bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-md"}>
                                                        <Group justify="space-between" className="mb-2">
                                                            <Text fw={600} size="sm" className={isNDCAlreadyAdded(selectedNDCInfo.ndcNumber) ? "text-red-800 dark:text-red-200" : "text-cyan-800 dark:text-cyan-200"}>
                                                                SELECTED NDC INFO:-
                                                            </Text>
                                                            {isNDCAlreadyAdded(selectedNDCInfo.ndcNumber) && (
                                                                <Text fw={600} size="xs" className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                                                                    Already Added
                                                                </Text>
                                                            )}
                                                        </Group>
                                                        <Grid>
                                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                                <Box>
                                                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Name</Text>
                                                                    <Text size="xs" className="text-gray-700 dark:text-gray-300">{selectedNDCInfo.name}</Text>
                                                                </Box>
                                                            </Grid.Col>
                                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                                <Box>
                                                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Dosage Form</Text>
                                                                    <Text size="xs" className="text-gray-700 dark:text-gray-300">{selectedNDCInfo.dosageForm}</Text>
                                                                </Box>
                                                            </Grid.Col>
                                                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                                                <Box>
                                                                    <Text fw={600} size="xs" className="text-gray-600 dark:text-gray-400">Route</Text>
                                                                    <Text size="xs" className="text-gray-700 dark:text-gray-300">{selectedNDCInfo.route}</Text>
                                                                </Box>
                                                            </Grid.Col>
                                                        </Grid>
                                                    </Box>
                                                </Grid.Col>
                                            )}
                                        </Grid>
                                    </FormWrapper>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Card.Section>
            </Card>
        </Box>
    );
};
