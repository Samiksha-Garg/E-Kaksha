import axios from "axios";
import React, {useState, useEffect} from "react";
import useDrivePicker from 'react-google-drive-picker'

function PDF() {
  const [openPicker, data, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "1002411722965-inrhsth7j36ls64bna0elctqnscpg1h6.apps.googleusercontent.com",
      developerKey: "AIzaSyATTZ_B_pWOTeg0rNj45y7pdCRm8_fk-0s",
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
