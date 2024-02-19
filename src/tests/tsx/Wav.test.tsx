// import { submitWav } from '../../Wav';

import '@testing-library/jest-dom';
import App from '../../App';
import { render, fireEvent } from '@testing-library/react';

describe('send wav file', () => {
  it('should send a text', async () => {
    const { getByLabelText } = render(<App />);
    const file = new File(['wav file content'], 'test.wav', { type: 'audio/wav' });

    (fetch as jest.Mock) = jest.fn().mockResolvedValue('success speech to text');

    const inputElement = getByLabelText('uploadfile') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(console.log).toMatchSnapshot();
  });
  it('should return error', async () => {
    const { getByLabelText } = render(<App />);
    const file = new File(['wav file content'], 'test.wav', { type: 'audio/wav' });

    (fetch as jest.Mock) = jest.fn().mockRejectedValue('error');

    const inputElement = getByLabelText('uploadfile') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(console.error).toMatchSnapshot();
  });
});
