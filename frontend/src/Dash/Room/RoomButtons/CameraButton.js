import React, { useState } from "react";
import { IconButton } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';


const CameraButton = ({localStream}) => {

    const [cameraEnabled, setcameraEnabled] = useState(true);

    const handlerToggleCamera = () => {
        localStream.getVideoTracks()[0].enabled = !cameraEnabled;
        setcameraEnabled(!cameraEnabled);
    }

    return (
        <IconButton
        style={{color:'white'}}
            onClick={handlerToggleCamera}
        >
            {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
    )
};
export default CameraButton;