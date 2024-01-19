import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/userModel';
// import crypto from 'crypto';

const signupUser = async (req: Request, res: Response) => {
  try {
    const {username, email, password} = req.body;
    
    const check = await User.findOne({username}) || User.findOne({email});
    if (check) {
      return res.status(400).json({status: 'fail', msg: 'User already exists'});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
    // const verification = crypto.randomBytes(32).toString('hex');

    await user.save().then(() => {
      res.status(201).json({status: 'success', token, user});
    }).catch((err) => {
      res.status(500).json({status: 'error', error: err});
    });

  } catch (err) {
    res.status(500).json({status: 'fail', error: err});
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({status: 'fail', msg: 'User doesn\'t exist'});
    }

    const author = await bcrypt.compare(password, user.password);
    if (!author) {
      return res.status(400).json({status: 'fail', msg: 'Invalid Credentials'});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!);
    res.status(200).json({status: 'success', token, user});

  } catch (err) {
    res.status(500).json({status: 'error', error: err});
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userid);
    res.json(user);
  } catch (e) {
    res.status(500).json({ err: e });
  }
};

export default {signupUser, loginUser, getUser};
