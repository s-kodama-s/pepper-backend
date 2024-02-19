export async function submitWav(fname: string): Promise<void> {
  const formData = new FormData();
  formData.append('file', fname);

  console.log('request body: ', formData);
  for (let d of formData.entries()) {
    console.log(`${d[0]}: ${d[1]}`);
  }

  try {
    fetch('https://examplexxx.com/uploadxxx', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('File uploaded successfully:', response);
      })
      .catch((reason) => {
        console.error('File upload failed:', reason);
      });
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

export const isWav = (fname: string): boolean => {
  const arr = fname.split('.');
  return 'wav' === arr[arr.length - 1];
};
