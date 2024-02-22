export async function submitWav(fname: string): Promise<string> {
  const formData = new FormData();
  formData.append('wavfile', fname);

  return new Promise<string>((resolve) => {
    fetch('https://app-gtt-ossp-dev-je-001.azurewebsites.net', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('File uploaded successfully:', response);
        resolve(response.toString());
      })
      .catch((reason) => {
        console.error('File upload failed:', reason);
        resolve('ファイルのアップロードに失敗しました');
      });
  });
}

export const isWav = (fname: string): boolean => {
  const arr = fname.split('.');
  return 'wav' === arr[arr.length - 1];
};
