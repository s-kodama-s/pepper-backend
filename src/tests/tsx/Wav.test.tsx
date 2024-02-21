import '@testing-library/jest-dom';
import App from '../../App';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

describe('send wav file', () => {
  it('should send a text', async () => {
    const { getByLabelText } = render(<App />);
    const file = new File(['wav file content'], 'test.wav', { type: 'audio/wav' });

    (fetch as jest.Mock) = jest.fn().mockResolvedValue('移動・交通、公共空間、子育て');

    const inputElement = getByLabelText('uploadfile') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('移動・交通、公共空間、子育て')).toBeInTheDocument();
    });
  });
  it('should return error', async () => {
    const { getByLabelText } = render(<App />);
    const file = new File(['wav file content'], 'test.wav', { type: 'audio/wav' });

    (fetch as jest.Mock) = jest.fn().mockRejectedValue('error');

    const inputElement = getByLabelText('uploadfile') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('ファイルのアップロードに失敗しました')).toBeInTheDocument();
    });
  });
});
