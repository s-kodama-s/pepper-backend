import * as fs from 'fs';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const speechKey = process.env.SPEECH_KEY;
const speechRegion = process.env.SPEECH_REGION;

if (!speechKey || !speechRegion) {
  throw new Error('SPEECH_KEY or SPEECH_REGION is not defined in the environment variables');
}

const recognizeSpeechAsync = (audioFile: Buffer) => {
  const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
  speechConfig.speechRecognitionLanguage = 'ja-JP';

  const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(audioFile));
  const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  return new Promise<string>((resolve, reject) => {
    speechRecognizer.recognizeOnceAsync((result) => {
      switch (result.reason) {
        case sdk.ResultReason.RecognizedSpeech:
          resolve(result.text);
          break;
        case sdk.ResultReason.NoMatch:
          reject('No match');
          break;
        case sdk.ResultReason.Canceled:
          const cancellation = sdk.CancellationDetails.fromResult(result);
          reject(`Canceled: ${cancellation.reason}`);
          break;
        default:
          reject('Error');
          break;
      }
      speechRecognizer.close();
    });
  });
};

export const fromFile = async (audioFile: Buffer): Promise<string> => {
  const result = await recognizeSpeechAsync(audioFile);
  return result;
};
