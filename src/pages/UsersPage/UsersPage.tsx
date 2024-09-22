import { ChangeEvent, useState } from "react";
import { USERS } from "../../data";
import { Transit, usePages } from "../../PagesProvider";
import "./UsersPage.css";

export function UsersPage() {
	const { setSearchParam, search } = usePages();

	// Извлекаем имя для поиска из параметров поиска
	const searchName = new URLSearchParams(search).get("searchName") || "";

	// Фильтрация пользователей на основе введенного имени
	const filteredUsers = USERS.filter(({ fullName }) =>
		fullName.toLowerCase().includes(searchName)
	);

	// Обработчик изменений в поле ввода
	const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		setSearchParam("searchName", value.toLowerCase());
	};

	return (
		<div className="usersPage">
			<h2>UsersPage</h2>

			<div className="users">
				<label>
					введите имя{" "}
					<input type="text" value={searchName} onChange={handleSearchName} />
				</label>

				{filteredUsers.map(({ id, fullName }) => (
					<Transit to={`/users/${id}`} key={id}>
						{fullName}
					</Transit>
				))}
			</div>
		</div>
	);
}
