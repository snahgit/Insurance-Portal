import { IconUpload } from "@tabler/icons-react";
import React from "react";

const FileUploadInput = () => {
  return (
    <div className="fileUploadDiv">
      <input type="file" />
      <div className="fileUploadInnerDiv">
        <span>
          <IconUpload />
        </span>
        <p>Upload File</p>
      </div>
    </div>
  );
};

export default React.memo(FileUploadInput);
