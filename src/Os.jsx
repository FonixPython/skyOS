import Bar from "./modules/Bar/Bar"
import { Window } from "./modules/Window/Window"
import { AboutApp } from "./Apps/About/About"
import { Notes } from "./Apps/Notes/Notes"
import { SettingsApp } from "./Apps/Settings/Settings"
import { useEffect, useState } from "react"

export default function Os() {
    const [windows, setWindows] = useState([])

    const handleRemoveWindow = (i) => {
        setWindows(items => items.filter((_, index) => index !== i));
    }

    function returnOpenedApp(key, title) {
        switch (title) {
            case "About":
                return (<Window title={title} onClose={(i) => { handleRemoveWindow(i) }} key={key} index={key} dimensions={{ x: 350, y: 400 }}><AboutApp /></Window>)
            case "Notes":
                return (<Window title={title} onClose={(i) => { handleRemoveWindow(i) }} key={key} index={key} dimensions={{ x: 500, y: 400 }}><Notes /></Window>)
            case "Settings":
                return (<Window title={title} onClose={(i) => { handleRemoveWindow(i) }} key={key} index={key} dimensions={{ x: 350, y: 150 }}><SettingsApp /></Window>)
            default:
                return (<Window title={title} onClose={(i) => { handleRemoveWindow(i) }} key={key} index={key} dimensions={{ x: 350, y: 500 }}></Window>)
        }
    }
    function loadWallpaper() {
        try {
            let wallpaper = localStorage.getItem("wallpaperUrl")
            if (wallpaper) {
                document.querySelector(".desktop").style.backgroundImage = `url(${wallpaper})`
                document.querySelector(".desktop").style.backgroundSize = "cover";
                document.querySelector(".desktop").style.backgroundPosition = "center";
                document.querySelector(".desktop").style.backgroundRepeat = "no-repeat";
            } else {
                localStorage.setItem("wallpaperUrl", "https://fs.cigoria.eu/files/nyvnuh")
                console.log()
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(loadWallpaper, [])

    return (
        <main>
            <Bar></Bar>
            <div className="desktop">
                <button onClick={() => { setWindows(prev => ([...prev, "About"])) }} className="openButton">
                    <img src="/info.webp" alt="info icon" />
                    <p>Open About</p>
                </button>
                <button onClick={() => { setWindows(prev => ([...prev, "Notes"])) }} className="openButton">
                    <img src="/notes.webp" alt="notes icon" />
                    <p>Open Notes</p>
                </button>
                <button onClick={() => { setWindows(prev => ([...prev, "Settings"])) }} className="openButton">
                    <img src="/settings.webp" alt="settings icon" />
                    <p>Open Settings</p>
                </button>
                {windows.map((type, index) => returnOpenedApp(index, type))}
            </div>
        </main>
    )
}