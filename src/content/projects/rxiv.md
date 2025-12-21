---
dateTime: 2025-06-11T00:00:00Z
title: "RXIV"
description: An experimental lightweight framework achieving fine-grained reactivity with RxJS observables—no virtual DOM, just pure reactive power.
slug: rxiv
draft: false
tags:
  - Framework
  - Reactivity
  - JSX
  - RxJS
  - Experimental
stack:
  - typescript
  - rxjs
  - vite
cover: "../assets/rxiv.png"
---

## Overview

rxRender (also known as RXIV) is an experimental, extremely lightweight JavaScript frontend framework created in June 2025. It leverages **RxJS** (specifically `BehaviorSubject` and observables) as its core reactive primitive to achieve fine-grained reactivity in both component props and DOM nodes.

The project was born as a personal experiment to explore what's possible when you strip away the complexity of modern frameworks and build directly on RxJS observables. The result is a framework that can build a fully functional Todo app in under 50 lines of code.

## Core Philosophy

rxRender was built around several key principles:

- **RxJS as the foundation**: State is managed via `BehaviorSubject`s, and UI is driven by subscribing to observables. No custom reactivity system needed.
- **Fine-grained reactivity**: Changes propagate only where needed, without diffing entire components or using a virtual DOM.
- **Minimalism**: Avoids the complexity of larger frameworks like React, focusing on JSX + direct observable subscriptions.
- **Future-proof**: Aligns with potential native browser Observables (a proposed TC39 feature).
- **VDOM-less**: Direct DOM manipulation driven by state updates, eliminating reconciliation overhead.
- **Performance First**: Optimized for high-frequency updates and complex UI interactions.

## Key Features

### Reactive Everything

- **Reactive props and text nodes**: Observable interpolation throughout your components
- **Reactive lists**: Built-in `<Each>` directive for efficient list rendering
- **Derived state**: Use RxJS operators like `map`, `filter`, and `switchMap` directly in JSX
- **Fine-grained updates**: Only affected DOM nodes re-render when observables change

### Developer Experience

- **JSX Support**: Familiar declarative syntax for building UIs
- **Vite Integration**: Seamless development experience with hot module replacement
- **TypeScript Ready**: Full type safety with typed store API
- **Minimal API Surface**: Learn the core concepts in minutes

### Advanced Features

- **Custom Store API**: NgRx-style state management with proxies and declarative pipelines
- **Control System**: Declarative event handling and form control
- **Observable Pipelines**: Compose complex state logic using RxJS operators

## Example: Minimal Todo App

This ~50-line Todo app demonstrates the framework's simplicity and power:

```tsx
import { BehaviorSubject, map } from 'rxjs';
import { rxRender, Each, rxCreateElement } from './framework';
import './style.css';

type Todo = { id: number, title: string, completed: boolean };

const todos$ = new BehaviorSubject<Todo[]>([
  { id: 1, title: 'Learn rxRender', completed: false }
]);
const newTodo$ = new BehaviorSubject<string>('');

const addItem = () => {
  todos$.next([
    ...todos$.value,
    {
      id: Date.now(),
      title: newTodo$.value,
      completed: false,
    }
  ]);
  newTodo$.next('');
};

const TodoInput = () => (
  <input
    type="text"
    value={newTodo$}
    oninput={(e: any) => newTodo$.next(e.target.value)}
  />
);

const TodosList = () => (
  <ul>
    <Each items${todos$}>
      {(item, index) => (
        <li>
          <span>{item.title}</span>
          <button
            onclick={() => todos$.next(
              todos$.value.filter((_, i) => i !== index)
            )}
          >
            Remove Todo
          </button>
        </li>
      )}
    </Each>
  </ul>
);

const App = () => (
  <div>
    <h1>Clean Architecture Example</h1>
    {TodoInput()}
    <button onclick={addItem}>Add Item</button>
    <hr />
    <h2>List Rendering</h2>
    {TodosList()}
    <hr />
    <h2>Remaining Todos</h2>
    {todos$.pipe(map(todos =>
      todos.filter(todo => !todo.completed).length
    ))}
    <p>This is a reactive expression</p>
  </div>
);

rxRender(<App />, document.getElementById('app')!);
```

### How It Works

