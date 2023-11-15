
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatbotConversation = document.getElementById(
    "chatbot-conversation"
  );

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userMessage = userInput.value;
    if (!userMessage) return;

    appendMessage("user", userMessage);
    userInput.value = "";

    const response = await fetch("http://localhost:3000/api/get-reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (response.ok) {
      const { replyContent } = await response.json();
      appendMessage("assistant", replyContent);
    } else {
      console.error("Error fetching reply:", response.statusText);
    }
  });

  function appendMessage(role, content) {
    const message = document.createElement("div");
    message.classList.add(
      "message",
      role === "user" ? "user-message" : "assistant-message"
    );
    message.textContent = content;
    chatbotConversation.appendChild(message);
  }
});