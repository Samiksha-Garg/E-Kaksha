/*
Top navbar - Back button (for redirecting to the course home page)
course name 
techers name

asn title 
issue date

Points- Deadline

Instructions

asn Material

Submission link - submit button

Class comment 

Private comment
*/

import React, {useEffect, useState, useContext} from "react";
import { Context } from "../../context/Context";

export default function AsnSubmissionPage(){
    const {user,dispatch} =useContext (Context);

    console.log(user);
    return (<div>
    </div>);
}
