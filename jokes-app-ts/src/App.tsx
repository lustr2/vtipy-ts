import { useState } from 'react'
import './App.css'
import { Form, FormDataStructure } from './components/Form';
import { Joke } from './components/Joke';

import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
//import sourceOfJokes from './source/jokes-data.js';

export interface DataJoke {
  type: string;
  setup: string;
  punchline: string;
};

function App() {
//  const sourceOfJokes = require('./source/jokes-data.js');

  const sourceOfJokes: DataJoke[] = [
    { "type": "general",
      "setup": "What did the fish say when it hit the wall?",
      "punchline": "Dam."
    },
    {
      "type": "general",
      "setup": "How do you make a tissue dance?",
      "punchline": "You put a little boogie on it."
    },
    {
      "type": "knock-knock",
      "setup": "Knock knock. \n Who's there? \n Little old lady. \n Little old lady who?",
      "punchline": "I didn't know you could yodel!"
    },
    {
      "type": "programming",
      "setup": "What's the best thing about a Boolean?",
      "punchline": "Even if you're wrong, you're only off by a bit."
    },
    {
      "type": "dad",
      "setup": "Why do fathers take an extra pair of socks when they go golfing?",
      "punchline": "In case they get a hole in one!"
    },
    {
      "type": "general",
      "setup": "Why can't bicycles stand on their own?",
      "punchline": "They are two tired"
    }];

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
