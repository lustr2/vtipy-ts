import { useState } from 'react'
import './App.scss'
import { Form, FormDataStructure } from './components/Form';
import { Joke } from './components/Joke';

import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { sourceOfJokes } from './source/jokes-data';

export interface DataJoke {
  type: string;
  setup: string;
  punchline: string;
};

function App() {

  const [userName, setUserName] = useState('');
  const [jokesData, setJokesData] = useState<DataJoke[]>([]);
  
  const generateJokesData = (type:string, count:number, source: DataJoke[]) => {
    const data = [...source];
    setJokesData(data
      .filter(item => item.type === type)
      .map((item, index) => ({...item, 'id': index}))
      .slice(0, count));
  };

  const handleSendData = (data: FormDataStructure ) => {
    setUserName(data.name);
    // fetchData(data.type, data.count);
    generateJokesData(data.type, data.count, sourceOfJokes);
  };

  return (
    <div className="app">
    {jokesData.length > 0 ? (
        <div className="app__container">
          <h2>{userName}</h2>
          <h3>There are jokes for you!</h3>
          {jokesData.map((item:DataJoke) => <Joke key={item.setup} setup={item.setup} punchline={item.punchline} showRating={false} />)}
          <span className='app__container__back-icon' onClick={() => setJokesData([])}><ArrowUturnLeftIcon /></span>
        </div>
      ) : (
        <div className="app__container">
          <h2>Welcome to jokes generator</h2>
          <h3>Please fill the form:</h3>
          <Form onSubmitData={handleSendData} />
        </div>
      )
    }
  </div>
  )
}

export default App;
