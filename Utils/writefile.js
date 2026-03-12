// utils/writeFile.js
const fs = require("fs/promises");

const writeFile = async (file, data) => {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2)); // stringify!
        return "File written successfully";
    } catch (e) {
        return e;
    }
};

module.exports = writeFile;