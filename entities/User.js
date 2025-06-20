import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        firstName: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        lastName: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        email: {
            type: "varchar",
            length: 255,
            unique: true,
            nullable: false,
        },
        password: {
            type: "varchar",
            length: 255,
            nullable: true,
        },
        age: {
            type: "int",
            nullable: true,
        },
        googleId:{
            type: "varchar",
            length: 255,
            nullable: true,
            unique: true,
        },
        provider:{
            type: "varchar",
            length: 50,
            default: "local", // Default to 'local' for local users
        },
        profilePicture:{
            type: "varchar",
            length: 500,
            nullable: true,
        },
        isActive: {
            type: "boolean",
            default: true,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
    indices: [
        {
            name: "IDX_USER_EMAIL",
            columns: ["email"],
            unique: true,
        },
        {
            name: "IDX_USER_GOOGLE_ID",
            columns: ["googleId"],
            unique: true,
        },
    ],
});