import { localDB } from "./localDB";

const KEY = "tasks";

export const taskService = {
  get() {
    return localDB.get(KEY, []);
  },

  add(task) {
    const list = this.get();
    list.push({ id: Date.now(), ...task });
    localDB.set(KEY, list);
    return list;
  },

  update(id, data) {
    const updated = this.get().map(t => (t.id === id ? { ...t, ...data } : t));
    localDB.set(KEY, updated);
    return updated;
  },

  delete(id) {
    const filtered = this.get().filter(t => t.id !== id);
    localDB.set(KEY, filtered);
    return filtered;
  }
};
