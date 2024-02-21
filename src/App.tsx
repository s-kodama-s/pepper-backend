import './App.css';
import { submitWav, isWav } from './Wav';
import { useState } from 'react';

function App() {
  const [data, setData] = useState<string>('');
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (!files || files?.length === 0) return;
    const file = files[0];
    console.log(file);

    const getResText = async () => {
      if (isWav(file.name)) {
        const res = await submitWav(file.name);
        console.log(res);
        setData(res);
      } else {
        alert('It is not wav');
      }
    };
    getResText();
  };

  return (
    <>
      <h2>ペッパーくんに物申す</h2>
      <div>
        <input type="file" accept=".wav" aria-label="uploadfile" onChange={handleOnChange} />
      </div>
      <p>{data}</p>
    </>
  );
}

export default App;
