import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import './Navigationbar.css'

function Navigationbar(){

    return(<div className="navigationbar-container">
        <div className="navigationbar-button-container">
            <Button size='large' component={RouterLink} to={"/"}>
                Home
            </Button>
            <Button size='large' component={RouterLink} to={"/newsletters"}>
                Newsletters
            </Button>
            <Button size='large' component={RouterLink} to={"/title"}>
                Title
            </Button>
        </div>
    </div>)
}

export default Navigationbar;