import { localDB } from "./localDB";

const KEY = "teamMembers";

export const teamService = {
  get() {
    return localDB.get(KEY, []);
  },

  add(name) {
    const list = this.get();
    list.push({ id: Date.now(), name });
    localDB.set(KEY, list);
    return list;
  },

  remove(id) {
    const list = this.get().filter(m => m.id !== id);
    localDB.set(KEY, list);
    return list;
  }
};
