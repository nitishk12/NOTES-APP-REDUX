import React from 'react'
import NoteForm from './NoteForm'
import { Container } from 'reactstrap'
import { startEditNote } from '../../actions/notesAction'
import { connect } from 'react-redux'



class EditNote extends React.Component {

    headerStyle = {
        textAlign: "center"
    }

    handleSubmitNote = (formDate) => {
        const redirect = () => this.props.history.push(`/notes/note-detail/${this.props.match.params.note}`)
        this.props.dispatch(startEditNote(this.props.match.params.note, formDate, redirect))
    }

    render() {

        return (
            <div>
                <br></br>
                <NoteForm handleSubmitNote={this.handleSubmitNote} note={this.props.match.params.note} />

            </div>
        )
    }
}

export default connect()(EditNote)