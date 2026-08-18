import { useState, useRef, useEffect } from "react"
import "./ImageViewer.css"

export function ImageViewer(props) {
    const [mode, setMode] = useState("open")
    const [link, setLink] = useState("https://skyfonix.cigoria.eu/api/uploads/aea67551-99bd-11f1-86f2-9c50b9b14b65")

    const containerRef = useRef(null)

    const imageRef = useRef(null)

    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const dragStart = useRef({ x: 0, y: 0 })
    const initialPosition = useRef({ x: 0, y: 0 })

    function handleMouseDown(e) {
        if (e.button !== 0) return
        setIsDragging(true)
        dragStart.current = {
            x: e.clientX,
            y: e.clientY
        }
        initialPosition.current = position
    }

    function handleMouseMove(e) {
        if (!isDragging) return
        const dx = e.clientX - dragStart.current.x
        const dy = e.clientY - dragStart.current.y

        setPosition({
            x: initialPosition.current.x + dx,
            y: initialPosition.current.y + dy
        })
    }
    function handleMouseUp() {
        setIsDragging(false)
    }

    function handleWheel(e) {
        e.preventDefault();
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const oldScale = scale;
        const newScale = Math.min(Math.max(oldScale * zoomFactor, 0.1), 10);
        const imageX = (mouseX - position.x) / oldScale;
        const imageY = (mouseY - position.y) / oldScale;
        setPosition({
            x: mouseX - imageX * newScale,
            y: mouseY - imageY * newScale
        });
        setScale(newScale);
    }

    return (
        <div className="app imageViewerApp">
            {mode == "open" && <div className="open" style={{ width: "100%", height: "100%" }}>
                <input type="text" placeholder="Link here..." value={link} onChange={(e) => { setLink(e.target.value) }} />
                <p>or</p>
                <input type="file" onChange={(e) => { setLink(prev => (e.target.files? URL.createObjectURL(e.target.files[0]) : prev)) }} />
                <p>or</p>
                <input type="text" placeholder="simpleShare code" onChange={(e) => { setLink("https://fs.cigoria.eu/files/"+e.target.value) }} />
                <button onClick={() => { setMode("view") }}>Open</button>
            </div>}
            {mode == "view" && <div style={{ width: "100%", height: "100%" }} className="view">
                <div className="imageContainer" ref={containerRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel}>
                    <img
                        src={link}
                        alt="Image of image viewer"
                        draggable={false}
                        style={{
                            transform: `
                                translate(${position.x}px, ${position.y}px)
                                scale(${scale})
                            `,
                        }}
                        ref={imageRef}
                        onLoad={() => {
                            setScale((props.dimensions.y - 60) / imageRef.current.naturalHeight)
                            setPosition({ x: 0, y: 0 })
                            initialPosition.current = { x: 0, y: 0 }
                            dragStart.current = { x: 0, y: 0 }
                        }}
                    />
                </div>
                <div className="controls">
                    <button onClick={() => { setMode("open") }}>Open new</button>
                    <button onClick={() => { setScale(prev => (Math.max(prev - 0.1, 0.1))) }}>-</button>
                    <button onClick={() => { setScale(prev => (Math.min(prev + 0.1, 10))) }}>+</button>
                    <button onClick={() => {
                        setScale((props.dimensions.y - 60) / imageRef.current.naturalHeight)
                        setPosition({ x: 0, y: 0 })
                        initialPosition.current = { x: 0, y: 0 }
                        dragStart.current = { x: 0, y: 0 }
                    }}>Reset</button>
                </div>
            </div>}
        </div>
    )
}