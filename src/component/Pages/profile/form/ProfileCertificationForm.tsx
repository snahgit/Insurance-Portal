import { Box, Card, Grid, Group, Text } from "@mantine/core"
import { FormField, FormWrapper } from "../../../common/PageFromWrapper"
import { PageDateInput, PageFileUpload } from "../../../common/PageInput"
import { IconCalendar, IconPlus } from "@tabler/icons-react"
import { useFormHelper } from "../../../../services/helperService"
import { useCreateDepartment } from "../../../../hooks/query_hooks/departmentHooks"
import { notifications } from "@mantine/notifications"
import { useState } from "react"
import moment from "moment"
import { profileCertificationSchema, type ProfileCertificationFormType } from "../../../../services/zod_schema/profile/zodProfileCertificationSchema"

export const ProfileCertificationForm = (props: { dataPass: any }) => {
  const { certificationData } = props.dataPass;
  const certificationObject = profileCertificationSchema();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const form = useFormHelper<ProfileCertificationFormType>({
    initialValues: {
      date: certificationData?.date ? moment(certificationData.date).format('YYYY-MM-DD') : '',
      document: certificationData?.document || '',
    },
    validationSchema: certificationObject,
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
  const onSubmitCall = (__formData: ProfileCertificationFormType) => {
    try {
      // const validatedData = certificationObject.parse(formData);
      // createDepartment(validatedData);
      notifications.show({
        title: 'Success!',
        message: 'Certification form submitted successfully',
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
                    submitButtonText={certificationData != null ? "Update Certification" : "Create Certification"}
                    submitButtonIcon={<IconPlus size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Date" required >
                          <PageDateInput
                            placeholder="Enter date"
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                            {...form.getInputProps('date')} />
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