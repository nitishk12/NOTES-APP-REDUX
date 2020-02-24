import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryView extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.category.name}</h2>
                <br></br>
                <Link to={`/categories/category-edit/${this.props.match.params.category}`} ><button className="btn btn-warning" >edit category</button></Link>
                <Link to='/categories'><button className="btn btn-dark">back</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(cat => cat._id == props.match.params.category)
    }
}

export default connect(mapStateToProps)(CategoryView)