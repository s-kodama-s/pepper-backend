// process.env.SPEECH_KEY = 'dummy';
// process.env.SPEECH_REGION = 'dummy';

// import { fromFile } from '../../api/cognitiveService';

// jest.mock('microsoft-cognitiveservices-speech-sdk', () => ({
//   SpeechConfig: {
//     fromSubscription: jest.fn().mockReturnValue({
//       speechRecognitionLanguage: undefined,
//     }),
//   },
//   AudioConfig: {
//     fromWavFileInput: jest.fn(),
//   },
//   SpeechRecognizer: jest.fn(() => ({
//     recognizeOnceAsync: jest.fn((cb) =>
//       cb({
//         reason: 'RecognizedSpeech',
//         text: 'テスト成功',
//       })
//     ),
//     close: jest.fn(),
//   })),
//   ResultReason: {
//     RecognizedSpeech: 'RecognizedSpeech',
//   },
// }));

// jest.mock('fs', () => ({
//   readFileSync: jest.fn(),
// }));

// describe('fromFile function', () => {
//   it('should return recognized text', async () => {
//     const mockAudioFile = Buffer.from('fake audio file content');
//     const recognizedText = await fromFile(mockAudioFile);

//     expect(recognizedText).toEqual('テスト成功');
//   });
// });
