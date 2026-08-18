import { useEffect, useRef, useState } from "react"
import { parseBlob } from "music-metadata"
import "./MusicPlayer.css"

export function MusicPlayer(props) {
    const [mode, setMode] = useState("open")
    const [link, setLink] = useState("")
    const [cover, setCover] = useState("")
    const [metadata, setMetadata] = useState({ title: "", artist: "", year: "" })
    const [isPlaying, setIsPlaying] = useState(false)

    const playerRef = useRef(null)
    const scrubberRef = useRef(null)
    const timeDispRef = useRef(null)

    async function getData() {
        const response = await fetch(link)
        if (!response.ok) {
            throw new Error("Failed to fetch audio file")
        }
        const metadata = await parseBlob(await response.blob())
        const picture = metadata.common.picture?.[0]

        setMetadata({
            title: metadata.common.title || response.headers.get("Content-Disposition").match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1].replace(/['"]/g, ""),
            artist: metadata.common.artist || "Unknown artist",
            year: metadata.common.year || "Unknown"
        })

        if (!picture) return null
        const coverBlob = new Blob(
            [picture.data],
            { type: picture.format }
        )
        const url = URL.createObjectURL(coverBlob)
        setCover(url)
    }

    const handleFile = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const metadata = await parseBlob(file)
        const picture = metadata.common.picture?.[0]
        if (picture) {
            const blob = new Blob(
                [picture.data],
                { type: picture.format }
            )
            const url = URL.createObjectURL(blob)
            setCover(url)
        } else {
            setCover(null)
        }
    }

    const onLoad = () => {
        timeDispRef.current.innerText = `${Math.floor(playerRef.current.currentTime / 60)}:${String(Math.floor(playerRef.current.currentTime % 60)).padStart(2, "0")} / ${Math.floor(playerRef.current.duration / 60)}:${String(Math.floor(playerRef.current.duration % 60)).padStart(2, "0")}`
        scrubberRef.current.max = playerRef.current.duration;

        playerRef.current.addEventListener('timeupdate', () => {
            scrubberRef.current.value = playerRef.current.currentTime;
            timeDispRef.current.innerText = `${Math.floor(playerRef.current.currentTime / 60)}:${String(Math.floor(playerRef.current.currentTime % 60)).padStart(2, "0")} / ${Math.floor(playerRef.current.duration / 60)}:${String(Math.floor(playerRef.current.duration % 60)).padStart(2, "0")}`
        });
    }

    return (
        <div className="app musicPlayerApp">
            {mode == "open" && <div className="open">
                <input type="file" onChange={(e) => { setLink(prev => (e.target.files ? URL.createObjectURL(e.target.files[0]) : prev)); handleFile(e) }} />
                <p>or</p>
                <input type="text" placeholder="simpleShare code" onChange={(e) => { setLink("https://fs.cigoria.eu/files/" + e.target.value); }} />
                <button onClick={() => {
                    setMode("play");
                    getData()
                }}>Open</button>
            </div>}
            {mode == "play" && <div className="play" onLoad={onLoad}>
                <img src={cover || "defaultCover.webp"} alt="Cover art" />
                <audio ref={playerRef}>
                    <source src={link} />
                    Music unsupported
                </audio>
                <h3>{metadata.title}</h3>
                <h4>{metadata.artist}</h4>
                <h5>{metadata.year}</h5>
                <div className="controls">
                    <button onClick={() => {
                        if (playerRef.current.paused) {
                            playerRef.current.play()
                            setIsPlaying(true)
                        } else {
                            playerRef.current.pause()
                            setIsPlaying(false)
                        }
                    }}>{!isPlaying ? <img src="play.webp" /> : <img src="pause.webp" />}</button>
                    <input className="scrubber" type="range" ref={scrubberRef} onChange={(e) => { playerRef.current.currentTime = e.target.value }} defaultValue={0} />
                    <button onClick={() => {
                        setMode("open")
                        setIsPlaying(false)
                        setMetadata({ title: "", artist: "", year: "" })
                        setLink("")
                    }}>
                        <img src="open.webp" />
                    </button>
                </div>
                <p ref={timeDispRef}></p>
            </div>}
        </div>
    )
}