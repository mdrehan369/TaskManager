import mongoose from "mongoose";
import { hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, index: true, trim: true},
    number: {type: Number, require: true, min:1000000000, max: 9999999999},
    password: {type: String, require: true},
    username: {type: String, require: true, index: true, trim: true},
    gender: {type: String, require: true},
});

userSchema.pre('save', async function(next){

    const hashedPassword =  await hash(this.password, 10)
    this.password = hashedPassword

    next();
})

export const userModel = new mongoose.model('Users', userSchema);

