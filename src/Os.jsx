import Bar from "./modules/Bar/Bar"
import { Window } from "./modules/Window/Window"
import { AboutApp } from "./Apps/About/About"
import { useState } from "react"

export default function Os() {
    const [windows, setWindows] = useState([])

    const handleRemoveWindow = (i) => {
        setWindows(items => items.filter((_, index) => index !== i));
        console.log(windows)
    }

    function returnOpenedApp(key, title) {
        console.log(windows)
        switch (title) {
            case "About":
                return (<Window title={title} onClose={(i) => { handleRemoveWindow(i) }} index={key} dimensions={{ x: 350, y: 400 }}><AboutApp /></Window>)
            default:
                return (<Window title={title} onClose={(i) => { handleRemoveWindow(i) }} index={key} dimensions={{ x: 350, y: 500 }}></Window>)
        }
    }

    return (
        <main>
            <Bar></Bar>
            <div className="desktop">
                <button onClick={() => { setWindows(prev => ([...prev, "About"])) }} className="openButton">
                    <img src="/info.webp" alt="info icon" />
                    <p>Open About</p>
                </button>

                {windows.map((type, index) => returnOpenedApp(index, type))}
            </div>
        </main>
    )
}