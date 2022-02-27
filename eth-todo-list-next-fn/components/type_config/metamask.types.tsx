export interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

// ? This adds a namespace to the interfaces, so they would be related to Events.TaskCreated ...
export namespace Events {
  export const EventNames = {
    TaskCreated: "TaskCreated",
    TaskCompleted: "TaskCompleted",
  };

  export interface TaskCreated {
    id: number;
    content: string;
    completed: boolean;
  }

  export interface TaskCompleted {
    id: number;
    completed: boolean;
  }
}
