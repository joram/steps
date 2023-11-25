const jsonUrl = '/modes';

function createServiceElement(service) {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    const imageLink = document.createElement('div');
    imageLink.href = service.url;
    imageLink.classList.add('image-link');

    const image = document.createElement('img');
    image.src = service.image_url;
    image.title = service.name;
    image.classList.add('image');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.textContent = service.description;

    // Add event listener to the image
    imageLink.addEventListener('click', () => {
        fetch("/mode", {
            method: "POST",
            body: JSON.stringify({
                name: service.name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
    });

    // Append elements to the DOM
    imageLink.appendChild(image);
    imageItem.appendChild(imageLink);
    imageItem.appendChild(overlay);
    return imageItem;
}

function render() {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const root = document.getElementById('ListOfModes');

            const imageGrid = document.createElement('imageGrid');
            imageGrid.classList.add('image-grid');
            data.forEach(service => {
                console.log(service)
                const imageItem = createServiceElement(service);
                imageGrid.appendChild(imageItem);
            })
            root.appendChild(imageGrid);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}