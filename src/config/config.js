import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config = {
    development: {
        username: "root",
        password: "asdfasdf",
        database: "spartacode",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
        timezone: "+09:00",
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
        define: {
            timestamps: true,
        },
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
    },
};

export default config;
