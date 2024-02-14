import './App.css';
import { useState } from 'react';

const isWav = (name: string): boolean => {
  const arr = name.split('.');
  return 'wav' === arr[arr.length - 1];
};

async function submitWav(fname: string): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('file', fname);

    const response = await fetch('https://examplexxx.com/uploadxxx', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('File uploaded successfully:', responseData);
    } else {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

function App() {
  const [name, setName] = useState<string>();

  return (
    <>
      <p>Hello world!</p>
      <div>
        <input
          type="file"
          accept=".wav"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.currentTarget.files;
            if (!files || files?.length === 0) return;
            const file = files[0];
            setName(file.name);
            submitWav(file.name);
          }}
        />
        <br />
        {name ? (isWav(name) ? "it's wav" : "it's not wav") : null}
      </div>
    </>
  );
}

export default App;
