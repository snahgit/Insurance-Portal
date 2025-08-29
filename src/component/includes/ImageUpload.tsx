import { Text } from "@mantine/core";
import { IconImageInPicture } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";

const ImageUpload = () => {
  return (
    <Fragment>
      <div className="imageUploadDiv">
        <input type="file" />
        <div className="imageContent">
          <Text className="flex align-center justify-center">
            <IconImageInPicture />
            <span>Upload Image</span>
          </Text>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageUpload;
