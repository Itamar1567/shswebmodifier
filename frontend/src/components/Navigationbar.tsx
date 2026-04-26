import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import './Navigationbar.css'
import { UserButton } from '@clerk/react';

function Navigationbar(){

    return(<div className="navigationbar-container">
        <div className="navigationbar-button-container">
            <Button size='large' component={RouterLink} to={"/"}>
                Home
            </Button>
            <Button size='large' component={RouterLink} to={"/newsletters"}>
                Newsletters
            </Button>
        </div>
        <div id="user-button">
            <UserButton></UserButton>
        </div>
    </div>)
}

export default Navigationbar;