// These are the elements from the dom.html that is used for this js
const input = document.querySelector('#favchap');  
const button = document.querySelector('#addBtn'); 
const list = document.querySelector('#list');     

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