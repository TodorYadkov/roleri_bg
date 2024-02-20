import mongoose from 'mongoose';
import { userRole } from '../environments/constants.js';

const userParentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is require']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is require']
    },
    email: {
        type: String,
        required: [true, 'Email is require']
    },
    phone: {
        type: String,
        required: [true, 'Phone is require']
    },
    role: {
        type: String,
        default: userRole.user
    },
    password: {
        type: String,
        require: [true, 'Password is require']
    }
});

userParentSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }

}, { timestamps: true });

const UserParent = mongoose.model('UserParent', userParentSchema);

export { UserParent };