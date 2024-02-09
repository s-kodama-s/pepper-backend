import * as fs from 'fs';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

type FromFileResponse = {
  result: string;
  text?: string;
  cancellation?: {
    errorCode: number;
    errorDetails: string;
  };
};

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription('SPEECH_KEY', 'SPEECH_REGION');
speechConfig.speechRecognitionLanguage = 'ja-JP';

export const fromFile = (audioFile: Buffer): FromFileResponse | any => {
  // FIXME: try catch要追加
  const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(audioFile));
  const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  const response = speechRecognizer.recognizeOnceAsync((result) => {
    switch (result.reason) {
      case sdk.ResultReason.RecognizedSpeech:
        const recognizedSpeech = { result: result.reason, text: result.text };
        return recognizedSpeech;
      case sdk.ResultReason.NoMatch:
        const noMatch = { result: result.reason, text: result.text };
        return noMatch;
      case sdk.ResultReason.Canceled:
        const cancellation = sdk.CancellationDetails.fromResult(result);
        const canceled = {
          result: result.reason,
          cancellation: {
            errorCode: cancellation.ErrorCode,
            errorDetails: cancellation.errorDetails,
          },
        };
        return canceled;
    }
    speechRecognizer.close();
    return response;
  });
};
