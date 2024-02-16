// import { submitWav } from '../../Wav';

import '@testing-library/jest-dom';
import App from '../../App';
import { render, fireEvent } from '@testing-library/react';

describe('send wav file', () => {
  it('success', async () => {
    const { getByLabelText } = render(<App />);
    const file = new File(['wav file content'], 'test.wav', { type: 'audio/wav' });

    (fetch as jest.Mock) = jest.fn().mockResolvedValue({ massage: 'success' });
    console.log('log;', fetch);

    const inputElement = getByLabelText('uploadfile') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { files: [file] } });
  });
});
