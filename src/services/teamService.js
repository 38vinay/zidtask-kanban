// src/services/teamService.js

const TEAM_KEY = "teamMembersDB";

export const teamService = {
  getAll() {
    return JSON.parse(localStorage.getItem(TEAM_KEY) || "[]");
  },

  saveAll(members) {
    localStorage.setItem(TEAM_KEY, JSON.stringify(members));
  },

  add(member) {
    const list = this.getAll();
    list.push(member);
    this.saveAll(list);
  },

  update(memberId, updatedData) {
    const list = this.getAll().map(m =>
      m.id === memberId ? { ...m, ...updatedData } : m
    );
    this.saveAll(list);
  },

  remove(memberId) {
    const list = this.getAll().filter(m => m.id !== memberId);
    this.saveAll(list);
  }
};
