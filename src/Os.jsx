import Bar from "./modules/Bar/Bar"
import { Window } from "./modules/Window/Window"
import { AboutApp } from "./Apps/About/About"
import { Notes } from "./Apps/Notes/Notes"
import { SettingsApp } from "./Apps/Settings/Settings"
import { CalculatorApp } from "./Apps/Calculator/Calculator"
import { ImageViewer } from "./Apps/ImageViewer/ImageViewer"
import { MusicPlayer } from "./Apps/MusicPlayer/MusicPlayer"
import { SimpleShareBrowser } from "./Apps/SimpleShareBrowser/SimpleShareBrowser"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';


export default function Os() {
    const [windows, setWindows] = useState([])
    const [integration, setIntegration] = useState(false)


    async function checkSimpleShare() {
        if (!localStorage.getItem("simpleShareToken")) {
            setIntegration(false)
        } else {
            const token = localStorage.getItem("simpleShareToken")
            const result = await fetch("https://fs.cigoria.eu/verifySession", {
                method: "GET",
                headers: {
                    'authorization': token
                }
            })
            setIntegration(result.status == 200)
        }
    }

    const addWindow = (title, param = null) => {
        setWindows(prev => [...prev, { id: uuidv4(), title, param: param }]);
    };

    const handleRemoveWindow = (id) => {
        setWindows(prev => prev.filter(win => win.id !== id));
    };

    function returnOpenedApp(key, window) {
        switch (window.title) {
            case "About":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 350, y: 400 }}><AboutApp /></Window>)
            case "Notes":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 500, y: 400 }}><Notes /></Window>)
            case "Calculator":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 250, y: 320 }}><CalculatorApp /></Window>)
            case "Settings":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 350, y: 350 }}><SettingsApp integ={integration} setInteg={setIntegration} /></Window>)
            case "Image Viewer":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 600, y: 450 }}><ImageViewer dimensions={{ x: 600, y: 450 }} link={window.param} /></Window>)
            case "simpleShare":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 600, y: 450 }}><SimpleShareBrowser openWindowCommand={addWindow} /></Window>)
            case "Music Player":
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 350, y: 500 }}><MusicPlayer link={window.param} /></Window>)
            default:
                return (<Window title={window.title} onClose={(i) => { handleRemoveWindow(i) }} key={window.id} index={window.id} dimensions={{ x: 350, y: 500 }}></Window>)
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
    useEffect(() => {
        checkSimpleShare()
    }, [])

    return (
        <main>
            <Bar></Bar>
            <div className="desktop">
                <button onClick={() => { addWindow("About") }} className="openButton">
                    <img src="/info.webp" alt="info icon" />
                    <p>About</p>
                </button>
                <button onClick={() => { addWindow("Notes") }} className="openButton">
                    <img src="/notes.webp" alt="notes icon" />
                    <p>Notes</p>
                </button>
                <button onClick={() => { addWindow("Calculator") }} className="openButton">
                    <img src="/calculator.webp" alt="calculator icon" />
                    <p>Calculator</p>
                </button>
                <button onClick={() => { addWindow("Image Viewer") }} className="openButton">
                    <img src="/image.webp" alt="image viewer icon" />
                    <p>Images</p>
                </button>
                <button onClick={() => { addWindow("Music Player") }} className="openButton">
                    <img src="/music.webp" alt="Music player icon" />
                    <p>Music</p>
                </button>
                {integration && <button onClick={() => { addWindow("simpleShare") }} className="openButton">
                    <img src="/simpleShare.webp" alt="simpleShare icon" />
                    <p>simpleShare</p>
                </button>}
                <button onClick={() => { addWindow("Settings") }} className="openButton">
                    <img src="/settings.webp" alt="settings icon" />
                    <p>Settings</p>
                </button>
                {windows.map((window, index) => returnOpenedApp(index, window))}
            </div>
        </main>
    )
}
