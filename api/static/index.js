const jsonUrl = '/modes';
function createServiceElement(service) {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');
    imageItem.style.backgroundColor = service.image_background_color;

    const imageLink = document.createElement('a');
    imageLink.href = "#"; // Placeholder URL
    imageLink.classList.add('image-link');


    const image = document.createElement('img');
    image.src = service.image_url;
    image.alt = service.name; // Add alt for accessibility
    image.title = service.name;
    image.classList.add('image');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.textContent = service.description;

    if (service.image_url !== null) {
        imageLink.appendChild(image);
        imageItem.appendChild(imageLink);
    }
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
