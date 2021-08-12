import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { geocoder } from '../utils/geocoder.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please Provide a First Name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please provide a Last Name'],
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
            unique: true,
            required: [true, 'Please add an email address'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            select: false,
        },
        address: {
            type: String,
            default: '',
        },
        number: {
            type: String,
            match: [/[0-9]{10}/, 'Please add valid number'],
            default: '',
        },
        location: {
            // GeoJSON Point
            // Will take in address and generate a location
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        role: {
            type: String,
            enum: ['user'],
            default: 'user',
        },
        resetPasswordToken: String,
        resetPasswordExpiration: Date,
    },
    { collection: 'users' }
);

//Mongoose Hooks

// Using Locationiq to get long/lat from user address.

UserSchema.pre('save', async function (next) {
    var self = this;
    var exists = !this.isNew;

    mongoose
        .model('UserModel', UserSchema)
        .find({ email: self.email }, function (err, docs) {
            if (!docs.length) {
                exists = false;
            } else {
                console.log('dude this exists');
                exists = true;
            }
        });

    // check if the document is new and see if password has been modified to
    // rehash and resalt as needed
    if (!exists || this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    // check if docuemnt is new and address exists and also checks if address
    // hass been modified to avoid using api when not necessary
    if ((!exists && this.address) || this.isModified('address')) {
        console.log('api function executed');
        const loc = await geocoder.geocode(this.address);

        this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city,
            state: loc[0].state,
            zipcode: loc[0].zipcode,
            country: loc[0].countryCode,
        };
    }
    next();
});

// Sign JWT and return

// Sign JWT and return

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        {
            id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
};

// Match plain pwd and hashed pwd

UserSchema.methods.matchPassword = async function (plain) {
    return await bcrypt.compare(plain, this.password);
};

// generate and hash password token

UserSchema.methods.getResetPasswordToken = function () {
    //gen token

    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // set expiration date
    this.resetPasswordExpiration = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

export default mongoose.model('User', UserSchema);
