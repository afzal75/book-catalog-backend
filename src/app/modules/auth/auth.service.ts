import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import config from "../../../config";
import prisma from "../../../shared/prisma";


const createUser = async(data: User): Promise<User> => {
    const {password, ...others} = data;

    const hasedPassword = await bcrypt.hash(
        password,
        Number(config.bycrypt_salt_rounds)
      );
    const result = await prisma.user.create({
        data: {
            password: hasedPassword,
        ...others
        }
    })
    return result
    
}

export const AuthService = {
    createUser
}