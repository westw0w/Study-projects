const filmFormEL = document.querySelector(".film-form");
const sortBtnEl = document.querySelector(".sort__button");
const refreshBtnEl = document.querySelector("#refresh-btn");
const cancelBtnEl = document.querySelector("#cancel-btn");
const validation = new JustValidate(".film-form");

filmFormEL.addEventListener("submit", function (e) {
  e.preventDefault();
  const film = parseInputs() || null
  if (film != null) {
    addFilmToLocalStorage(film);
    clearInputs();
  }
});

sortBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  cancelEdit();
  let films = JSON.parse(localStorage.getItem("films")) || [];
  const sortBy = document.querySelector("#sort-select").value;
  films = sortByTitle(films, sortBy)
  refreshLocalStorage(films)
});

refreshBtnEl.addEventListener('click', function (e) {
  const filmId = document.querySelector("#title").getAttribute("index");
  const films = JSON.parse(localStorage.getItem("films")) || [];
  const film = parseInputs();
  if (film != null) {
    films[filmId] = film;
    refreshLocalStorage(films);
    cancelEdit();
  }
});

cancelBtnEl.addEventListener('click', function (e) {
  cancelEdit();
});

renderTable();

function addFilmToLocalStorage(film) {
  const films = JSON.parse(localStorage.getItem("films")) || [];
  films.push(film);
  refreshLocalStorage(films)
}

function deleteFilmToLocalStorage(index) {
  const films = JSON.parse(localStorage.getItem("films")) || [];
  films.splice(index, 1);
  refreshLocalStorage(films)
}

function refreshLocalStorage(films) {
  localStorage.setItem("films", JSON.stringify(films));
  renderTable();
}

function renderTable() {
  const films = JSON.parse(localStorage.getItem("films")) || [];
  const filmTableBody = document.querySelector(".film-tbody");
  filmTableBody.innerHTML = ""
  films.forEach((film) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td>
        <button class="edit-btn" type="button">Редактировать</button>
        <button class="del-btn" type="button">Удалить</button>
      </td>
    `;
    filmTableBody.appendChild(row);
  });
  startListener();
}

function startListener() {
  const editBtnAll = document.querySelectorAll(".edit-btn");
  const delBtnAll = document.querySelectorAll(".del-btn");

  for (let index = 0; index < delBtnAll.length; index++) {
    delBtnAll[index].addEventListener("click", function (e) {
      cancelEdit();
      deleteFilmToLocalStorage(index);
    });

    editBtnAll[index].addEventListener("click", function (e) {
      const films = JSON.parse(localStorage.getItem("films")) || [];
      const filmId = index;
      const film = films[filmId];
      document.querySelector("#title").value = film.title;
      document.querySelector("#title").setAttribute("index", filmId)
      document.querySelector("#genre").value = film.genre;
      document.querySelector("#releaseYear").value = film.releseYear;
      document.querySelector("#isWatched").checked = film.isWatched;
      document.querySelector("#add-btn").classList.remove("btn--active")
      document.querySelector("#refresh-btn").classList.add("btn--active")
      document.querySelector("#cancel-btn").classList.add("btn--active")
    });
  }
}

function cancelEdit() {
  clearInputs();
  document.querySelector("#add-btn").classList.add("btn--active")
  document.querySelector("#refresh-btn").classList.remove("btn--active")
  document.querySelector("#cancel-btn").classList.remove("btn--active")
  document.querySelector("#title").removeAttribute("index")
}

function clearInputs() {
  document.querySelector("#title").value = "";
  document.querySelector("#genre").value = "";
  document.querySelector("#releaseYear").value = "";
  document.querySelector("#isWatched").checked = false;
}

function parseInputs() {
  const title = document.querySelector("#title").value;
  const genre = document.querySelector("#genre").value;
  const releseYear = parseInt(document.querySelector("#releaseYear").value) || null;
  const isWatched = document.querySelector("#isWatched").checked;
  if (title != "" && genre != "" && releseYear > 999 && releseYear < 10000 && isWatched != null) {
    const film = {
      title,
      genre,
      releseYear,
      isWatched,
    };
    return film;
  } else {
    return null
  }
}

function sortByTitle(arr, method) {
  if (method == 1 || method == 2) {
    arr.sort(function (a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
  if (method == 2) {
    arr = arr.reverse();
  }
  if (method == 3) {
    arr.sort(function (a, b) {
      if (a.genre.toLowerCase() > b.genre.toLowerCase()) {
        return 1;
      }
      if (a.genre.toLowerCase() < b.genre.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
  if (method == 4 || method == 5) {
    arr.sort(function (a, b) {
      if (a.releseYear > b.releseYear) {
        return 1;
      }
      if (a.releseYear < b.releseYear) {
        return -1;
      }
      return 0;
    });
  }
  if (method == 5) {
    arr = arr.reverse();
  }
  if (method == 6) {
    arr.sort(function (a, b) {
      if (a.isWatched < b.isWatched) {
        return 1;
      }
      if (a.isWatched > b.isWatched) {
        return -1;
      }
      return 0;
    });
  }

  return arr;
}

validation
  .addField("#title", [
    {
      rule: "required",
      errorMessage: "Введите название фильма",
    },
    {
      rule: "minLength",
      value: 1,
    },
    {
      rule: "maxLength",
      value: 100,
    },

  ])
  .addField("#genre", [
    {
      rule: "required",
      errorMessage: "Введите жанр фильма",
    },
    {
      rule: "minLength",
      value: 1,
    },
    {
      rule: "maxLength",
      value: 100,
    },

  ])
  .addField("#releaseYear", [
    {
      rule: "required",
      errorMessage: "Введите год выпуска фильма",
    },
    {
      rule: 'number',
      errorMessage: "Год должен состоять из 4 цифр",
    },
    {
      rule: "minLength",
      value: 4,
      errorMessage: "Год должен состоять из 4 цифр",
    },
    {
      rule: "maxLength",
      value: 4,
      errorMessage: "Год должен состоять из 4 цифр",
    },

  ])