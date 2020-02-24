import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRemoveNote } from '../../actions/notesAction'
import Swal from 'sweetalert2'

function NoteList(props) {

    const handleRemoveNote = (id) => {
        Swal.fire({
            title: 'Do you want to remove?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.value) {
                props.dispatch(startRemoveNote(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <h2> Notes - {props.notes.length}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th> title </th>
                        <th> action </th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.notes.map(note => {
                            return (
                                <tr key={note._id}>
                                    <td>{note.title}</td>
                                    <td><Link to={`/notes/note-detail/${note._id}`} ><button className="btn btn-success">view detail</button></Link></td>
                                    <td><button className="btn btn-danger" onClick={() => handleRemoveNote(note._id)} >remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/notes/add-notes" ><button className="btn btn-primary">Add Note</button></Link>
        </div>
    )
}

const mapstatetoProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapstatetoProps)(NoteList)