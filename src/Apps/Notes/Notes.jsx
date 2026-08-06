import "./Notes.css"
import { useEffect, useState } from "react"

export function Notes() {
    const [notes, setNotes] = useState([])
    const [currentNoteIndex, setCurrentNoteIndex] = useState(null)
    function loadNotes() {
        if (!localStorage.getItem("notes")) {
            localStorage.setItem("notes", JSON.stringify([]))
        } else {
            setNotes(JSON.parse(localStorage.getItem("notes") || "[]"))
        }
    }
    async function addNote() {
        const newNote = { title: "Untitled Note", text: "" }
        const updatedNotes = [...notes, newNote]
        await setNotes(updatedNotes)
        console.log(notes)
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
    }

    useEffect(() => {
        loadNotes()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        const updatedNotes = [...notes]
        if (currentNoteIndex !== null) {
            updatedNotes[currentNoteIndex][name] = value;
        }
        setNotes(updatedNotes)
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
    }

    async function deleteNote() {
        const updatedNotes = [...notes]
        if (currentNoteIndex !== null) {
            updatedNotes.splice(currentNoteIndex, 1)
            setCurrentNoteIndex(null)
            setNotes(updatedNotes)
            localStorage.setItem("notes", JSON.stringify(updatedNotes))
        }
    }

    return (
        <div className="app notesApp">
            <div className="sideBar">
                <button onClick={addNote}>+</button>
                <hr />
                {notes.map((note, index) => (
                    <button onClick={() => { setCurrentNoteIndex(index) }}>
                        {note.title}
                    </button>
                ))}
            </div>
            <div className="editorArea">
                {(currentNoteIndex !== null) ?
                    <>
                        <div className="controls">
                            <input type="text" placeholder="Title..." name="title" onChange={handleChange} value={notes[currentNoteIndex].title} />
                            <button onClick={deleteNote}>Delete</button>
                        </div>
                        <textarea name="text" placeholder="Type here..." onChange={handleChange} value={notes[currentNoteIndex].text}></textarea>
                    </>
                    : null}
            </div>
        </div>
    )
}