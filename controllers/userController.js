import { AppDataSource } from "../database/database.js";
import { User } from "../entities/User.js";

const userRepository = AppDataSource.getRepository(User);

//create a new user

export const createUser = async (req,res)=>{
    try{
        const {firstName, lastName, email, password, age} = req.body;
        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password,
            age 
        })
        const savedUser = await userRepository.save(newUser)
        res.status(201).json({savedUser})
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//get all users
export const getAllUsers = async (req,res)=>{
    try{
        const users = await userRepository.find()
        res.json({users})
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//Get user by ID

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update user by ID

export const updateUser = async (req,res)=>{
    try{
        const {id} = req.params
        const updateData = req.body
        const result = await userRepository.update(id, updateData)

        if (result.affected === 0){
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await userRepository.findOneBy({id});
        res.json({updatedUser});
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

//delete user by ID

export const deleteUser = async (req, res) => {
    try{
        const {id}= req.params
        const result = await userRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.json({message: "User deleted successfully"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}