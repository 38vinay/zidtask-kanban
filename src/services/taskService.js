export const teamService = {
  getAll() {
    return JSON.parse(localStorage.getItem("teamMembers") || "[]");
  },

  add(member) {
    const list = this.getAll();
    list.push({ id: Date.now(), ...member });
    localStorage.setItem("teamMembers", JSON.stringify(list));
  },

  update(id, updated) {
    let list = this.getAll();
    list = list.map((m) => (m.id === id ? { ...m, ...updated } : m));
    localStorage.setItem("teamMembers", JSON.stringify(list));
  },

  remove(id) {
    let list = this.getAll();
    list = list.filter((m) => m.id !== id);
    localStorage.setItem("teamMembers", JSON.stringify(list));
  }
};
