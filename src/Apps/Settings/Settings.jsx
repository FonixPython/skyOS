import { use, useEffect, useState } from "react"
import "./Settings.css"
import { resume } from "react-dom/server"


export function SettingsApp() {
    const [bgUrl, setBgUrl] = useState(localStorage.getItem("wallpaperUrl"))
    const [integration, setIntegration] = useState(false)
    function setBg() {
        localStorage.setItem("wallpaperUrl", bgUrl)
        document.querySelector(".desktop").style.backgroundImage = `url(${bgUrl})`
    }

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
            setIntegration(true)
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
            setIntegration(false)
        }
    }

    useEffect(() => { checkSimpleShare() }, [])

    return (
        <div className="app settingsApp">
            <p>Wallpaper:</p>
            <input type="text" value={bgUrl} onChange={(e) => { setBgUrl(e.target.value) }} />
            <button onClick={setBg}>Set</button>
            <hr />
            <div className="simpleShareIntegration">
                <p>simple<span>Share</span></p>
                {!integration &&
                    <form action="" onSubmit={simpleShareLogin}>
                        <input type="username" placeholder="username" required />
                        <input type="password" placeholder="password" required />
                        <input type="submit" value="Login" />
                    </form>
                }
                {integration && <button onClick={simpleShareLogout}>Disable integration</button>}
            </div>
        </div>
    )
}