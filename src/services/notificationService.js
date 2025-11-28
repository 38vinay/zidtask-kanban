export const notificationService = {
  getAll() {
    return JSON.parse(localStorage.getItem("notifications") || "[]");
  },

  add(notification) {
    const list = this.getAll();

    const newNote = {
      id: Date.now(),
      ...notification,
      read: false,
      time: new Date().toLocaleString()
    };

    list.unshift(newNote);
    localStorage.setItem("notifications", JSON.stringify(list));

    window.dispatchEvent(new Event("notificationUpdate"));
  },

  markRead(id) {
    const list = this.getAll().map(n =>
      n.id === id ? { ...n, read: true } : n
    );

    localStorage.setItem("notifications", JSON.stringify(list));
    window.dispatchEvent(new Event("notificationUpdate"));
  },

  delete(id) {
    const list = this.getAll().filter(n => n.id !== id);
    localStorage.setItem("notifications", JSON.stringify(list));
    window.dispatchEvent(new Event("notificationUpdate"));
  },

  clearAll() {
    localStorage.setItem("notifications", "[]");
    window.dispatchEvent(new Event("notificationUpdate"));
  }
};
