const Message = require('../models/message');
const sequelize = require('../util/database');
const { Op } = require("sequelize");


exports.postMessage = async (req,res,next) => {

    const t = await sequelize.transaction();

    try{
        const name = req.user.name;
        const message = req.body.message;
        await Message.create({name:name, message:message},{transaction:t});
        await t.commit();
        res.status(201).json({message:"Your message is send", success:true});
    
    } catch(err){
        console.log(err)
        await t.rollback();
        res.status(500).json({error:err, success:false});
    }
}

exports.getMessages = async (req,res,next) => {

    const t = await sequelize.transaction();

    try {
        const lastMessageId =  req.query.id;
        const messages = await Message.findAll({where:{ id: {[Op.gt]:lastMessageId} }});
        // const messages = await Chat.findAll({where:{msgid:{[Op.gt]:id},GroupId:null}});
        res.status(200).json({allMessages: messages});
    } catch (err) {
        console.log('GET Message is failing', JSON.stringify(err));
        res.status(500).json({ error: err })
    }
}


