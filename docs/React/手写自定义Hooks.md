# 手写自定义 Hooks

无论在工作中还是面试中难免会自定义 Hooks，像阿里的 [ahooks](https://ahooks.js.org/) 写的就很全，这里我写一下一些比较常见的 Hooks 代码

常见的自定义 Hooks：

- useRequest：模拟请求
- useSetState：管理 object 类型的 state 的 Hooks
- useDidMount：类似于类组件中的 `componentDidMount`，用于组件挂载后的操作

- useUnmount：类似于类组件中的 `componentWillUnmount`，用于组件卸载时的操作
- useDebounce：用于处理输入框内容的防抖处理，避免频繁触发请求
- useThrottle：用于限制某个函数的调用频率
- useLocalStorage：便捷地使用 `localStorage` 存储数据
- useEventListener：用于简化事件监听器的添加和清理
- useScroll：用于监测滚动位置的变化



## useRequest

```jsx
import { useState, useEffect } from 'react';

const useRequest = () => {
    
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
        	setError(null);
            
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error('Network response')
                }
                const result = await res.json()
                setData(result)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [url])
    
    return { data, loading, error }
}


// 使用
const MyComponent = () => {
 const { data, loading, error } = useRequest("https://localhost:3000/api")

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data fetched:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

比较成熟的请求 hooks：[swr](https://swr.vercel.app)

## useSetState

```jsx
import { useState } from 'react';

const useSetState = (initialState) => {
    const [state, setState] = useState(initialState)
    
    const setMergeState  = (key, value) => {
        setState((prev) => ({...prev, [key]: value }))
    }
    
    return [state, setMergeState]
}

// 使用
const MyComponent = () => {
  const [state, setState] = useSetState({
    name: 'johnny',
    age: 30,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProperty('name', event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProperty('age', parseInt(event.target.value, 10));
  };

  return (
    <div>
      <input type="text" placeholder="Name" value={state.name} onChange={handleNameChange} />
      <input type="number" placeholder="Age" value={state.age} onChange={handleAgeChange} />
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
    </div>
  );
};
```



## useDidMount

```jsx
import { useEffect } from 'react';

const useDidMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}

// 使用
const MyComponent = () => {
  useDidMount(() => {
    console.log('Component has mounted!');
  });

  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}; 
```





## useUnmount

```jsx
const { useEffect } from 'react';

const useUnmount = (callback) => {
    useEffect(() => {
        return () => {
            callback()
        }
    }, [])
}

// 使用
const MyComponent = () => {
  useUnmount(() => {
    console.log('Component has unmount!');
  });

  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}; 
```





## useDebounce

防抖

```jsx
import { useState, useEffect } from 'react';

const useDebounce = (stateValue, wait) => {
    const [val, setVal] = useState(stateValue)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVal(stateValue)
        }, wait)
        
        return () => {
            clearTimeout(timer)
        }
    }, [stateValue, wait])
    
    return val;
}


const MyComponent = () => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);
    
  return (
    <div>
      <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Typed value"
            style={{ width: 280 }}/>
        <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}; 
```



## useThrottle

节流：

```jsx
import { useRef, useEffect } from 'react';

const useThrootle = (func, wait) => {
   const lastCallRef = useRef(0);
    
    const throttledFunction = (...args) => {
        const now = Date.now();
        if (now - lastCallRef.current >= wait) {
            lastCallRef.current = now
            func(...args)
        }
    }
    return throttledFunction
}

// 使用
const MyComponent = () => {
  const handleScroll = useThrottle(() => {
    console.log('Scroll event triggered!');
  }, 1000); // 设置 1 秒的节流

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div style={{ height: '2000px', background: 'linear-gradient(#fff, #000)' }}>
      <h1>Scroll to see throttled events in action!</h1>
    </div>
  );
};

```



## useLocalStorage

```jsx
import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })
    
    const SetValue = (value) => {
        try {
            const valueToStore = 
                  value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
      		window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error)
        }
    }
    
    return [storedValue, setValue]
}
```



## useEventListener

```jsx
import { useEffect , useRef } from 'react';

const useEventListener = (eventName, handler, element = window) => {
    const savedHandle = useRef()
    
    useEffect(() => {
        savedHandle.current = handle
    }, [handle])
    
    useEffect(() => {
        const isSupported = element && element.addEventListener
        if (!isSupported) return;
        
        const eventListener = event => savedHandle.current(event)
        
       	element.addEventListener(eventName, eventListener);
        
     	// 清理函数，卸载时移除事件监听器
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element])
}


const MyComponent = () => {
  const handleScroll = () => {
    console.log('Scrolled!', window.scrollY);
  };

  useEventListener('scroll', handleScroll); // 添加滚动事件监听

  return (
    <div style={{ height: '2000px', background: 'linear-gradient(#fff, #000)' }}>
      <h1>Scroll down to see event listener in action!</h1>
    </div>
  );
};
```



## useScroll

```jsx
import { useEffect, useState } from 'react';

/**
 * 自定义 Hook，用于获取当前的滚动位置
 */
const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({ 
    scrollX: window.scrollX, 
    scrollY: window.scrollY 
  });

  const handleScroll = () => {
    setScrollPosition({ 
      scrollX: window.scrollX, 
      scrollY: window.scrollY 
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

// 使用
const MyComponent = () => {
  const { scrollX, scrollY } = useScroll(); // 使用自定义的滚动 Hook

  return (
    <div style={{ height: '2000px', background: 'linear-gradient(#fff, #000)' }}>
      <h1>Scroll to see scroll position!</h1>
      <p>Scroll X: {scrollX}</p>
      <p>Scroll Y: {scrollY}</p>
    </div>
  );
};
```

