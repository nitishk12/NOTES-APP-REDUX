import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class NoteShow extends React.Component {

    render() {
        return (
            <div>
                <h1 className="font-weight-bolder">Title -{this.props.note.title}</h1>
                <h2 className="font-weight-bolder">Description -{this.props.note.description}</h2>
                <button className="btn btn-warning "><Link to={`/notes/edit-note/${this.props.match.params.note}`} >Edit Note</Link></button>

                <button className="btn btn-dark "> <Link to='/notes'>back</Link></button>


            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.match.params.note)
    }
}

export default connect(mapStateToProps)(NoteShow)