import { JSONPreset } from 'lowdb/node';

// Read or create db.json
const defaultData = { users: [] };
const db = await JSONPreset('db.json', defaultData);

export const createUser = async (user: never) => {
  db.data.users.push(user);
  await db.write()
};
