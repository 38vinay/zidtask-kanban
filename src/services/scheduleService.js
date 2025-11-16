import { localDB } from "./localDB";

const KEY = "schedule";

export const scheduleService = {
  get() {
    return localDB.get(KEY, []);
  },

  add(task) {
    const list = this.get();
    list.push({ id: Date.now(), task });
    localDB.set(KEY, list);
    return list;
  },

  remove(id) {
    const list = this.get().filter(t => t.id !== id);
    localDB.set(KEY, list);
    return list;
  }
};
