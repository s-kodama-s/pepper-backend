import { Response } from 'express';
import { fromFile } from '../../api/cognitiveService';

export const summarizationAndCategorization = async (files: Express.Multer.File, res: Response) => {
  const convertedText = await fromFile(files);
  return res.status(200).json(convertedText);
};
