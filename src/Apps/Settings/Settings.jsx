import { useState } from "react"
import "./Settings.css"


export function SettingsApp() {
    const [bgUrl, setBgUrl] = useState(localStorage.getItem("wallpaperUrl"))
    function setBg() {
        localStorage.setItem("wallpaperUrl", bgUrl)
        document.querySelector(".desktop").style.backgroundImage = `url(${bgUrl})`
    }
    return (
        <div className="app settingsApp">
            <p>Wallpaper:</p>
            <input type="text" value={bgUrl} onChange={(e) => { setBgUrl(e.target.value) }} />
            <button onClick={setBg}>Set</button>
        </div>
    )
}