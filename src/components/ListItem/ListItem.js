import React, { Component } from 'react';

import './list-item.css';

class ListItem extends Component {
   
    render() {
        const {label, onDelete, onToggleImportant, onToggleLike, important, like} = this.props;
        // const {important, like} = this.state;
        let classNames = "app-list-item d-flex justify-content-between" + (important ? " important" : "") + (like ? " like" : "");

    return (
        <div className={classNames}>
            <span className="app-list-item-label" onClick={onToggleLike}>
                {label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button 
                    type="button" 
                    className="btn-star btn-sm"
                    onClick={onToggleImportant}
                    >
                    <i className="fa fa-star"></i>
                </button>
                <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
                    <i className="fa fa-trash-o"></i>
                </button>
                <i className="fa fa-heart"></i>
            </div>
        </div>
    )
    }
    
}

export default ListItem;