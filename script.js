
// const output = document.getElementById("output");
// const btn = document.getElementById("download-images-button");

// const images = [
//   { url: "https://picsum.photos/id/237/200/300" },
//   { url: "https://picsum.photos/id/238/200/300" },
//   { url: "https://picsum.photos/id/239/200/300" },
// ];

// btn.addEventListener("click", () => {
//   const downloadImage = (image) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = image.url;
//       img.onload = () => resolve(img); 
//       img.onerror = () => reject(new Error(Failed to load image's URL: ${image.url}));
//     });
//   };

//   Promise.all(images.map(downloadImage))
//     .then((loadedImages) => {
//       output.innerHTML = "";
//       loadedImages.forEach((img) => output.appendChild(img));
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// });

const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", () => {
  // Clear previous content and show a loading spinner
  output.innerHTML = '<div id="loading">Loading...</div>';

  // Function to download an image
  const downloadImage = (image) => {
    return new Promise((resolve, reject) => {
      const img = new Image(); // Create a new image element
      img.src = image.url;    // Set the image source
      img.onload = () => resolve(img); // Resolve when the image is loaded
      img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`)); // Reject on error
    });
  };

  // Use Promise.all to download all images in parallel
  Promise.all(images.map(downloadImage))
    .then((loadedImages) => {
      // Clear the loading spinner
      document.getElementById("loading").remove();

      // Display all the images
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      // Clear the loading spinner
      document.getElementById("loading").remove();

      // Display an error message
      const errorDiv = document.createElement("div");
      errorDiv.id = "error";
      errorDiv.textContent = error.message;
      output.appendChild(errorDiv);
    });
});
