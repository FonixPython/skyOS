import { useEffect, useState } from "react"
import "./SimpleShareBrowser.css"

export function SimpleShareBrowser(props) {
    const [files, setFiles] = useState([])

    async function loadFiles() {
        const result = await fetch("https://fs.cigoria.eu/getAllFiles", {
            method: "GET",
            headers: {
                'authorization': localStorage.getItem("simpleShareToken") || ""
            }
        })
        if (result.status == 200) {
            const resultJson = await result.json()
            console.log(resultJson)
            setFiles(resultJson)
        }
    }

    useEffect(() => {
        loadFiles()
    }, [])

    return (
        <div className="app simpleShareBrowserApp">
            <div className="files">
                {files.map((item) => {
                    if (item.type == "file") {
                        return (
                            <FileComponent item={item} open={props.openWindowCommand} />
                        )
                    } else {
                        return (
                            <FolderComoponent item={item} open={props.openWindowCommand} />
                        )
                    }
                })}
            </div>
        </div>
    )
}

function FolderComoponent(props) {
    const [open, setOpen] = useState(false)
    return (
        <div className="folderComponent">
            <div className="collapseControls">
                <div>
                    <img src="folder.webp" />
                    <p>{props.item.name}</p>
                </div>
                <button onClick={() => { setOpen(!open) }}><img src="dropDown.png" /></button>
            </div>
            {open && <div className="content">
                <hr />
                {props.item.files.map((file) => (
                    <FileComponent item={file} open={props.open} />
                ))}
            </div>}
        </div>
    )
}

function FileComponent(props) {
    function openFile() {
        console.log(props.item.mimetype)
        if (String(props.item.mimetype).includes("image")) {
            props.open("Image Viewer", `https://fs.cigoria.eu/files/${props.item.code}`)
        } else if (String(props.item.mimetype).includes("audio")) {
            props.open("Music Player", `https://fs.cigoria.eu/files/${props.item.code}`)
        } else {
            const link = document.createElement("a");
            link.href = `https://fs.cigoria.eu/files/${props.item.code}`
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <div className="fileComponent">
            <div>
                <img src="file.webp" />
                <p>{props.item.original_name}</p>
            </div>
            <button onClick={openFile}>Open</button>
        </div>
    )
}
