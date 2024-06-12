"use client";
import { counterStore, Todo } from "@/store/counter-store";
import { useEffect, useState } from "react";

function BearCounter() {
	const {
		bears,
		increaseBears,
		decreaseBears,
		increaseByInput,
		fetchBears,
		todos,
		updateTodo,
	} = counterStore();

	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
	const [newTitle, setNewTitle] = useState<string>("");

	const handleUpdateClick = (todo: Todo) => {
		setSelectedTodo(todo);
		setNewTitle(todo.title);
	};

	const handleSaveClick = () => {
		if (selectedTodo) {
			updateTodo({
				...selectedTodo,
				title: newTitle,
			});
			setSelectedTodo(null);
		}
	};

	useEffect(() => {
		fetchBears();
	}, [fetchBears]);

	return (
		<>
			<h1>{bears} around here...</h1>
			<button onClick={() => increaseByInput(5)}>Add 5</button> <br />
			<button onClick={increaseBears}>Increase</button> <br />
			<button onClick={decreaseBears}>Decrease</button>
			<br />
			<br />
			{selectedTodo && (
				<div>
					<h3>Update Todo</h3>
					<input
						type='text'
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
					<button onClick={handleSaveClick}>Save</button>
					<button onClick={() => setSelectedTodo(null)}>Cancel</button>
				</div>
			)}
			<h2>Todos:</h2>
			{todos ? (
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							{todo.title} (User ID: {todo.userId}, Completed:{" "}
							{todo.completed ? "Yes" : "No"})
							<button onClick={() => handleUpdateClick(todo)}>Update</button>
						</li>
					))}
				</ul>
			) : (
				<p>Loading todos...</p>
			)}
		</>
	);
}

export default BearCounter;
