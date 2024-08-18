import prisma from "../lib/prisma.js";

export const getUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"Failed to get users"});
    }
}

export const getUser = (req,res)=>{
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"Failed to get user"});
    }
}

export const updateUser = (req,res)=>{
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"Failed to update users"});
    }
}

export const deleteUser = (req,res)=>{
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"Failed to delete users"});
    }
}