- **State**: `todos$` and `newTodo$` are `BehaviorSubject`s holding current values
- **Input binding**: `value={newTodo$}` subscribes the input's value to the observable
- **List rendering**: `<Each items${todos$}>` reacts to changes in the todos array
- **Derived data**: Remaining count uses `.pipe(map(...))` directly in JSX
- **Mounting**: `rxRender` handles initial render and subscriptions

## Advanced Feature: Store API

For more structured state management, rxRender includes a full store API with typed reducers and proxy-based reactivity:

```tsx
import { rxCreateElement, Each } from './framework';
import { control } from './framework/core/control';
import { store } from './framework/utils/store';
import { filter, from, map, merge, switchMap } from 'rxjs';

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

const viewControl = control({
  events: ['keypress'],
  values: {
    event: 'change',
    prop: 'value',
    initialValue: ''
  }
})

const addTodoBtnControl = control({ events: ['click'] })

const addTodos$ = merge(
  addTodoBtnControl.events.click$,
  viewControl.events.keypress$.pipe(
    filter((event: any) => event.key === 'Enter')
  )
)

const loadTodos$ = btnControl.events.click$.pipe(
  switchMap(() => from(
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then((todos) => todos.filter((_, idx) => idx < 10))
  ))
)

const todosStore = store(
  { todos: [] as Todo[], newTodo: '' },
  {
    removeTodo: ({ todos }, { idx }) => ({
      todos: todos.filter((_, i) => i !== idx)
    }),
    onAddTodos: ({ newTodo, todos }) => {
      const todoItem = {
        completed: false,
        id: todos.length,
        title: newTodo,
        userId: 123
      };
      return { newTodo: '', todos: [todoItem, ...todos] }
    },
    onFieldControl: (value$) => ({ newTodo: value$ }),
    onLoadTodos: ({ todos }, newTodos) => ({
      todos: [...todos, ...newTodos]
    }),
  }
);

const todosCount$ = todosStore.context.todos$.pipe(
  map(todos => todos.length)
)

function TodoItem(todo: Todo, idx: number) {
  return (
    <>
      <button onclick={() => todosStore.removeTodo({ idx })}>
        x
      </button>
      <span>{todo.title}</span>
    </>
  )
}

export const Todos = () => {
  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input
          type="text"
          value={todosStore.context.newTodo$}
          control={viewControl}
        />
        <button control={addTodoBtnControl}>Add todo</button>
      </div>
      <button control={btnControl}>Load Todos</button>
      <ul>
        <Each items${todosStore.context.todos$}
          fallback={<p>No todos here</p>}
        >
          {TodoItem}
        </Each>
      </ul>
      <p>Count: {todosCount$}</p>
    </div>
  )
}
```

### Store API Highlights

- **Typed state management**: `store(initialState, reducers)` creates a typed, proxy-based store
- **Observable reducers**: Reducers can depend on observables for complex async logic
- **Full reactivity**: No manual selectors needed—everything is reactive by default
- **Declarative pipelines**: Compose complex state logic using RxJS operators
- **Control system**: Declarative event handling with the `control` API

## Technical Architecture

### How Fine-Grained Reactivity Works

Unlike React's virtual DOM diffing or Svelte's compile-time reactivity, rxRender achieves fine-grained updates through direct observable subscriptions:

1. **Observable binding**: When you use `{observable$}` in JSX, rxRender creates a subscription
2. **Direct DOM updates**: When the observable emits, only the specific DOM node is updated
3. **No reconciliation**: No diffing algorithm needed—RxJS handles change propagation
4. **Memory efficient**: Subscriptions are cleaned up when components unmount

### Why RxJS?

RxJS provides a battle-tested reactive foundation with:

- Powerful operators for transforming data streams
- Built-in memory management and subscription cleanup
- Alignment with potential native browser Observables
- Familiar API for developers already using RxJS

## Project Status

rxRender remains an experimental proof-of-concept demonstrating that powerful fine-grained reactivity can be achieved with minimal code using RxJS directly. It appeals to RxJS enthusiasts seeking alternatives to dominant frameworks while proving that simplicity and power aren't mutually exclusive.

The framework showcases what's possible when you embrace observables as a first-class primitive and build your UI layer directly on top of them, without the abstractions and complexity of traditional frameworks.
