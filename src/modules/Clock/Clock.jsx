import "./Clock.css"
import { useEffect, useState } from "react"

export default function Clock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    })

    return (
        <p>
            {String(time.getHours()).padStart(2, "0")}:{String(time.getMinutes()).padStart(2, "0")}:{String(time.getSeconds()).padStart(2, "0")}
        </p>
    )
}