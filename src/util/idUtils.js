import { v4 as uuidv4 } from 'uuid';
const generateUniqueId = () => {
    const uniqueId = uuidv4();
    return uniqueId;
};

export default generateUniqueId;