import prisma from "../lib/prisma.js";
export const addMessage = async(req,res) =>{
    const tokenUserId = req.userId;
    const chatId = req.params.id;
    const text = req.body.text;
    try {
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            }
        });

        if(!chat) return res.status(404).json({message:"Chat not found !!"});

        const message = await prisma.message.create({
            data:{
                text,
                chatId,
                userId:tokenUserId
            }
        });

        await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                seenBy:[tokenUserId], // we doesnt use set/push method because when we push the chat id by other call it automatically pushout this id and set another id.
                lastMessage:text
            }
        });
        res.status(200).json(message);
    } catch (err) {
        console.log(err.message);
        res.status(400).json("Failed to add Message");
    };
};