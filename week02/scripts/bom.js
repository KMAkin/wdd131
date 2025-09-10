// Grab elements from the DOM
const input = document.querySelector('#favchap');  // input field
const button = document.querySelector('#button'); // Add Chapter button (change ID if different)
const list = document.querySelector('#list');         // ul or ol element

// Add click event listener to the button
button.addEventListener('click', function () {
    // Check if input is not blank (ignores spaces)
    if (input.value.trim() !== '') {
        // start of list creation
        const li = document.createElement('li');
        li.textContent = input.value.trim();  

        // Create a delete button for this li
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');

        // Add click event to delete the li when clicked
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Append delete button to li
        li.appendChild(deleteButton);

        // Append li to the list
        list.appendChild(li);

        // Clear the input and focus back
        input.value = '';
        input.focus();

    } else {
        // Input was empty → just focus back
        alert('Please enter a chapter title.');
        input.focus();
    }
});