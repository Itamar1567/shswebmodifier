import "./OptionsList.css"
import Option from "./Option"

function OptionsList() {

    const links = [{id: 0, label: "Newsletters", to: "newsletters"}, {id: 1, label: "Change title", to: "title"}]
    return (<div className="options-container"> 
        {links.map((l) => <Option key={l.id} text={l.label} link={l.to}/>)}
    </div>)
}

export default OptionsList