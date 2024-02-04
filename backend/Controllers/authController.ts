import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/userModel';
// import crypto from 'crypto';

const signupUser = async (req: Request, res: Response) => {
  try {
    const {username, email, password} = req.body;
    
    const checkName = await User.findOne({username});
    const checkMail = await User.findOne({email});
    const checkPass = password.length < 6;
    if (checkName || checkMail || checkPass) {
      return res.status(400).json({error: 'User registration failed!'});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // const verification = crypto.randomBytes(32).toString('hex');

    await user.save().then(() => {
      res.status(201).json({user});
    }).catch((err) => {
      res.status(500).json({error: err});
    });

  } catch (err) {
    res.status(500).json({error: err});
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({error: 'User doesn\'t exist'});
    }

    const author = await bcrypt.compare(password, user.password);
    if (!author) {
      return res.status(400).json({error: 'Invalid Credentials'});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
    res.status(200).json({token});

  } catch (err) {
    res.status(500).json({error: err});
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(400).json({error: 'Authorisation Denied!'});
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default {signupUser, loginUser, getUser};
