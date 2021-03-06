import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesContext from '../context/notes/NotesContext'
import NoteItem from './NoteItem';
import Spinner from "./Spinner";
import { useHistory } from 'react-router-dom'

export default function Notes(props) {
    let history = useHistory()
    const context = useContext(NotesContext)
    const { notes,loadingStatus, fetchAllNotes, editNote } = context;
    const  {alertRef ,setAlertMessage ,setAlertType} = props;
    useEffect(() => {
        if(localStorage.getItem("auth-token")){
            fetchAllNotes()
        }else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [currentENote, setCurrentENote] = useState({ id: "", etitle: "", edescription: "", etags: "" })
    const updateNote = (note) => {
        ref.current.click()
        setCurrentENote({ id: note._id, etitle: note.title, edescription: note.description, etags: note.tags })
    }
    const editNoteHandler = (e) => {
        editNote(currentENote.id, currentENote.etitle, currentENote.edescription, currentENote.etags)
        setAlertType('success')
        setAlertMessage('Note Updated')
        refClose.current.click()
        setTimeout(() => {
            alertRef.current.click()
        }, 160);
    }
    const onChange = (e) => {
        setCurrentENote({ ...currentENote, [e.target.name]: e.target.value })
    }
    return (
        <>
            {/* Modal Button */}
            <button type="button" style={{ display: "none" }} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update the Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group my-2">
                                <input type="text" className="form-control" onChange={onChange} id="etitle" name="etitle" value={currentENote.etitle} placeholder="Note Title" />
                            </div>
                            <div className="form-group my-2">
                                <textarea className="form-control" onChange={onChange} id="edescription" name="edescription" value={currentENote.edescription} placeholder="Enter new Details here....." rows="2"></textarea>
                            </div>
                            <div className="form-group my-2">
                                <input type="text" className="form-control" onChange={onChange} id="etags" name="etags" value={currentENote.etags} placeholder="Tags Goes here" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={editNoteHandler} disabled={currentENote.etitle.length===0 || currentENote.edescription.length===0 } className="btn save-btn">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal  */}
            <div className="row mx-5 my-3 notes-container">
                <h2>Your Notes</h2>
                <div className="container text-center my-3">
                    {loadingStatus && <Spinner />}
                    {(notes.length === 0 && !loadingStatus) && 'Notes Are Empty'}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} alertRef={alertRef} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
                    })
                }
            </div>
        </>
    )
}
