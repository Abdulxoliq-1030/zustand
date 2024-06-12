import { create } from 'zustand';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface BearState {
    bears: number;
    todos?: Todo[];
    increaseBears: () => void;
    decreaseBears: () => void;
    increaseByInput: (amount: number) => void;
    fetchBears: () => void;
    updateTodo: (todo: Todo) => void;
}

export const counterStore = create<BearState>((set) => ({
    bears: 0,
    increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
    decreaseBears: () => set((state) => ({ bears: state.bears - 1 })),
    increaseByInput: (amount) => set((state) => ({ bears: state.bears + amount })),
    fetchBears: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const data = await response.json();
        set({ todos: data });
    },
    updateTodo: async (todo: Todo) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        if (response.ok) {
            set((state) => ({
                todos: state.todos?.map((t) => (t.id === todo.id ? todo : t))
            }));
        }
    }
}));