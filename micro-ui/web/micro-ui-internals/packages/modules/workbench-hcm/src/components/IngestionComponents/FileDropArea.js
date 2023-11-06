import React, { useState, useRef } from 'react';
import { ActionBar, Header, Loader, SubmitBar, Toast} from "@egovernments/digit-ui-react-components";

function FileDropArea ({ingestionType}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [response, setResponse] = useState(null);

  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const closeToast = () => {
    setTimeout(() => {
      setShowToast(null);
    }, 5000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.preventDefault();
  setIsDragActive(false);

  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    if (files.length === 1) {
      const file = files[0];
      const fileName = file.name;
  
      // Check if the file is a CSV (text/csv)
      if (file.type === 'text/csv') {
          setDroppedFile({ name: fileName, file:file });
      } else {
        // Showing a toast message indicating that only CSV files are allowed.
        setShowToast({
          label: "Only CSV files are allowed.",
          isError: true,
        });
        closeToast();
      }
    } else {
      // Showing a toast message indicating that only one file is allowed at a time.
      setShowToast({
        label: "Only one file is allowed at a time.",
        isError: true,
      });
      closeToast();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleRemoveFile = () => {
    setDroppedFile(null);
    // You can also perform any additional cleanup or actions here.
  };

  const isDroppedFileNul = () => {
    if (droppedFile?.file == null) {
      setShowToast({
        label: "Please choose a file to ingest.",
        isError: true,
      });
      closeToast();
      return; // Return early to prevent API call
    }
  }

 
  
  const onsubmit = async () => {
    if (droppedFile?.file == null) {
      setShowToast({
        label: "Please choose a file to ingest.",
        isError: true,
      });
      closeToast();
    }
    else {
      const formData = new FormData();
      formData.append("file", droppedFile.file);

      switch (ingestionType) {
        case "Facility":
          formData.append(
            "DHIS2IngestionRequest",
            JSON.stringify({
              tenantId: Digit.ULBService.getCurrentTenantId(),
              dataType: "Facility",
              requestInfo: {
                userInfo: Digit.UserService.getUser(),
              },
            })
          );
          const facilityResponse = await Digit.IngestionService.facility(formData);
          break;

        case "OU":
          formData.append(
            "DHIS2IngestionRequest",
            JSON.stringify({
              tenantId: Digit.ULBService.getCurrentTenantId(),
              requestInfo: {
                userInfo: Digit.UserService.getUser(),
              },
            })
          );
          const ouRes = await Digit.IngestionService.ou(formData);
          setResponse(ouRes);
          break;

        case "User":
          formData.append(
            "DHIS2IngestionRequest",
            JSON.stringify({
              tenantId: Digit.ULBService.getCurrentTenantId(),
              dataType: "Users",
              requestInfo: {
                userInfo: Digit.UserService.getUser(),
              },
            })
          );
          const userRes = await Digit.IngestionService.user(formData);
          setResponse(userRes);
          break;

        default:
          setShowToast({
            label: "Unsupported ingestion type.",
            isError: true,
          });
          closeToast();
          return;
      }

    }
  }

  return (
    <div>
      <Header>{ingestionType} Ingestion</Header>
      <div className={`drop-area ${isDragActive ? 'active' : ''}`} onDragEnter={handleDragEnter} onDragOver={(e) => e.preventDefault()} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        {droppedFile ? (
          <div>
          <p className="drag-drop-tag">File: {droppedFile.name}</p>
          <button className="remove-button" onClick={handleRemoveFile }>Remove</button>
          </div>
        ) : (
          <div>
          <p className="drag-drop-tag">Drag and drop your file here or</p>
          <button className="upload-file-button" onClick={handleButtonClick}>Browse files</button>
        <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept=".csv"
        onChange={handleDrop} />
          </div>
        )}
        {showToast && <Toast label={showToast.label} error={showToast?.isError} isDleteBtn={true} onClose={() => setShowToast(null)}></Toast>}
      </div>
      <ActionBar>
      <SubmitBar label={"Submit"} 
      onSubmit={onsubmit}
      />
      </ActionBar>
    </div>
  );
}

export default FileDropArea;