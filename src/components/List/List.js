import React, { Component } from 'react';

import './list.css';

import ListItem from '../ListItem'

class List extends Component  {
    

    render() {
        const {posts, deletePost, onToggleImportant, onToggleLike} = this.props;

        const activeTasks = posts.filter(item => {
            return(item.important === false)
        });

        const complitedTasks = posts.filter(item => {
            return(item.important === true);
        });

        const allTasks = [...activeTasks,...complitedTasks].map(item => {
            return(
                <ListItem label={item.label} important={item.important}/>
            )
        });

        function isEmpty(obj) {
            for (let key in obj) {
              // если тело цикла начнет выполняться - значит в объекте есть свойства
              return false;
            }
            return true;
          }

        let postsItems = posts.map(item =>{
            const {id, ...itemProps} = item;
            if(typeof(item) === 'number' || typeof(item) === 'string' || isEmpty(item) ) return false
            return(
                <li className="list-group-item" 
                    key={item.id}
                    // key={id}
                    >
                    <ListItem 
                        label={item.label} 
                        important={item.important} 
                        like={item.like}
                        onDelete={() => {deletePost(item.id)}}
                        onToggleImportant={() => {onToggleImportant(id)}}
                        onToggleLike={() => {onToggleLike(id)}}
                        // {...itemProps}
                    />
                </li>
                
            )
        })
        return(
            <ul className="app-list list-group">
                {/* <ListItem label={this.props.label[0].label} important />
                <ListItem label='Going to do my homework'/>
                <ListItem label ='Fuck my girlfriend' important/> */}
                {/* {postsItems} */}
                {postsItems}
            </ul>
        )
    }
    
}


export default List;