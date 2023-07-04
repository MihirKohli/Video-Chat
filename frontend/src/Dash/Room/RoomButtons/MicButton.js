import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';


const MicButton = ({localStream}) => {

    const [micEnabled, setmicEnabled] = useState(true);

    const handlerToggleMic = () => {
        localStream.getVideoTracks()[0].enabled = !micEnabled;
        setmicEnabled(!micEnabled);
    }

    return (
        <IconButton
        style={{color:'white'}}
            onClick={handlerToggleMic}
        >
            {micEnabled ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
    )
};
export default MicButton;