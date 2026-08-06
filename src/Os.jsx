import Bar from "./modules/Bar/Bar"
import { Window } from "./modules/Window/Window"
import { useState } from "react"

export default function Os() {
    const [windows,setWindows] = useState([])

    return (
        <>
            <Bar></Bar>
            
            <Window></Window>
        </>
    )
}