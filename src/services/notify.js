import { notificationService } from "./notificationService";

export const notify = {
  taskCreated(task, column, board) {
    notificationService.add({
      title: "New Task Created",
      message: `Task "${task.title}" added to "${column.name}" in board "${board.name}".`,
    });
  },

  taskCompleted(task, board) {
    notificationService.add({
      title: "Task Completed",
      message: `"${task.title}" has been marked as completed in "${board.name}".`,
    });
  },

  boardUpdated(board) {
    notificationService.add({
      title: "Board Updated",
      message: `Board "${board.name}" was updated.`,
    });
  },

  memberAdded(member) {
    notificationService.add({
      title: "New Member Added",
      message: `${member.name} joined your team.`,
    });
  }
};
