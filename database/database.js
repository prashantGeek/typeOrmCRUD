import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", // Replace with your PostgreSQL username
    password: "mysecretpassword", // Replace with your PostgreSQL password
    database: "postgres", // Replace with your PostgreSQL database name
    
    synchronize: true, // Set to false in production
    logging: false,
    entities: ["./entities/*.js"], // Path to your entity files

});

export const connectDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};