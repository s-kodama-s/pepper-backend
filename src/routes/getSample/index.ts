import { Request, Response } from 'express';
import { fetchUsers } from '../../api/jsonplaceholder';

export const getSample = async (_req: Request, res: Response) => {
  const users = await fetchUsers();
  return res.status(200).json(users);
};
