import React, { useState } from "react";
import { MoreHorizontal, Calendar, MessageSquare, Plus } from "lucide-react";

const TaskBoard = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    status: "todo",
    comments: 0,
  });
  const [swimLanes, setSwimLanes] = useState({
    todo: {
      title: "To Do",
      tasks: [
        {
          id: 1,
          title: "Finish user onboarding",
          date: "Tomorrow",
          comments: 0,
        },
      ],
    },
    progress: {
      title: "In Progress",
      tasks: [
        {
          id: 2,
          title: "Work In Progress (WIP) Dashboard",
          date: "Today",
          comments: 1,
        },
      ],
    },
    completed: {
      title: "Completed",
      tasks: [
        {
          id: 3,
          title: "Manage internal feedback",
          date: "Tomorrow",
          comments: 1,
        },
      ],
    },
  });

  // Calculate task counts dynamically
  const getTaskCount = (laneType) => {
    return swimLanes[laneType].tasks.length;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    // Create new task object
    const taskToAdd = {
      id: Date.now(), // Simple unique ID
      title: newTask.title,
      date: formatDate(newTask.date),
      comments: 0,
    };

    // Update the appropriate swim lane
    const updatedSwimLanes = { ...swimLanes };
    const targetLane = newTask.status;

    updatedSwimLanes[targetLane].tasks = [
      ...updatedSwimLanes[targetLane].tasks,
      taskToAdd,
    ];

    // Update state with new swim lanes
    setSwimLanes(updatedSwimLanes);

    // Reset form and close modal
    setNewTask({
      title: "",
      date: "",
      status: "todo",
      comments: 0,
    });
    setIsTaskModalOpen(false);
  };

  const SwimLane = ({ title, tasks, type }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getBadgeStyle = () => {
      switch (type) {
        case "progress":
          return "bg-orange-100 text-orange-700";
        case "completed":
          return "bg-green-100 text-green-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    return (
      <div className="swim-lane flex flex-col gap-5 p-4 xl:p-6 bg-white border-r border-gray-200">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="flex items-center gap-3 text-base font-medium text-gray-800">
            {title}
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getBadgeStyle()}`}
            >
              {tasks.length}
            </span>
          </h3>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <MoreHorizontal size={20} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-40 w-32 rounded-lg border border-gray-200 bg-white p-2 shadow-md">
                <ul className="space-y-1">
                  <li className="text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
                    Edit
                  </li>
                  <li className="text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    );
  };

  const TaskItem = ({ task }) => (
    <div
      draggable
      className="task rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="w-full">
          <h4 className="mb-5 text-base text-gray-800 font-medium">
            {task.title}
          </h4>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={16} />
              {task.date}
            </span>
            {task.comments > 0 && (
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <MessageSquare size={16} />
                {task.comments}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 bg-white">
      <h1 className="pb-6 text-2xl font-bold text-gray-700 font-style">
        Tasks
      </h1>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
          >
            Add New Task
            <Plus size={16} />
          </button>
        </div>

        {/* Swim Lanes */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <SwimLane
            title={swimLanes.todo.title}
            tasks={swimLanes.todo.tasks}
            type="todo"
          />
          <SwimLane
            title={swimLanes.progress.title}
            tasks={swimLanes.progress.tasks}
            type="progress"
          />
          <SwimLane
            title={swimLanes.completed.title}
            tasks={swimLanes.completed.tasks}
            type="completed"
          />
        </div>
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form className="space-y-4" onSubmit={handleAddTask}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newTask.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsTaskModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
