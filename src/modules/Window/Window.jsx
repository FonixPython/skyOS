import "./Window.css"
import { useState, useRef } from "react"
import Draggable from "react-draggable"


export function Window(props) {
    const nodeRef = useRef(null);
    const [opened, setOpened] = useState(true)
    if (opened) {
        return (
            <Draggable nodeRef={nodeRef} handle=".handle" bounds="parent" defaultPosition={{ x: 100, y: 100 }}>
                <div className="window" ref={nodeRef} style={{
                    width: props.dimensions.x + "px",
                    height: props.dimensions.y + "px"
                }}>
                    <div className="handle">
                        <h2>{props.title || "Window"}</h2>
                        <button onClick={() => {
                            setOpened(false);
                            if (props.onClose) { props.onClose(props.index) }
                        }}>X</button>
                    </div>
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            </Draggable >
        )
    } else {
        return null
    }
}
