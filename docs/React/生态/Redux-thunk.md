# Redux-thunk 源码分析

### redux-thunk 的源码

```javascript
function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) =>
        (next) =>
        (action) => {
            if (typeof action === 'function') {
                return action(dispatch, getState, extraArgument);
            }

            return next(action);
        };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
```

### 如何使用

```jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(
	reducer,
    applyMiddleware(thunk)
)
```

```javascript
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
    return {
        type: INCREMENT_COUNTER,
    };
}

function incrementAsync() {
    return (dispatch) => {
        setTimeout(() => {
            // 可以使用 `dispatch` 调用同步或异步操作
            dispatch(increment());
        }, 1000);
    };
}
```
