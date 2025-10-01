// Elements
const input = document.querySelector('#favchap');
const button = document.querySelector('#addBtn');
const list = document.querySelector('#list');

// Make Enter key act like Add button
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        button.click();
    }
});

// Always keep name consistent
let chaptersArray = getChapterList() || [];

// Show stored chapters on load
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Add click event
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = '';
        input.focus();
    }
});

// Build and show list item
function displayList(item) {
    let li = document.createElement('li');
    let deletebutton = document.createElement('button');

    li.textContent = item;
    deletebutton.textContent = '❌';
    deletebutton.classList.add('delete');

    li.append(deletebutton);
    list.append(li);

    deletebutton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Save to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Load from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Delete from array + storage
function deleteChapter(chapter) {
    // Remove the ❌
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}
