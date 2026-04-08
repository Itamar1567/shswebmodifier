import Button from '@mui/material/Button';
import './Option.css'
import { Link as RouterLink} from "react-router-dom";

interface Props{
    link: string,
    text: string,
}

function Option({text, link}: Props) {
    return (<div className="option-container">
        <Button id="option-link" variant="contained" component={RouterLink} to={link}>
            {text}
        </Button>
    </div>)
}

export default Option