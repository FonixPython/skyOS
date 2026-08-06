import "./Window.css"
import { useState, useRef } from "react"
import Draggable from "react-draggable"


export function Window(props) {
    const nodeRef = useRef(null);
    return (
        <Draggable nodeRef={nodeRef} handle=".handle">
            <div className="window" ref={nodeRef} >
                <div className="handle">
                    <h2>{props.title || "Window"}</h2>
                    <button>X</button>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </Draggable >
    )
}
