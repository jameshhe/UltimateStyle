import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Stylist from '../models/stylistModel.js';
import ErrorResponse from '../utils/errorResponse.js';

export const protectStylist = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.stylist = await Stylist.findById(decoded.id);
        if (!req.stylist.id) {
            throw '';
        }
        next();
    } catch (err) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }
};

export const protectUser = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id);
        req.user = await User.findById(decoded.id);
        if (!req.user.id) {
            throw '';
        }
        next();
    } catch (err) {
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );
    }
};
