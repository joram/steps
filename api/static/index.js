const jsonUrl = '/modes';

function createServiceElement(service) {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    console.log(service.image_background_color)
    imageItem.style.backgroundColor = service.image_background_color; // Correct property assignment

    const imageLink = document.createElement('a'); // Use <a> for semantic links
    imageLink.href = service.url; // Properly assign the href
    imageLink.classList.add('image-link');
    imageLink.target = "_blank"; // Open links in a new tab

    const image = document.createElement('img');
    image.src = service.image_url;
    image.alt = service.name; // Add alt attribute for accessibility
    image.title = service.name;
    image.classList.add('image');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.textContent = service.description;

    // Add event listener to the image link
    imageLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default navigation
        fetch("/mode", {
            method: "POST",
            body: JSON.stringify({ name: service.name }),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Mode set successfully:', data);
            })
            .catch(error => console.error('Error setting mode:', error));
    });

    // Append elements to the DOM
    imageLink.appendChild(image);
    imageItem.appendChild(imageLink);
    imageItem.appendChild(overlay);

    return imageItem;
}

function render() {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const root = document.getElementById('ListOfModes');
            root.innerHTML = ''; // Clear previous content if any

            const imageGrid = document.createElement('div'); // Use <div> instead of invalid <imageGrid>
            imageGrid.classList.add('image-grid');

            data.forEach(service => {
                const imageItem = createServiceElement(service);
                imageGrid.appendChild(imageItem);
            });

            root.appendChild(imageGrid);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
