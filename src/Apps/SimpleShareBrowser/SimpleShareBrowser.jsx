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

    const [selectedFile, setSelectedFile] = useState(null)

    async function uploadFile(e) {
        e.preventDefault()
        if (selectedFile) {
            const formData = new FormData()
            formData.append("file", selectedFile)
            const result = await fetch("https://fs.cigoria.eu/upload", {
                method: "POST",
                headers: {
                    'authorization': localStorage.getItem("simpleShareToken") || ""
                },
                body: formData
            })
            if (result.status == 200) {
                loadFiles()
                setSelectedFile(null)
                e.target.reset()
            } else {
                if (result.status == 413) {
                    alert("Not enough quota!")
                }
            }
        }
    }

    return (
        <div className="app simpleShareBrowserApp">
            <form onSubmit={uploadFile}>
                <input type="file" onChange={(e) => { setSelectedFile(e.target.files?.[0] || null) }} />
                <input type="submit" value="Upload" />
            </form>
            <div className="files">
                {files.map((item) => {
                    if (item.type == "file") {
                        return (
                            <FileComponent item={item} open={props.openWindowCommand} key={item.code} reloadAll={loadFiles} />
                        )
                    } else {
                        return (
                            <FolderComoponent item={item} open={props.openWindowCommand} key={item.code} reloadAll={loadFiles} />
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
                    <FileComponent item={file} open={props.open} key={file.code} reloadAll={props.reloadAll} />
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

    async function deleteFile() {
        const result = await fetch(`https://fs.cigoria.eu/delete/${props.item.code}`, {
            method: "GET",
            headers: {
                'authorization': localStorage.getItem("simpleShareToken") || ""
            }
        })
        if (result.status == 200) {
            props.reloadAll()
        }
    }

    return (
        <div className="fileComponent">
            <div>
                <img src="file.webp" />
                <p>{props.item.original_name}</p>
            </div>
            <div>
                <button onClick={openFile}>{(String(props.item.mimetype).includes("image") || String(props.item.mimetype).includes("audio")) ? "Open" : "Download"}</button>
                <button onClick={deleteFile}><img src="delete.webp" alt="Delete icon" /></button>
            </div>
        </div>
    )
}
