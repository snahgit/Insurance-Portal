import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { IconPaperclip, IconPlus, IconWriting } from "@tabler/icons-react";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { PageFileUpload, PageTextInput } from "../../../../../common/PageInput";
import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { useState } from "react";
import { facilityClaimDocumentSchema, type FacilityClaimDocumentFormType } from "../../../../../../services/zod_schema/manage_claim/facility_claim/zodFacilityClaimDocumentSchema";


export const FacilityClaimDocumentForm = (props: { dataPass: any }) => {
  const { handleDocumentCallback, claimDocument } = props.dataPass;
  const facilityClaimDocumentObject = facilityClaimDocumentSchema();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const form = useFormHelper<FacilityClaimDocumentFormType>({
    initialValues: {
      typeOfFile: "",
      document: '',
    },
    validationSchema: facilityClaimDocumentObject,
    mode: "controlled",
  });
  const isLoading = false;
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
  const onSubmitCall = (data: FacilityClaimDocumentFormType) => {
    facilityClaimDocumentObject.parse(data);
    if (handleDocumentCallback) {
      const newDocument = { typeOfFile: form.values.typeOfFile, document: form.values.document };
      handleDocumentCallback([...claimDocument, newDocument]);
    }
    setTimeout(() => {
      notifications.show({
        title: "Success!",
        message: "Document added successfully.",
        color: "green",
      });
      form.reset();
      setUploadedFiles([]);
    }, 600);
  };

  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-sky-200">
                <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                  <Group gap="xs">
                    <IconPaperclip size={16} color="teal" />
                    <Text fw={600} size="md" className="text-sky-800">Add Document Information</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-3 py-3">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Add file"
                    isLoading={isLoading}
                    submitButtonIcon={<IconPlus size={16} />}>
                    <Grid>
                      <Grid.Col span={12}>
                        <FormField label="Type of file" required>
                          <PageTextInput
                            placeholder="Enter type of file"
                            size="sm"
                            {...form.getInputProps('typeOfFile')}
                            leftSection={<IconWriting size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <FormField label="Select document" required>
                          <PageFileUpload
                            description="Upload document (Max 5MB)"
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
    </Box >
  );
};
