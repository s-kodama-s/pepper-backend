export async function submitWav(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('wavfile', file);

  return new Promise<string>((resolve, reject) => {
    console.log('formData');
    console.log(formData);
    fetch('https://app-gtt-ossp-dev-je-001.azurewebsites.net/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          reject('File upload failed');
        }
        console.log('File uploaded successfully:', response);
        const hoge = response.json();
        resolve(hoge);
      })
      .catch((reason) => {
        console.error('File upload failed:', reason);
        reject('ファイルのアップロードに失敗しました');
      });
  });
}

export const isWav = (fname: string): boolean => {
  const arr = fname.split('.');
  return 'wav' === arr[arr.length - 1];
};
