import { Request, Response } from "express";
import getToken from "src/helpers/get-token";
import { getUserByToken } from "src/helpers/get-user-by-token";
export class GetCurrentUserController {
   async handle(req: Request, res: Response) {
      //get current user logged
      const token = getToken(req);
      const user = await getUserByToken(res, token);
      return res.status(200).json({ user });
   }
}
