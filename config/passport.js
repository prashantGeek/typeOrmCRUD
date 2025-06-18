import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../database/database.js";
import { User } from "../entities/User.js";

const userRepository = AppDataSource.getRepository(User);

passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser(async (id, done)=>{
    try{
        const user = await userRepository.findOneBy({ id });
        done(null, user);
    }catch (error) {
        done(error, null);
    }
})

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists with this Google ID
        let existingUser = await userRepository.findOneBy({ googleId: profile.id });
        
        if (existingUser) {
            return done(null, existingUser);
        }

        // Check if user exists with same email
        existingUser = await userRepository.findOneBy({ email: profile.emails[0].value });
        
        if (existingUser) {
            // Link Google account to existing user
            existingUser.googleId = profile.id;
            existingUser.provider = "google";
            existingUser.profilePicture = profile.photos[0]?.value;
            const updatedUser = await userRepository.save(existingUser);
            return done(null, updatedUser);
        }

        // Create new user
        const newUser = userRepository.create({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            provider: "google",
            profilePicture: profile.photos[0]?.value,
            password: null // No password for Google auth users
        });

        const savedUser = await userRepository.save(newUser);
        return done(null, savedUser);
        } catch (error) {
        return done(error, null);
    }
}));

export default passport;