import axios from "axios";
import React, {useState, useEffect} from "react";
import useDrivePicker from 'react-google-drive-picker'

function PDF() {
  const [openPicker, data, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "570010301519-etlhrs7uv373dji6joeaat8t2rornin4.apps.googleusercontent.com",
      developerKey: "AIzaSyDa-r1oYw0CuYNzHg9Yorlh55mdSWL1GKU",
      viewId: "DOCS",
      //token:"##youraccesstoken##", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i));
    }
  }, [data]);

  useEffect(() => {
    // do anything with the selected/uploaded files
    console.log(authResponse);
  }, [authResponse]);

  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default PDF;
