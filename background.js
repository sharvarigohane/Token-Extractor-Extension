// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendData") {
    sendData(message.data);
  }
  console.log('Received message:', message);
});

// Function to send data to localhost:3000
function sendData(data) {
  fetch('http://localhost:3009/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('Success:', data))
  .catch(error => {
    console.log('Error:', error);
  });
}
