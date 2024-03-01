import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authBearer = req.header('Authorization');
    const token = authBearer?.split(' ')[1];
    if (!token)
      return res.status(401).json({ err: 'Unauthorized' });

    const verified: any = jwt.verify(token, process.env.JWT_KEY!);
    if (!verified) {
      return res.status(401).json({ err: 'Unauthorized' });
    }

    req.body.user = verified.id;
    next();

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default auth;