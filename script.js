const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const API_KEY = "AIzaSyBmd1ZirVSQIZEOtMPcnyCBdKAhP6ViqDw";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "incoming" ? `<span class="material-symbols-outlined"><img src="happy.png" alt="Bot Avatar" class="bot-image-avatar"></span><p></p>` : `<p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = async (incomingChatLi) => {
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";
const messageElement = incomingChatLi.querySelector("p");

const requestOptions = {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY
  },
  body: JSON.stringify({ 
    contents: [{ 
      role: "user", 
      parts: [{ text: userMessage }] 
    }] 
  }),
};

try {
    const response = await fetch(API_URL, requestOptions);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    messageElement.textContent = reply || "No response available.";
} catch (error) {
    messageElement.classList.add("error");
    messageElement.textContent = "Unable to reach the AI service.";
} finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
}
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
// Adjust the height of the input textarea based on its content
chatInput.style.height = `${inputInitHeight}px` ;
chatInput. style.height = `${chatInput.scrollHeight}px` ;

});

chatInput.addEventListener("keyup", (e) => {
// If Enter key is pressed without Shift key and the window
// width is greater than 800px, handle the chat
if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
e.preventDefault();
handleChat();

}
});


sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));