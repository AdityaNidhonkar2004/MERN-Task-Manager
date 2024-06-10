import express from "express"
import { getConnectedClient } from "./database.js";
import { ObjectId } from "mongodb";


const router =express.Router();


const getCollection = ()=>{
    const client = getConnectedClient();
    const collection =client.db("todosdb").collection("todos");
    return collection;
}

router.get("/todos",async(req,res)=>{
    const collection =getCollection();
    const todos =await collection.find({}).toArray();
    res.status(200).json(todos)
})

router.post("/todos",async(req,res)=>{
    const collection = getCollection();
    let {todo} =req.body;

    if(!todo){
        return res.status(400).json({msg:"error no todo found"});
    }
    todo=(typeof todo === "string") ? todo : JSON.stringify(todo);
    
    const newTodo = await collection.insertOne({todo, status:false})
    
    res.status(201).json({todo,status:false,_id:newTodo.insertedId});
})

router.delete("/todos/:id",async(req,res)=>{
    const collection =getCollection();
    const _id = new ObjectId(req.params.id); // to pull out the id from url
    const deletedTodo = await collection.deleteOne({_id});
    res.status(200).json(deletedTodo);
})

router.put("/todos/:id",async(req,res)=>{
    const collection=getCollection();
    const _id = new ObjectId(req.params.id); // to pull out the id from url
    const {status} = req.body;
    if(typeof status !== "boolean"){
            return res.status(400).json({msg :"Invalid status"});
    }

    const updatedTodo =await collection.updateOne({_id},{$set : {status : !status}});
    
    res.status(200).json(updatedTodo)
    
})

export default router;