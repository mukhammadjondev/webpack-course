import { useState } from 'react';
import { Filter } from '../components/filter';

import './app.scss';

export const App = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(prev => prev + 1);

  return (
    <div>
      <Filter />

      <h1>Counter: {counter}</h1>

      <button onClick={increment}>Increment</button>
    </div>
  );
};
