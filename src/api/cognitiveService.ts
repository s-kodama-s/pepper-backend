import * as fs from 'fs';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const speechKey = process.env.SPEECH_KEY;
const speechRegion = process.env.SPEECH_REGION;

if (!speechKey || !speechRegion) {
  throw new Error('SPEECH_KEY or SPEECH_REGION is not defined in the environment variables');
}

const recognizeSpeechAsync = (fileMetaData: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
    speechConfig.speechRecognitionLanguage = 'ja-JP';

    const audioConfig = sdk.AudioConfig.fromWavFileInput(
      fs.readFileSync(path.resolve(__dirname, `../../${fileMetaData.path}`))
    );
    const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

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
          reject('Canceled');
          break;
        default:
          reject('Error');
          break;
      }
      speechRecognizer.close();
    });
  });
};

export const fromFile = async (file: Express.Multer.File): Promise<string> => {
  const result = await recognizeSpeechAsync(file);
  return result;
};
