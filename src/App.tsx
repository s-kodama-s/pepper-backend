import './App.css';
import { submitWav, isWav } from './Wav';
import { useState } from 'react';

function App() {
  const [raw, setRaw] = useState<string>('');
  const [sumTxt, setSumTxt] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (!files || files?.length === 0) return;
    const file = files[0];
    console.log(file);

    const getResText = async () => {
      if (isWav(file.name)) {
        const res = await submitWav(file);
        const tmp_results = res.split('：');
        setRaw(tmp_results[1].split('\n')[0]);
        setSumTxt(tmp_results[2].split('\n')[0]);
        setCategory(tmp_results[3]);
      } else {
        alert('It is not wav');
      }
    };
    getResText();
  };

  return (
    <>
      <h2>Tokyo OSS Party!! 2024</h2>
      <h2>ペッパーくんに物申す</h2>
      <div>
        音声ファイルを指定してください<br />
        <input type="file" accept=".wav" aria-label="uploadfile" onChange={handleOnChange} />
      </div>

      {(() => {
        if (raw) {
          console.log("raw: " + raw);
        } else {
          console.log("no data.");
        }
      })()}


      <table className="questionnaire">
        <tbody>
          <tr>
            <th className="arrow_box">音声テキストデータ</th>
            <td>{raw}</td>
          </tr>
          <tr>
            <th className="arrow_box">テキスト要約</th>
            <td>{sumTxt}</td>
          </tr>
          <tr>
            <th className="arrow_box">カテゴリー<sub>（*）</sub></th>
            <td>{category}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p><small>（*）<a href="https://www.digital.go.jp/policies/digital_garden_city_nation/well-being">地域幸福度（Well-Being）指標</a> における因子群計24カテゴリーを指します</small></p>
    </>
  );
}

export default App;
