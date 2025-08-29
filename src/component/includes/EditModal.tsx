import React from "react";

const EditModal = () => {
  return (
    <div className="modalBackdropDiv">
      <div className="modalMainDiv">
        <div className="modalHeadDiv"></div>
        <div className="modalContentDiv"></div>
      </div>
    </div>
  );
};

export default React.memo(EditModal);
