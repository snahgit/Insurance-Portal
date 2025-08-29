import { Text } from "@mantine/core";
import { IconImageInPicture } from "@tabler/icons-react";

const ImageUpload = () => {
  return (
    <>
      <div className="imageUploadDiv">
        <input type="file" />
        <div className="imageContent">
          <Text className="flex align-center justify-center">
            <IconImageInPicture />
            <span>Upload Image</span>
          </Text>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
