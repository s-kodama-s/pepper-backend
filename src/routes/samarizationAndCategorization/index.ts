import { Response } from 'express';
import { fromFile } from '../../api/cognitiveService';
import { summarizeText } from '../../api/summarizeText';
import { categorizeText } from '../../api/categorizeText';

export const summarizationAndCategorization = async (files: Express.Multer.File, res: Response) => {
  const convertedText = await fromFile(files);
  const summarizedText = await summarizeText(convertedText);
  const categorizedText = await categorizeText(summarizedText);
  return res.status(200).json(categorizedText);
};
