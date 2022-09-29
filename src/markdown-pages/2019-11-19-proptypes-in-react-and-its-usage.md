---
title: PropTypes in React and its Usage
date: "2022-09-19"
thumbnail: "../thumbnails/react.png"
subject: React
topic: React PropTypes
topicIndex: 1
keywords:
  - React Proptypes
  - React Proptypes Usage  
slug: proptypes-in-react-and-its-usage
---

We can use Proptypes to document what type of props our component expects. React will call checkProptypes() to check props passed against the definition provided and warns during development if they don’t match.


## Install
```js
npm install --save prop-types
```
## Why to use ?

Consider below react component that will render todo list. It iterates over the list of todo it received from props and in each iteration it passes id and title to the Todo component.

```js
import React from 'react';
import {Todo} from './todo';

class TodoList extends React.Component {
    render() {
        return this.props.todoItems.map(({
            id, title
        }) => {
            return (<Todo
                id={id}
                title={title}
            />);
        });
    }
}

export default TodoList;
```


TodoList component does not explicitly defines the type of todolist array it needs. Anyone can pass anything like below:

- `todos = [ “1st todo”, “2st todo”,”3rd todo” ]; 
 <TodoList todoItems={todos}/>`   //passed array of string

- `<TodoList todoItems=”My todo”/>` //passed a string
- `<TodoList/>` //passed nothing

 


So in this case it might be possible that some javascript errors might thrown. Like second case map on todoItems which is string by the way will cause
```js
Uncaught TypeError: this.props.todoItems.map is not a function 
```

As a developer before using any component below questions comes to our mind.

    - which props needed to pass ?
    - type of props ?
    - Is it required ? Optional ?
    - Structure/Shape of item if its a collection type ?

So its better to provide proptypes which developer can quickly refer. 

## Import and Use
```js
import React from 'react';
import {Todo} from './todo';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
    render() {
        return this.props.todoItems.map(({
            id, title
        }) => {
            return (<Todo
                id={id}
                title={title}
            />);
        });
    }
}

TodoList.propTypes = {
    todoItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired
};
export default TodoList;
```


So what we did is that we imported Proptypes and defined todoItems prop is of array type. Also we provided shape of array item. isRequired is used to tell that a field is required or not. 

In development mode  react call checkPropTypes() and if provided Proptypes definitions and props passed does not match then warning is displayed in console.

Example. when required prop is not passed console warns
 `Prop is marked as required in component, but its value is undefined`

## Centralized Proptypes

In production application it might possible that proptypes definition consumes more lines of code. In that case you can define proptypes for components in a separate file like below.

types.js

```js
import PropTypes from 'prop-types';

export default todoListPropTypes = {
    todoItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired
};
```
Import propTypes and use in component.

TodoList.js

```js
import React from 'react';
import {Todo} from './todo';
import todoListPropTypes from './types';

class TodoList extends React.Component {
    render() {
        return this.props.todoItems.map(({
            id, title
        }) => {
            return (<Todo
                id={id}
                title={title}
            />);
        });
    }
}

TodoList.propTypes = {
    ...todoListPropTypes
};
export default TodoList;
```


Read official doc for more https://github.com/facebook/prop-types

