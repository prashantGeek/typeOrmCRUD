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
            nullable: false,
        },
        age: {
            type: "int",
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
    ],
});