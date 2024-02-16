import './App.css';
import { submitWav, isWav } from './Wav';

const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.currentTarget.files;
  if (!files || files?.length === 0) return;
  const file = files[0];
  console.log(file);

  if (isWav(file.name)) {
    submitWav(file.name);
  } else {
    alert('It is not wav');
  }
};

function App() {
  return (
    <>
      <h2>ペッパーくんに物申す</h2>
      <div>
        <input type="file" accept=".wav" aria-label="uploadfile" onChange={handleOnChange} />
      </div>
    </>
  );
}

export default App;
