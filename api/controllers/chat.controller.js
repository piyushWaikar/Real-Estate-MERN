import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        });

        for (const chat of chats){
            const receiverId = chat.userIDs.find(id=>id !== tokenUserId);

            const receiver = await prisma.user.findUnique({
                where:{
                    id:receiverId
                },
                select:{
                    id:true,
                    username:true,
                    avatar:true
                }
            });
            chat.receiver = receiver;
        }
        res.status(200).json(chats);
    } catch (err) {
        console.log(err.message);
        res.status(400).json("Error in Fetching all messages");
    };
};

export const getChat = async (req, res) => {
    const chatid = req.params.id;
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatid,
                // if we dont add userid to check then anyone can access this chat using chat id.
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            // Fetching message aswell with order
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        });

        // fetching chat using where condition and updating seenby array to ensure the message has been seen by the receiver .
        await prisma.chat.update({
            where:{
                id:req.params.id 
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    } catch (err) {
        console.log(err.message);
        res.status(400).json("Error");
    };
};

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.create({
            data:{
                userIDs:[tokenUserId,req.body.receiverId]
            }
        })
        res.status(200).json(chat);
    } catch (err) {
        console.log(err.message);
        res.status(400).json("Error");
    };
};

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const chat = await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
        res.status(200).json(chat);
    } catch (err) {
        console.log(err.message);
        res.status(400).json("Error");
    };
};


