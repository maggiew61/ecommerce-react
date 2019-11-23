import React from 'react';
class createPost extends React.Component {
    state = {
        title: '',
        description: ''
    };
    addItem = () => {
        if(this.state.title.trim() && this.state.description.trim()){
            this.props.clicked(this.state.title, this.state.description) 
            this.setState({ 
                title: '',
                description: ''
            });    
        }else{
            alert('Both fields are required')
        }
    }
    // https://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler/22130422
    handleInputChange = e => {
        this.setState({
            // https://stackoverflow.com/questions/50376353/wy-we-need-to-put-e-target-name-in-square-brackets
            [e.target.name]: e.target.value
        });
    };    
    render() {
        return (
            <div>
                <input name="title" placeholder="title" onChange={this.handleInputChange} value={this.state.title} />
                <textarea name="description" placeholder="description" onChange={this.handleInputChange} value={this.state.description} />
                <button onClick={this.addItem}>add new</button>
            </div>
        )
    }
}
export default createPost;