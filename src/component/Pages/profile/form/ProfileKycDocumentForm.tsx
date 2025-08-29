import { Box, Card, Grid, Group, Text } from "@mantine/core"
import { FormField, FormWrapper } from "../../../common/PageFromWrapper"
import { PageFileUpload, PageSelect, PageTextInput } from "../../../common/PageInput"
import { IconDevicesPc, IconDotsVertical, IconPlus } from "@tabler/icons-react"
import { useFormHelper } from "../../../../services/helperService"
import { useCreateDepartment } from "../../../../hooks/query_hooks/departmentHooks"
import { notifications } from "@mantine/notifications"
import { useState } from "react"
import { profileKycDocumentSchema, type ProfileKycDocumentFormType } from "../../../../services/zod_schema/profile/zodProfileKycDocumentSchema"

export const ProfileKycDocumentForm = (props: { dataPass: any }) => {
  const { kycDocumentData } = props.dataPass;
  const kycDocumentObject = profileKycDocumentSchema();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const form = useFormHelper<ProfileKycDocumentFormType>({
    initialValues: {
      documentType: kycDocumentData?.documentType || '',
      documentNumber: kycDocumentData?.documentNumber || '',
      document: kycDocumentData?.document || '',
    },
    validationSchema: kycDocumentObject,
    mode: 'controlled',
  });
  const { mutate: __createDepartment, status } = useCreateDepartment(() => {
    notifications.show({
      title: 'Success!',
      message: 'Department created successfully',
      color: 'green',
    });
    form.reset();
  });
  const isLoading = status === "pending";
  const handleFileUpload = (files: File[], isMultiple: boolean = false) => {
    if (isMultiple) {
      setUploadedFiles(prev => [...prev, ...files]);
    } else {
      setUploadedFiles(files);
    }
    if (files.length > 0) {
      form.setFieldValue('document', files[0].name);
    }
    notifications.show({
      title: 'Success!',
      message: `${files.length} file(s) uploaded successfully`,
      color: 'green',
    });
  };
  const handleFileReject = () => {
    notifications.show({
      title: 'Upload Failed',
      message: 'Some files were rejected. Please check file size and format.',
      color: 'red',
    });
  };
  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length <= 1) {
      form.setFieldValue('document', '');
    }
    notifications.show({
      title: 'File Removed',
      message: 'File has been removed successfully',
      color: 'orange',
    });
  };
  const onSubmitCall = (__formData: ProfileKycDocumentFormType) => {
    try {
      // const validatedData = kycDocumentObject.parse(formData);
      // createDepartment(validatedData);
      notifications.show({
        title: 'Success!',
        message: 'KYC document form submitted successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please check your form data and try again',
        color: 'red',
      });
    }
  };

  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200">
                <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                  <Group justify="space-between">
                    <Text fw={600} size="md" className="text-cyan-800">Fill out Info</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-4 py-3">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText={kycDocumentData != null ? "Update department" : "Create department"}
                    submitButtonIcon={<IconPlus size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
                        <FormField label="Document Type" required>
                          <PageSelect
                            placeholder="Enter document type"
                            size="sm"
                            data={['Passport', 'Driver License', 'National ID', 'Voter ID']}
                            {...form.getInputProps('documentType')}
                            leftSection={<IconDotsVertical size={16} />} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
                        <FormField label="Document Number" required >
                          <PageTextInput
                            placeholder="Enter document number"
                            size="sm"
                            leftSection={<IconDevicesPc size={16} />}
                            {...form.getInputProps('documentNumber')} />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Document" required >
                          <PageFileUpload
                            description="Upload your document (Max 5MB)"
                            accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                            multiple={false}
                            maxSize={5 * 1024 ** 2}
                            uploadedFiles={uploadedFiles}
                            onDrop={(files, isMultiple) => handleFileUpload(files, isMultiple)}
                            onReject={handleFileReject}
                            onRemoveFile={handleRemoveFile}
                            height={250}
                            uploadText="Drop your photo here"
                            supportText="PNG, JPG, GIF up to 5MB"
                            showPreview={true}
                            required
                            {...form.getInputProps('document')}
                          />
                        </FormField>
                      </Grid.Col>
                    </Grid>
                  </FormWrapper>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </Box>
  )
}