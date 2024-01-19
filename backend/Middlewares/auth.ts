import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Bearer');
    if (!token)
      return res.status(401).json({ err: 'Unauthorized' });

    const verified: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!verified) {
      return res.status(401).json({ err: 'Unauthorized' });
    }

    req.body.userid = verified.id;
    next();

  } catch (e) {
    res.status(500).json({ err: e });
  }
};

export default auth;