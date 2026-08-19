import { use, useEffect, useState } from "react"
import "./Settings.css"
import { resume } from "react-dom/server"


export function SettingsApp(props) {
    const [bgUrl, setBgUrl] = useState(localStorage.getItem("wallpaperUrl"))
    function setBg() {
        localStorage.setItem("wallpaperUrl", bgUrl)
        document.querySelector(".desktop").style.backgroundImage = `url(${bgUrl})`
    }

    async function simpleShareLogin(e) {
        e.preventDefault()
        const result = await fetch("https://fs.cigoria.eu/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.elements[0].value,
                password: e.target.elements[1].value
            })
        })
        if (result.status == 200) {
            const jsonResult = await result.json()
            localStorage.setItem("simpleShareToken", jsonResult.token)
            props.setInteg(true)
        }
    }

    async function simpleShareLogout() {
        const result = await fetch("https://fs.cigoria.eu/logout", {
            method: "GET",
            headers: {
                'authorization': localStorage.getItem("simpleShareToken")
            }
        })
        if (result.status == 200) {
            localStorage.removeItem("simpleShareToken")
            props.setInteg(false)
        }
    }

    return (
        <div className="app settingsApp">
            <p>Wallpaper:</p>
            <input type="text" value={bgUrl} onChange={(e) => { setBgUrl(e.target.value) }} />
            <button onClick={setBg}>Set</button>
            <hr />
            <div className="simpleShareIntegration">
                <p>simple<span>Share</span></p>
                {!props.integ &&
                    <form action="" onSubmit={simpleShareLogin}>
                        <input type="username" placeholder="username" required />
                        <input type="password" placeholder="password" required />
                        <input type="submit" value="Login" />
                    </form>
                }
                {props.integ && <button onClick={simpleShareLogout}>Disable integration</button>}
            </div>
        </div>
    )
}