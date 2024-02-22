export async function submitWav(file: File): Promise<any> {
  const formData = new FormData();
  formData.append('wavfile', file);

  return new Promise<any>((resolve, reject) => {
    console.log('formData');
    console.log(formData);
    fetch('https://app-gtt-ossp-dev-je-001.azurewebsites.net/', {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          reject('File upload failed');
        }
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        resolve(`
          元音声：${data.convertedText}
          要約結果：${data.summarizedText}
          カテゴリ：${data.categorizedText}
        `);
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
