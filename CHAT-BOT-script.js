const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatHistory = document.getElementById('chat-history');
    const chatReset = document.getElementById('chat-reset');
    const voiceButton = document.getElementById('voice-button');
    const exportButton = document.getElementById('export-button');
    const capslockWarning = document.getElementById('capslock-warning');
    const interimText = document.getElementById('interim-text');
    let conversationHistory = [];
    let conversationEnded = false;
    const badWords = ['puto', 'puta madre', 'tu perra madre', 'cabrón', 'mierda', 'chingar', 'chingada madre', 'verga', 'madre', 'güey', 'mamá', 'coño', 'joto', 'maricón', 'pendejo', 'naco', 'culero', 'puto el que lee', 'zorra', 'bastardo', 'chinga tu madre', 'puta madre', 'perra madre', 'chinga', 'bomba', 'culera', 'vales verga', 'verga', 'pito', 'caca', 'wey'];
    const intents = [
      // Aquí van tus intenciones (puedes copiar las que ya tenías)
    ];
    const ortografiaCorrecciones = {
      // Aquí van tus correcciones ortográficas (puedes copiar las que ya tenías)
    };
    // Función para detectar si el texto está completamente en mayúsculas
    function isAllCaps(text) {
      return text === text.toUpperCase() && /[A-Z]/.test(text);
    }
    // Función para mostrar/ocultar la advertencia de Caps Lock
    function toggleCapsLockWarning(show) {
      capslockWarning.style.display = show ? 'block' : 'none';
    }
    // Función para obtener respuesta de OpenAI
    async function fetchOpenAIResponse(prompt) {
      try {
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt
          })
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
    // Función para verificar palabras prohibidas
    function checkForBadWords(input) {
      return badWords.some(word => input.toLowerCase().includes(word));
    }
    // Función para añadir mensajes al historial
    function addMessageToHistory(message, sender) {
      if (!message.trim()) return;
      const messageDiv = document.createElement('div');
      messageDiv.className = sender === 'user' ? 'user-message' : 'robot-message';
      const icon = sender === 'user' ?
        `<img src="https://static.wixstatic.com/shapes/56129a_4c0201396e6545dca83cbdda2e47f5d6.svg" class="user-icon"/>` :
        `<img src="https://static.wixstatic.com/shapes/56129a_ce0045acf4924736997d88a954b15bfe.svg" class="robot-icon"/>`;
      messageDiv.innerHTML = `${icon}<span>${message}</span>`;
      chatHistory.appendChild(messageDiv);
      conversationHistory.push({
        text: message,
        sender
      });
      saveConversation();
      chatHistory.scrollTo({
        top: chatHistory.scrollHeight,
        behavior: 'smooth'
      });
    }
    // Función para corregir ortografía
    function corregirOrtografia(texto) {
      let palabras = texto.split(' ');
      palabras = palabras.map(palabra => ortografiaCorrecciones[palabra] || palabra);
      return palabras.join(' ');
    }
    // Función para mostrar el indicador de "escribiendo"
    function showLoadingIndicator() {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'robot-message loading-indicator';
      loadingDiv.textContent = 'Cargando...';
      chatHistory.appendChild(loadingDiv);
    }
    // Función para ocultar el indicador de "escribiendo"
    function hideLoadingIndicator() {
      const loadingDiv = chatHistory.querySelector('.loading-indicator');
      if (loadingDiv) chatHistory.removeChild(loadingDiv);
    }
    // Función para detectar intenciones
    function detectIntent(input) {
      for (const intent of intents) {
        const regex = new RegExp(intent.keywords.join('|'), 'i');
        if (regex.test(input)) {
          return intent;
        }
      }
      return null;
    }
    // Función para procesar la entrada del usuario
    async function processInput() {
      if (conversationEnded) return;
      const userInput = chatInput.value.trim();
      if (!userInput) return;
      if (isAllCaps(userInput)) {
        toggleCapsLockWarning(true);
        return;
      } else {
        toggleCapsLockWarning(false);
      }
      const correctedInput = corregirOrtografia(userInput);
      addMessageToHistory(correctedInput, 'user');
      chatInput.value = '';
      if (checkForBadWords(correctedInput)) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert-message';
        alertDiv.textContent = '⚠️ Lenguaje inapropiado detectado. La conversación ha sido finalizada.';
        chatHistory.appendChild(alertDiv);
        endConversation();
        return;
      }
      const intent = detectIntent(correctedInput);
      if (intent) {
        addMessageToHistory(intent.response, 'robot');
        return;
      }
      showLoadingIndicator();
      try {
        const response = await fetchOpenAIResponse(correctedInput);
        hideLoadingIndicator();
        addMessageToHistory(response, 'robot');
      } catch (error) {
        hideLoadingIndicator();
        addMessageToHistory("⚠️ Error al conectar con OpenAI. Por favor, inténtalo de nuevo más tarde.", 'robot');
      }
    }
    // Función para finalizar la conversación
    function endConversation() {
      conversationEnded = true;
      chatInput.disabled = true;
      chatSubmit.disabled = true;
      chatInput.placeholder = "Conversación terminada.";
    }
    // Función para reiniciar la conversación
    chatReset.addEventListener('click', () => {
      if (confirm("¿Estás seguro de que quieres reiniciar la conversación?")) {
        conversationHistory = [];
        conversationEnded = false;
        chatInput.disabled = false;
        chatSubmit.disabled = false;
        chatInput.placeholder = "Escribe tu mensaje...";
        chatHistory.innerHTML = '';
        toggleCapsLockWarning(false);
        localStorage.removeItem('chatHistory');
      }
    });
    // Función para exportar el historial
    exportButton.addEventListener('click', () => {
      const history = conversationHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
      const blob = new Blob([history], {
        type: 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chat_history.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
    // Función para guardar el historial en localStorage
    function saveConversation() {
      localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    }
    // Función para cargar el historial desde localStorage
    function loadConversation() {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        conversationHistory = JSON.parse(savedHistory);
        conversationHistory.forEach(msg => addMessageToHistory(msg.text, msg.sender));
      }
    }
    // Cargar historial al iniciar
    window.onload = loadConversation;
    // Eventos
    chatSubmit.addEventListener('click', processInput);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') processInput();
    });
    // Reconocimiento de voz
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript = event.results[i][0].transcript.trim();
          chatInput.value = transcript;
          processInput();
        } else {
          transcript = event.results[i][0].transcript;
          interimText.textContent = `Escuchando: ${transcript}`;
        }
      }
    };
    recognition.onend = () => {
      interimText.textContent = '';
      voiceButton.textContent = '🎤';
    };
    recognition.onerror = (event) => {
      console.error("Error en el reconocimiento de voz:", event.error);
      interimText.textContent = 'Error en el reconocimiento de voz.';
      voiceButton.textContent = '🎤';
    };
    voiceButton.addEventListener('click', () => {
      if (recognition.recording) {
        recognition.stop();
        voiceButton.textContent = '🎤';
      } else {
        recognition.start();
        voiceButton.textContent = '🛑';
      }
    });