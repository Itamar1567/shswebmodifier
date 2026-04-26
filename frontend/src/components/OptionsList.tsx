import "./OptionsList.css"
import Option from "./Option"

function OptionsList() {

    const links = [{id: 0, label: "Newsletters", to: "newsletters"}]
    return (<div className="options-container"> 
        {links.map((l) => <Option key={l.id} text={l.label} link={l.to}/>)}
    </div>)
}

export default OptionsList