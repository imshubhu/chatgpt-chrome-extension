let apiKey;

chrome.storage.local.get("apiKey", function(data) {
    if(data.apiKey){
        apiKey = data.apiKey;
    }
});

window.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      
      let inputField = event.target;
      let inputValue = inputField.value.trim();
      if (inputValue.startsWith('/may')) {
        const question = inputValue.replace('/may ', '').trim();

        if(apiKey === '' || apiKey === undefined){
            alert('API key is required! Enter API key in extension')
            return
        }

        if(question === '' || question === undefined){
            alert('Question is empty. Please add some context to ask MAY AI')
            return
        }

        let data = {
          "model": "gpt-3.5-turbo",
          "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question}
          ]
        }
  
        // Send the question to the ChatGPT API endpoint using the Fetch API
        fetch(`https://api.openai.com/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            inputField.value = ''
            // Display the response from ChatGPT to the user in the text field
            inputField.value += `\n${data.choices[0].message.content}`;
          })
          .catch(error => console.error(error));
      }
  }
});
