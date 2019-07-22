import { useState } from 'preact/hooks';
import Axios from 'axios';
import { Form, ResultBox } from '../components/views';

const Index = () => {
  const [result, setResult] = useState(null);

  const createUser = async ({ values }) => {
    if (process.env.NODE_ENV === 'development') {
      setResult(values);
    } else {
      try {
        const res = await Axios.post('/api/users/create', values);
        setResult(res.data.result);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gridGap: '10px' }}>
      <h1>Hello World</h1>
      <p>Running on Preact X with Next.js!</p>
      <Form
        fields={[
          {
            type: 'text',
            name: 'username',
          },
          {
            type: 'password',
            name: 'password',
          },
        ]}
        onSubmit={createUser}
      />
      {result && <ResultBox result={result} />}
    </div>
  );
};

export default Index;
