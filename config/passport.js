import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../database/database.js";
import { User } from "../entities/User.js";

const userRepository = AppDataSource.getRepository(User);

