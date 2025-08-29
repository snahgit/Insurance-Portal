import { Fragment, useState } from "react";
import { Card, Grid, Group, Text, Badge, ActionIcon, Paper, Divider, Box, Button } from "@mantine/core";
import { IconCalculator, IconPlus, IconTrash, IconMedicalCross, IconSearch, IconBrandBooking } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { FormField } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { zodAppointmentNdcSchema, type AppointmentNdcFormType } from "../../../../../../services/zod_schema/appointment/zodAppointmentNdcSchema";
import { PageSelect, PageTextInput } from "../../../../../common/PageInput";

interface AppointmentNdcFormProps {
  receivedNdcList: any;
  handleNdcCallback?: (ndcData: any) => void;
}

export const AppointmentNdcForm = (props: { dataPass: AppointmentNdcFormProps }) => {
  const { handleNdcCallback, receivedNdcList } = props.dataPass;
  const appointmentNdcSchema = zodAppointmentNdcSchema();
  const [ndcList, __setNdcList] = useState<any>([
    {
      "_id": "65ceffb533db4e902e681827",
      "ndc": "0002-1407",
      "name": "Quinidine Gluconate",
      "nonProprietaryName": "Quinidine Gluconate",
      "dosageForm": "SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Antiarrhythmic [EPC],Cytochrome P450 2D6 Inhibitor [EPC],Cytochrome P450 2D6 Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68182d",
      "ndc": "0002-3004",
      "name": "Prozac",
      "nonProprietaryName": "Fluoxetine hydrochloride",
      "dosageForm": "CAPSULE, DELAYED RELEASE",
      "route": "ORAL",
      "pharmClass": "Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68182e",
      "ndc": "0002-3227",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68182f",
      "ndc": "0002-3228",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681830",
      "ndc": "0002-3229",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681831",
      "ndc": "0002-3230",
      "name": "Symbyax",
      "nonProprietaryName": "Olanzapine and Fluoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC],Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681832",
      "ndc": "0002-3231",
      "name": "Symbyax",
      "nonProprietaryName": "Olanzapine and Fluoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC],Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681833",
      "ndc": "0002-3232",
      "name": "Symbyax",
      "nonProprietaryName": "Olanzapine and Fluoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC],Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681834",
      "ndc": "0002-3233",
      "name": "Symbyax",
      "nonProprietaryName": "Olanzapine and Fluoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC],Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681835",
      "ndc": "0002-3234",
      "name": "Symbyax",
      "nonProprietaryName": "Olanzapine and Fluoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC],Serotonin Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681836",
      "ndc": "0002-3235",
      "name": "Cymbalta",
      "nonProprietaryName": "Duloxetine hydrochloride",
      "dosageForm": "CAPSULE, DELAYED RELEASE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Uptake Inhibitors [MoA],Serotonin and Norepinephrine Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681837",
      "ndc": "0002-3238",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681838",
      "ndc": "0002-3239",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681839",
      "ndc": "0002-3240",
      "name": "Cymbalta",
      "nonProprietaryName": "Duloxetine hydrochloride",
      "dosageForm": "CAPSULE, DELAYED RELEASE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Uptake Inhibitors [MoA],Serotonin and Norepinephrine Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68183a",
      "ndc": "0002-3250",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68183b",
      "ndc": "0002-3251",
      "name": "Strattera",
      "nonProprietaryName": "Atomoxetine hydrochloride",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Reuptake Inhibitor [EPC],Norepinephrine Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68183c",
      "ndc": "0002-3270",
      "name": "Cymbalta",
      "nonProprietaryName": "Duloxetine hydrochloride",
      "dosageForm": "CAPSULE, DELAYED RELEASE",
      "route": "ORAL",
      "pharmClass": "Norepinephrine Uptake Inhibitors [MoA],Serotonin and Norepinephrine Reuptake Inhibitor [EPC],Serotonin Uptake Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68183d",
      "ndc": "0002-4112",
      "name": "Zyprexa",
      "nonProprietaryName": "Olanzapine",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e68183e",
      "ndc": "0002-4115",
      "name": "Zyprexa",
      "nonProprietaryName": "Olanzapine",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e68183f",
      "ndc": "0002-4116",
      "name": "Zyprexa",
      "nonProprietaryName": "Olanzapine",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681840",
      "ndc": "0002-4117",
      "name": "Zyprexa",
      "nonProprietaryName": "Olanzapine",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681841",
      "ndc": "0002-4165",
      "name": "Evista",
      "nonProprietaryName": "Raloxifene hydrochloride",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Estrogen Agonist/Antagonist [EPC],Selective Estrogen Receptor Modulators [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681842",
      "ndc": "0002-4184",
      "name": "Evista",
      "nonProprietaryName": "Raloxifene hydrochloride",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Estrogen Agonist/Antagonist [EPC],Selective Estrogen Receptor Modulators [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681843",
      "ndc": "0002-4415",
      "name": "Zyprexa",
      "nonProprietaryName": "Olanzapine",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681844",
      "ndc": "0002-4420",
      "name": "Zyprexa",
      "nonProprietaryName": "Olanzapine",
      "dosageForm": "TABLET",
      "route": "ORAL",
      "pharmClass": "Atypical Antipsychotic [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681849",
      "ndc": "0002-4462",
      "name": "Cialis",
      "nonProprietaryName": "Tadalafil",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "Phosphodiesterase 5 Inhibitor [EPC],Phosphodiesterase 5 Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68184a",
      "ndc": "0002-4463",
      "name": "Cialis",
      "nonProprietaryName": "Tadalafil",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "Phosphodiesterase 5 Inhibitor [EPC],Phosphodiesterase 5 Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68184b",
      "ndc": "0002-4464",
      "name": "Cialis",
      "nonProprietaryName": "Tadalafil",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "Phosphodiesterase 5 Inhibitor [EPC],Phosphodiesterase 5 Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68184c",
      "ndc": "0002-4465",
      "name": "Cialis",
      "nonProprietaryName": "Tadalafil",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "Phosphodiesterase 5 Inhibitor [EPC],Phosphodiesterase 5 Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681852",
      "ndc": "0002-7501",
      "name": "Gemzar",
      "nonProprietaryName": "Gemcitabine hydrochloride",
      "dosageForm": "INJECTION, POWDER, LYOPHILIZED, FOR SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Nucleic Acid Synthesis Inhibitors [MoA],Nucleoside Metabolic Inhibitor [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681853",
      "ndc": "0002-7502",
      "name": "Gemzar",
      "nonProprietaryName": "Gemcitabine hydrochloride",
      "dosageForm": "INJECTION, POWDER, LYOPHILIZED, FOR SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Nucleic Acid Synthesis Inhibitors [MoA],Nucleoside Metabolic Inhibitor [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681854",
      "ndc": "0002-7510",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SOLUTION",
      "route": "INTRAVENOUS; SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681855",
      "ndc": "0002-7511",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SUSPENSION",
      "route": "SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681856",
      "ndc": "0002-7512",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SUSPENSION",
      "route": "SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681857",
      "ndc": "0002-7516",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SOLUTION",
      "route": "INTRAVENOUS; SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681859",
      "ndc": "0002-7623",
      "name": "Alimta",
      "nonProprietaryName": "Pemetrexed disodium",
      "dosageForm": "INJECTION, POWDER, LYOPHILIZED, FOR SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Folate Analog Metabolic Inhibitor [EPC],Folic Acid Metabolism Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e68185d",
      "ndc": "0002-7640",
      "name": "Alimta",
      "nonProprietaryName": "Pemetrexed disodium",
      "dosageForm": "INJECTION, POWDER, LYOPHILIZED, FOR SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Folate Analog Metabolic Inhibitor [EPC],Folic Acid Metabolism Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681860",
      "ndc": "0002-7712",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SOLUTION",
      "route": "SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681861",
      "ndc": "0002-7714",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SOLUTION",
      "route": "SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681863",
      "ndc": "0002-7716",
      "name": "Portrazza",
      "nonProprietaryName": "necitumumab",
      "dosageForm": "SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Epidermal Growth Factor Receptor Antagonist [EPC],HER1 Antagonists [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e681865",
      "ndc": "0002-8031",
      "name": "Glucagon",
      "nonProprietaryName": "glucagon",
      "dosageForm": "KIT"
    },
    {
      "_id": "65ceffb533db4e902e68186e",
      "ndc": "0002-8797",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SUSPENSION",
      "route": "SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e68186f",
      "ndc": "0002-8798",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SUSPENSION",
      "route": "SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e681870",
      "ndc": "0002-8799",
      "name": "Humalog",
      "nonProprietaryName": "Insulin lispro",
      "dosageForm": "INJECTION, SOLUTION",
      "route": "INTRAVENOUS; SUBCUTANEOUS",
      "pharmClass": "Insulin [Chemical/Ingredient],Insulin Analog [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e6818a6",
      "ndc": "0004-0038",
      "name": "Valcyte",
      "nonProprietaryName": "valganciclovir hydrochloride",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "Cytomegalovirus Nucleoside Analog DNA Polymerase Inhibitor [EPC],DNA Polymerase Inhibitors [MoA],Nucleoside Analog [Chemical/Ingredient],Nucleoside Analog Antiviral [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e6818a7",
      "ndc": "0004-0039",
      "name": "Valcyte",
      "nonProprietaryName": "valganciclovir hydrochloride",
      "dosageForm": "POWDER, FOR SOLUTION",
      "route": "ORAL",
      "pharmClass": "Cytomegalovirus Nucleoside Analog DNA Polymerase Inhibitor [EPC],DNA Polymerase Inhibitors [MoA],Nucleoside Analog [Chemical/Ingredient],Nucleoside Analog Antiviral [EPC]"
    },
    {
      "_id": "65ceffb533db4e902e6818ac",
      "ndc": "0004-0186",
      "name": "Boniva",
      "nonProprietaryName": "ibandronate sodium",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "Bisphosphonate [EPC],Diphosphonates [Chemical/Ingredient]"
    },
    {
      "_id": "65ceffb533db4e902e6818ad",
      "ndc": "0004-0191",
      "name": "Boniva",
      "nonProprietaryName": "ibandronate sodium",
      "dosageForm": "INJECTION, SOLUTION",
      "route": "INTRAVENOUS",
      "pharmClass": "Bisphosphonate [EPC],Diphosphonates [Chemical/Ingredient]"
    },
    {
      "_id": "65ceffb533db4e902e6818ae",
      "ndc": "0004-0244",
      "name": "Invirase",
      "nonProprietaryName": "saquinavir mesylate",
      "dosageForm": "TABLET, FILM COATED",
      "route": "ORAL",
      "pharmClass": "HIV Protease Inhibitors [MoA],Protease Inhibitor [EPC],Cytochrome P450 3A Inhibitors [MoA]"
    },
    {
      "_id": "65ceffb533db4e902e6818af",
      "ndc": "0004-0245",
      "name": "Invirase",
      "nonProprietaryName": "saquinavir mesylate",
      "dosageForm": "CAPSULE",
      "route": "ORAL",
      "pharmClass": "HIV Protease Inhibitors [MoA],Protease Inhibitor [EPC],Cytochrome P450 3A Inhibitors [MoA]"
    }
  ]);
  const [ndcFilter, setNdcFilter] = useState<any>([]);
  const [ndcStored, setNdcStored] = useState<any>(receivedNdcList);
  const form = useFormHelper<AppointmentNdcFormType>({
    initialValues: {
      prescriptionReason: "",
      ndcNumber: "",
      ndc: "",
    },
    validationSchema: appointmentNdcSchema,
    mode: "controlled",
  });

  // const { status } = useAddCat(() => {
  // });

  // const isLoading = status === "pending";

  const onSubmitCall = () => {
    try {
      if (handleNdcCallback && ndcStored.length > 0) {
        handleNdcCallback(ndcStored);
      }

      notifications.show({
        title: "Success!",
        message: "NDC list form submitted successfully",
        color: "green",
      });
      form.reset();
      setNdcStored([]);
      setNdcFilter([]);
    } catch (error) {
      notifications.show({
        title: "Error!",
        message: "Please check all required fields",
        color: "red",
      });
    }
  };

  const handleAddNdc = () => {
    const selectedNdc = form.values.ndc;
    if (!selectedNdc) {
      notifications.show({
        title: "Warning!",
        message: "Please select an NDC first",
        color: "orange",
      });
      return;
    }

    const ndcToAdd = ndcFilter.find((ndc: any) => ndc._id === selectedNdc);
    if (!ndcToAdd) {
      notifications.show({
        title: "Error!",
        message: "Selected NDC not found",
        color: "red",
      });
      return;
    }

    const isAlreadyAdded = ndcStored.some((ndc: any) => ndc._id === selectedNdc);
    if (isAlreadyAdded) {
      notifications.show({
        title: "Warning!",
        message: "This NDC is already added to the list",
        color: "orange",
      });
      return;
    }

    setNdcStored((prev: any) => [...prev, ndcToAdd]);
    form.setFieldValue("ndc", "");
    notifications.show({
      title: "Success!",
      message: "NDC added successfully",
      color: "green",
    });
  };

  const handleDeleteNdc = (index: number) => {
    setNdcStored((prev: any) => prev.filter((_: any, i: number) => i !== index));
    notifications.show({
      title: "Success!",
      message: "NDC removed successfully",
      color: "green",
    });
  };

  const handleSearch = () => {
    const searchTerm = form.values.ndcNumber.trim();
    if (!searchTerm) {
      notifications.show({
        title: "Warning!",
        message: "Please enter an NDC number to search",
        color: "orange",
      });
      return;
    }

    const filtered = ndcList.filter((ndc: any) =>
      ndc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ndc.ndc.includes(searchTerm) ||
      ndc.nonProprietaryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setNdcFilter(filtered);

    if (filtered.length === 0) {
      notifications.show({
        title: "No Results",
        message: "No NDC found matching your search criteria",
        color: "blue",
      });
    } else {
      notifications.show({
        title: "Search Complete",
        message: `Found ${filtered.length} NDC(s) matching your search`,
        color: "green",
      });
    }
  };

  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 mb-4 bg-white dark:bg-gray-800">
                <Card.Section className="bg-blue-100 dark:bg-blue-900/50 px-4 py-3 rounded-t-md">
                  <Group justify="space-between">
                    <Text fw={600} size="md" className="text-blue-800 dark:text-blue-200">Find NDC and add one by one</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-3 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-lg">
                  <Grid>
                    <Grid.Col span={{ base: 12 }}>
                      <FormField label="Prescription Reason" required>
                        <PageTextInput
                          placeholder="Prescription Reason"
                          {...form.getInputProps("prescriptionReason")}
                          size="sm"
                          leftSection={<IconCalculator size={16} />}
                        />
                      </FormField>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                      <FormField label="Type NDC number" required>
                        <PageTextInput
                          placeholder="Search by NDC"
                          size="sm"
                          {...form.getInputProps("ndcNumber")}
                          leftSection={<IconBrandBooking size={16} />}
                          rightSection={
                            <ActionIcon
                              variant="filled"
                              onClick={handleSearch}
                              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white cursor-pointer transition-all duration-200 hover:scale-105"
                              size="lg"
                              radius="xs"
                            >
                              <IconSearch size={16} />
                            </ActionIcon>
                          }
                        />
                      </FormField>
                    </Grid.Col>
                    {ndcFilter.length > 0 && (
                      <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                        <FormField label="Select one NDC" required>
                          <div className="flex flex-row">
                            <div>
                              <PageSelect
                                placeholder="Select one NDC"
                                data={ndcFilter.map((ndc: any) => ({
                                  value: ndc._id,
                                  label: `${ndc.ndc} - ${ndc.name} (${ndc.dosageForm})`
                                }))}
                                {...form.getInputProps("ndc")}
                                size="sm"
                                leftSection={<IconCalculator size={16} />}
                              />
                            </div>
                            <div className="ml-3">
                              <ActionIcon
                                variant="filled"
                                onClick={handleAddNdc}
                                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white cursor-pointer transition-all duration-200 hover:scale-105"
                                size="lg"
                                radius="xs"
                              >
                                <IconPlus size={16} />
                              </ActionIcon>
                            </div>
                          </div>
                        </FormField>
                      </Grid.Col>
                    )}
                    {ndcStored && ndcStored.length !== 0 && (
                      <Fragment>
                        <Grid.Col span={{ base: 12 }}>
                          <Divider my="md" size="xs" variant="dashed" color="blue" label="Put below information" labelPosition="center" className="w-full text-gray-900 dark:text-white" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                          <Group justify="space-between" align="center" className="mb-4">
                            <Group gap="xs">
                              <IconMedicalCross size={20} className="text-blue-600 dark:text-blue-400" />
                              <Text fw={600} size="lg" className="text-gray-800 dark:text-gray-200">Added NDCs ({ndcStored.length})</Text>
                            </Group>
                          </Group>
                          <Grid gutter="md">
                            {ndcStored.map((ndc: any, index: number) => (
                              <Grid.Col key={ndc._id} span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                                <Paper className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                  <Group justify="space-between" align="center" className="mb-3">
                                    <Badge color="cyan" variant="light" size="sm" className="font-semibold" >NDC #{index + 1}</Badge>
                                    <ActionIcon
                                      variant="light"
                                      color="red"
                                      size="sm"
                                      className="hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300"
                                      onClick={() => handleDeleteNdc(index)}
                                    >
                                      <IconTrash size={12} />
                                    </ActionIcon>
                                  </Group>
                                  <div className="space-y-3">
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                      <Group gap="xs" className="mb-2">
                                        <IconMedicalCross size={16} className="text-blue-600 dark:text-blue-400" />
                                        <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">{ndc.name}</Text>
                                      </Group>
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">NDC:</Text>
                                          <Badge variant="outline" color="blue" size="xs">{ndc.ndc}</Badge>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Generic:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300 flex-1">{ndc.nonProprietaryName}</Text>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Form:</Text>
                                          <Badge variant="filled" color="green" size="xs">{ndc.dosageForm}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Route:</Text>
                                          <Badge variant="light" color="orange" size="xs">{ndc.route}</Badge>
                                        </div>
                                        {ndc.pharmClass && (
                                          <div className="flex items-start gap-2">
                                            <Text size="xs" className="text-gray-600 dark:text-gray-400 font-medium min-w-[60px]">Class:</Text>
                                            <Text size="xs" className="text-gray-700 dark:text-gray-300 flex-1 leading-relaxed">
                                              {ndc.pharmClass.split(',').slice(0, 2).join(', ')}
                                              {ndc.pharmClass.split(',').length > 2 && '...'}
                                            </Text>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Paper>
                              </Grid.Col>
                            ))}
                          </Grid>
                        </Grid.Col>
                        <Grid.Col span={12} className="mt-6 flex justify-end">
                          <Button onClick={onSubmitCall}>Add NDC</Button>
                        </Grid.Col>
                      </Fragment>
                    )}
                  </Grid>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid >
        </Card.Section>
      </Card>
    </Box>
  );
};
