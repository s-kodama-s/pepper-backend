export async function submitWav(fname: string): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('file', fname);

    console.log('request body: ', formData);
    for (let d of formData.entries()) {
      console.log(`${d[0]}: ${d[1]}`);
    }

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

export const isWav = (fname: string): boolean => {
  const arr = fname.split('.');
  return 'wav' === arr[arr.length - 1];
};
