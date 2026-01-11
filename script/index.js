const createElement = (arr) => {
  const htmlElements = arr.map((el) => ` <span class="btn  ">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all").then((res) =>
    res.json().then((json) => displayLesson(json.data))
  );
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details.data);
};
const displayWordDetail = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = ` 
          <div>
            <h2 class="font-bold text-2xl">
             ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :
              ${word.pronunciation})
            </h2>
          </div>
          <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div>
            <h2 class="font-bold">Example</h2>
            <p> ${word.sentence}</p>
          </div>
          <div class=""> 
            <h2 class="font-bold">Synonym</h2>
            <div class=" ">${createElement(word.synonyms)} </div>
           
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div
        class="text-center  col-span-full rounded-xl space-y-6 font-bangla py-10"
      >
      <img   class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400">
         এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>`;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "Word Not Found"
        }</h2>
        <p class="semi-bold">Meaning / Programming</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "Meaning Not Found"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation Not Found"
    }"</div>
        <div class="flex justify-between items-center mt-5">
          <button  onclick=" loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-info"></i>
          </button>
          <button    class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`;

    wordContainer.appendChild(card);
  });

  manageSpinner(false);
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("Level-container");
  levelContainer.innerHTML = "";
  console.log(lessons);

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = ` <button  id ="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i>Lesson -  ${lesson.level_no}
                </button>`;

    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
