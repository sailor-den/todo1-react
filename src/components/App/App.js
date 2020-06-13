import React, { Component } from 'react';
import nextId from 'react-id-generator';
import { setPrefix } from 'react-id-generator';

import Header from '../Header';
import SearchPanel from '../SearchPanel';
import Filter from '../Filter';
import List from '../List';
import AddForm from '../AddForm';
import todoData from '../todoData';

import "./app.css";


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      todoItem: todoData,
      term: '' ,
      filter: 'all'
    };

    
    this.deletePost = this.deletePost.bind(this);
    this.filterPost = this.filterPost.bind(this);
  }

  deletePost  (id)  {
    // console.log('Deleted Post ' + id);
    // let index = this.state.todoItem.map(item => {
    //   return item.id
    // });
    // console.log(index)
    // index = index.indexOf(id)
    // console.log(index);

    // let {todoItem} = this.state;
    // let newArr = todoItem.splice(index, 1);
    

    // this.setState(state =>({
      
    //   todoItem: todoItem
    // }))
    // // return todoItem


    this.setState(state =>{
      // let {todoItem} = this.state;

    const index = this.state.todoItem.findIndex(item => item.id === id);
    console.log(index);

    const before = this.state.todoItem.slice(0, index);
    console.log(before)
    const after = this.state.todoItem.slice(index + 1);
    console.log(after)

    const newArr = [...before,...after]
      // todoItem: newArr
    

    return {
      todoItem : newArr
    }
    })
  }

  addPost = (body) => {
    // e.preventDefault();
    // console.log(body)
    setPrefix('post-id-');
    const id  = nextId();
    const newItem = {
      id: id,
      // id: `post-id-${(1 + Math.random()).toFixed(3)}`,
      label: body,
      important: false
  };
  console.log(newItem);

    this.setState(state => {
      const {todoItem} = this.state;
      const newArr = [...todoItem, newItem];
      // console.log(newItem)
      return {
        todoItem : newArr
      }
    })
  };

  onToggleImportant = (id) => {
    this.setState(({todoItem}) => {
      // const {todoItem} = this.state;
      const index = this.state.todoItem.findIndex(item => item.id === id);
      const old = todoItem[index];
      const newItem = {...old, important: !old.important}
      const before = todoItem.slice(0, index);
      const after = todoItem.slice(index + 1);
      const newArr = [...before, newItem, ...after];
      // console.log(newArr)

      return {
        todoItem : newArr
      }
    })
  }

  onToggleLike = (id) => {
    this.setState(({todoItem}) => {
      // const {todoItem} = this.state;
      const index = this.state.todoItem.findIndex(item => item.id === id);
      const old = todoItem[index];
      const newItem = {...old, like: !old.like}
      const before = todoItem.slice(0, index);
      const after = todoItem.slice(index + 1);
      const newArr = [...before, newItem, ...after];
      // console.log(newArr)
      return {
        todoItem : newArr
      }
    })
  }

  
  searchPost = (items, term) => {
    if(term.length === 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    });
  };

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost(items, filter) {
    if(filter === 'like') {
      return items.filter(item => item.like)
    } else {
      return items
    }
  };

  onFilterSelect = (filter) => {
    this.setState({filter})
  }


  render() {
    const {todoItem, term, filter} = this.state;
    // const allPosts = todoItem.map(item => item).length;
    const allPosts = todoItem.length;
    const liked = todoItem.filter(item => item.like === true).length;
    // console.log(liked)
    const visiblePosts = this.filterPost(this.searchPost(todoItem, term), filter);
    // const visiblePosts = this.searchPost(todoItem, term);
    console.log(visiblePosts)
    return(
      <div className="app"> 
        <Header 
          allPosts={allPosts}
          liked={liked}
        />
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}
          />
          <Filter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
            />
        </div>
        <List 
          posts={visiblePosts} 
          deletePost={(id) => {this.deletePost(id)}}
          onToggleImportant={this.onToggleImportant}
          onToggleLike={this.onToggleLike}
          />
        <AddForm 
          // addPost={(body) => {this.addPost(body)}}
             onAdd={this.addPost}
          />
      </div>
      
    )
  }
}