import React, { Component } from 'react';

import './addForm.css';


class AddFrom extends Component {
    constructor(){
        super();
        this.state = {
            inputValue: ''
        }
    }

    onValueChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            
            inputValue: e.target.value
        })
    }

    addPost = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.inputValue);
        this.setState({inputValue: ''})
    }

    render(){

        // const {addPost} = this.props;
        const {inputValue} = this.state;
        return (
            <form className="bottom-panel d-flex"
                   onSubmit={this.addPost}
                   >
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас"
                    className="form-control new-post-label"
                    value={inputValue}
                    onChange={this.onValueChange}
                
                />
                <button
                    // onClick={this.addPost}
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить</button>
            </form>
        )
    }
    
}

export default AddFrom;