import { useState } from "react";
import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { IconAddressBook, IconBrandMantine, IconPlus, IconPill, IconCut, IconStethoscope, IconTestPipe, IconHeartbeat, IconBandage, IconUpload, IconFileText, IconReceipt } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { useLocation } from "react-router";
import { PageFileUpload, PageTextarea, PageTextInput, PageSelect } from "../../../../../common/PageInput";
import { reportAddEditSchema, type ReportAddEditFormType } from "../../../../../../services/zod_schema/manage_report/report/zodReportAddEditSchema";


export const ReportAddEditForm = () => {
  const { state } = useLocation()
  const reportAddEditObject = reportAddEditSchema();
  const mode = state ? "edit" : "create";
  const [isLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    report: File[];
    prescription: File[];
    surgery: File[];
    consultant: File[];
    testResult: File[];
    therapy: File[];
    treatment: File[];
    invoice: File[];
  }>({
    report: [],
    prescription: [],
    surgery: [],
    consultant: [],
    testResult: [],
    therapy: [],
    treatment: [],
    invoice: [],
  });
  const topBarAndFilter = {
    type: "staffMember",
    heading: mode == 'create' ? "Create Report  " : "Create Report",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };
  const form = useFormHelper<ReportAddEditFormType>({
    initialValues: {
      appointmentId: state?.appointmentId || '',
      planName: state?.planName || '',
      description: state?.description || '',
      // report: state?.report || '',
      // prescription: state?.prescription || '',
      // surgery: state?.surgery || '',
      // consultant: state?.consultant || '',
      // testResult: state?.testResult || '',
      // therapy: state?.therapy || '',
      // treatment: state?.treatment || '',
      // invoice: state?.invoice || '',
    },
    validationSchema: reportAddEditObject,
    mode: 'controlled',
  });

  // const getFileStatistics = () => {
  //   const stats = Object.entries(uploadedFiles).map(([type, files]) => ({
  //     type,
  //     count: files.length,
  //     files: files.map(file => file.name)
  //   }));
  //   const totalFiles = Object.values(uploadedFiles).reduce((total, files) => total + files.length, 0);
  //   return {
  //     stats,
  //     totalFiles,
  //     hasFiles: totalFiles > 0
  //   };
  // };

  const onSubmitCall = (__formData: ReportAddEditFormType) => {
    // const validatedData = reportAddEditObject.parse(formData);
    // const fileStats = getFileStatistics();
    // const submissionData = {
    //   ...validatedData,
    //   files: allUploadedFiles,
    //   fileStats
    // };
    // createStaffUserMember(submissionData);
  };

  const handleFileUpload = (files: File[], fileType: keyof typeof uploadedFiles, isMultiple: boolean = false) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: isMultiple ? [...prev[fileType], ...files] : files
    }));
    if (files.length > 0) {
      const fileNames = files.map(file => file.name).join(', ');
      form.setFieldValue(fileType, fileNames);
    }
    notifications.show({
      title: 'Success!',
      message: `${files.length} ${fileType} file(s) uploaded successfully`,
      color: 'green',
    });
  };
  const handleFileReject = (fileType: string) => {
    notifications.show({
      title: 'Upload Failed',
      message: `${fileType} files were rejected. Please check file size and format.`,
      color: 'red',
    });
  };

  const handleRemoveFile = (index: number, fileType: keyof typeof uploadedFiles) => {
    const updatedFiles = uploadedFiles[fileType].filter((_, i) => i !== index);
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: updatedFiles
    }));
    if (updatedFiles.length === 0) {
      form.setFieldValue(fileType, '');
    } else {
      const fileNames = updatedFiles.map(file => file.name).join(', ');
      form.setFieldValue(fileType, fileNames);
    }
    notifications.show({
      title: 'File Removed',
      message: `${fileType} file has been removed successfully`,
      color: 'orange',
    });
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: mode == 'create' ? "Create Report" : "Edit Report",
            items: [
              { title: "Manage Report", href: "#" },
              { title: "Report List", href: "/manage-report/report" },
              { title: mode == 'create' ? "Create Report" : "Edit Report", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Box className="p-3">
            <FormWrapper
              form={form}
              onSubmit={onSubmitCall}
              submitButtonIcon={<IconPlus size={16} />}
              submitButtonText={mode === "create" ? "Create Report" : "Update Report"}
              isLoading={isLoading}>
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className=" border-blue-200 mb-4">
                    <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconAddressBook size={16} color="blue" />
                        <Text fw={600} size="md" className="text-blue-800">Report basic info</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
                      <Grid>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                          <FormField label="Appointment ID" required>
                            <PageSelect
                              placeholder="Select Appointment ID"
                              size="sm"
                              data={['SNAH123456', 'SNAH123457', 'SNAH123458', 'SNAH123459']}
                              {...form.getInputProps('appointmentId')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                          <FormField label="Plan Name" required >
                            <PageTextInput
                              placeholder="Enter plan name"
                              size="sm"
                              {...form.getInputProps('planName')}
                              leftSection={<IconBrandMantine size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                          <FormField label="Description" required >
                            <PageTextarea
                              rows={5}
                              placeholder="Tell us about yourself"
                              size="sm"
                              {...form.getInputProps('description')}
                            />
                          </FormField>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className=" border-blue-200 mb-4">
                    <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconUpload size={16} color="blue" />
                        <Text fw={600} size="md" className="text-blue-800">upload report file</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Upload Report" required icon={<IconFileText size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Report File (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.report}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'report', isMultiple)}
                              onReject={() => handleFileReject('Report')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'report')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('report')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Prescription" required icon={<IconPill size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Prescription (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.prescription}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'prescription', isMultiple)}
                              onReject={() => handleFileReject('Prescription')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'prescription')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('prescription')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Surgery" required icon={<IconCut size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Surgery (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.surgery}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'surgery', isMultiple)}
                              onReject={() => handleFileReject('Surgery')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'surgery')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('surgery')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Consultant" required icon={<IconStethoscope size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Consultant (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.consultant}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'consultant', isMultiple)}
                              onReject={() => handleFileReject('Consultant')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'consultant')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('consultant')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Test Result" required icon={<IconTestPipe size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Test Result (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.testResult}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'testResult', isMultiple)}
                              onReject={() => handleFileReject('Test Result')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'testResult')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('testResult')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Therapy" required icon={<IconHeartbeat size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Therapy (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.therapy}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'therapy', isMultiple)}
                              onReject={() => handleFileReject('Therapy')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'therapy')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('therapy')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Treatment" required icon={<IconBandage size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Treatment (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.treatment}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'treatment', isMultiple)}
                              onReject={() => handleFileReject('Treatment')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'treatment')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('treatment')}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <FormField label="Invoice" required icon={<IconReceipt size={16} color="blue" />}>
                            <PageFileUpload
                              description="Upload Invoice (Max 5MB)"
                              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                              multiple={true}
                              maxSize={5 * 1024 ** 2}
                              uploadedFiles={uploadedFiles.invoice}
                              onDrop={(files, isMultiple) => handleFileUpload(files, 'invoice', isMultiple)}
                              onReject={() => handleFileReject('Invoice')}
                              onRemoveFile={(index) => handleRemoveFile(index, 'invoice')}
                              height={250}
                              uploadText="Drop your photo here"
                              supportText="PNG, JPG, GIF up to 5MB"
                              showPreview={true}
                              required
                              {...form.getInputProps('invoice')}
                            />
                          </FormField>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
              </Grid>
            </FormWrapper>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
