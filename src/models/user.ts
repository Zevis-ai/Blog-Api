/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * Node_modules
 */

import { Schema, model } from 'mongoose';

export interface IUser {
  userName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
  };
}

/**
 * User schema
 */

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, 'User name is required'],
      maxlength: [20, 'User name can not be more than 20 characters'],
      unique: [true, 'User mast be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [50, 'Email can not be more than 50 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxlength: [20, 'First name can not be more than 20 characters'],
    },
    lastName: {
      type: String,
      maxlength: [20, 'Last name can not be more than 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxlength: [100, 'Website can not be more than 100 characters'],
      },
      facebook: {
        type: String,
        maxlength: [100, 'Facebook can not be more than 100 characters'],
      },
      instagram: {
        type: String,
        maxlength: [100, 'Instagram can not be more than 100 characters'],
      },
      x: {
        type: String,
        maxlength: [100, 'X can not be more than 100 characters'],
      },
      youtube: {
        type: String,
        maxlength: [100, 'Youtube can not be more than 100 characters'],
      },
      linkedin: {
        type: String,
        maxlength: [100, 'Linkedin can not be more than 100 characters'],
      },
    },
  },
  {
    timestamps: true, //createdAt updatedAt
  },
);

export default model<IUser>('User', userSchema);
