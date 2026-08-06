import "./Bar.css"
import Clock from "../Clock/Clock"

export default function Bar() {
    return (
        <div className="topBar">
            <h1><span className="highlighted">sky</span>OS</h1>
            <Clock className="clock"></Clock>
        </div>
    )
}