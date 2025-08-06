// main.js

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== Refresh the page when click on "Pratyush Gautam" ====================*/

/*
document.addEventListener('DOMContentLoaded', function() {
    var logoLink = document.getElementById('logo-link');

    logoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link action
        window.scrollTo(0, 0); // Scroll to the top
        setTimeout(function() {
            location.reload(); // Reload the page after scrolling
        }, 0); // Set a timeout of 0 milliseconds to ensure scroll happens before refresh
    });
});
*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 100,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });
sr.reveal(".contact-item", { interval: 200 });

// ========================== Akira chatbot Js File ===================

function handleNewChat() {
  const messages = document.getElementById("akira-messages");
  messages.innerHTML = ""; // Clear old chat

  document.getElementById("akira-user-input").value = ""; // Clear input

  // Remove quick start buttons if they exist
  const quickList = document.getElementById("akira-quick-start");
  if (quickList) quickList.remove();

  startNewChat(); // 🔁 Trigger animated greeting
}


function hideDropdownAndStartNewChat() {
  document.querySelector(".ak-dropdown").classList.add("ak-hidden");
  handleNewChat(); // ⬅️ Your function that clears and starts fresh
}

function hideDropdownAndCloseChat() {
  document.querySelector(".ak-dropdown").classList.add("ak-hidden");
  closeChat(); // ⬅️ Your existing close function
}


// Start a fresh conversation
function startNewChat() {
  const messages = document.getElementById("akira-messages");

  // Step 1: Add animated greeting container
  messages.innerHTML = `
    <div class="ak-msg bot fade-slide-in">
      <img src="assets/img/akira-icon.png" class="ak-avatar" alt="Akira" />
      <div class="ak-greeting" id="akira-greeting"></div>
    </div>
  `;

  // Step 2: Typing effect for greeting
  const greetingText = "Hey there! 👋 I'm Akira, your virtual assistant.";
  const greetingEl = document.getElementById("akira-greeting");
  let index = 0;

  const typingInterval = setInterval(() => {
    greetingEl.innerHTML += greetingText.charAt(index);
    index++;
    if (index === greetingText.length) {
      clearInterval(typingInterval);

      // Step 3: Follow-up question block
      setTimeout(() => {
        messages.innerHTML += `
          <div class="ak-msg bot fade-slide-in">
            <img src="assets/img/akira-icon.png" class="ak-avatar" alt="Akira" />
            <div class="ak-bubble">
              <strong>Choose an option below or write your own:</strong>
            </div>
          </div>

          <!-- Vertical Quick Start Questions -->
          <div class="ak-quick-list-vertical" id="akira-quick-start">
            <div class="ak-quick-box" onclick="handleFollowUp('👨‍💼 Tell me about pratyush?')">👨‍💼 Tell me about pratyush? (Quick intro)</div>
            <div class="ak-quick-box" onclick="handleFollowUp('🤖 what are your capabilities?')">🤖 what are your capabilities?</div>
            <div class="ak-quick-box" onclick="handleFollowUp('🌐 What are some latest News globally?')">🌐 What are some latest News globally??</div>
            <div class="ak-quick-box" onclick="handleFollowUp('👻 Tell me a funny joke')">👻 Tell me a funny joke.</div>
          </div>
        `;
        document.getElementById("akira-intent").value = "all";

        setTimeout(() => {
          document.querySelector(".ak-dropdown").classList.add("ak-hidden");
          document.getElementById("akira-quick-start").classList.add("ak-show-quick");
          messages.scrollTop = messages.scrollHeight;
        }, 100);
      }, 500); // after greeting finishes
    }
  }, 35); // speed per character
}



// Close chat window with animation
function closeChat() {
  const chatbox = document.getElementById("akira-chatbox");
  const toggle = document.getElementById("akira-toggle");
  const dropdown = document.querySelector(".ak-dropdown");

  chatbox.classList.add("slide-diagonal-out");
  dropdown.classList.add("ak-hidden");

  setTimeout(() => {
    document.querySelector(".ak-dropdown").classList.add("ak-hidden");
    chatbox.classList.add("akira-hidden");
    chatbox.classList.remove("slide-diagonal-out");
    toggle.style.display = "block";
  }, 400);
}

// ✅ Open chat window with animation
function startChatWithAnimation() {
  const chatbox = document.getElementById("akira-chatbox");
  const toggle = document.getElementById("akira-toggle");

  chatbox.classList.remove("akira-hidden");
  chatbox.classList.add("bounce-back");
  toggle.style.display = "none";

  // Remove animation class after animation completes
  setTimeout(() => {
    chatbox.classList.remove("bounce-back");
  }, 500); // matches animation duration
}

// Format current time (e.g. 06:27 PM)
function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function stopWelcomeTyping() {
  if (welcomeTypingInterval) {
    clearInterval(welcomeTypingInterval);
    welcomeTypingInterval = null;
  }

  const welcomeEl = document.querySelector(".ak-welcome-bubble");
  if (welcomeEl) {
    welcomeEl.classList.remove("typing");
  }
}

function showWaitWarning(show) {
  let warningEl = document.getElementById("akira-wait-warning");

  if (!warningEl) {
    warningEl = document.createElement("div");
    warningEl.id = "akira-wait-warning";
    warningEl.style.color = "red";
    warningEl.style.fontSize = "12px";
    warningEl.style.marginTop = "4px";
    warningEl.textContent = "⏳ Please wait for the response before sending another prompt.";
    document.getElementById("akira-input-section").appendChild(warningEl);
  }

  warningEl.style.display = show ? "block" : "none";
}


// Bot loading animation phrases
const loadingPhrases = [
"Brewing some thoughts... ☕",
  "Revving Akira’s engines… here we go! 🚀",
  "Crafting something extraordinary ✨",
  "Hang tight... the magic is coming 💫",
  "Polishing data gems... almost there! 💎",
  "Calibrating responses… almost done ⚙️",
];

// Once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("akira-toggle");
  const chatbox = document.getElementById("akira-chatbox");
  const container = document.getElementById("akira-container");
  const menuIcon = document.querySelector(".ak-menu");
  const dropdown = document.querySelector(".ak-dropdown");

  // Toggle chat open/close
  let firstOpen = true; // ✅ Track if this is the first time chat is opened

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (chatbox.classList.contains("akira-hidden")) {
      startChatWithAnimation();

      // ✅ If first time opening after refresh, show welcome + questions
      if (firstOpen) {
        startNewChat(); // ← your existing function
        firstOpen = false;
      }
    } else {
      closeChat();
    }
  });

  // Show/hide dropdown when clicking ⋮
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("ak-hidden");
  });

  // ✅ Click outside the whole chatbot → close chatbox and dropdown
  document.addEventListener("click", (e) => {
    const clickedOnFollowUp = e.target.classList.contains("ak-follow-up");
    const clickedOnQuickBox = e.target.classList.contains("ak-quick-box");

    if (
      !container.contains(e.target) &&
      !clickedOnFollowUp &&
      !clickedOnQuickBox
    ) {
      chatbox.classList.add("akira-hidden");
      toggle.style.display = "block";
      dropdown.classList.add("ak-hidden");
    }
  });

  // ✅ Click anywhere inside chatbot BUT outside dropdown → close dropdown
  chatbox.addEventListener("click", (e) => {
    const isInsideDropdown = dropdown.contains(e.target);
    const isMenuIcon = menuIcon.contains(e.target);
    if (!isInsideDropdown && !isMenuIcon) {
      dropdown.classList.add("ak-hidden");
    }
  });
});

// Send user message + get bot response
function sendAkiraMessage() {
  const input = document.getElementById("akira-user-input");
  const sendBtn = document.getElementById("akira-send-btn");
  const messages = document.getElementById("akira-messages");
  const question = input.value.trim();
  if (!question) return;

  // 🔴 Disable input & show red spinner
  input.disabled = true;
  sendBtn.disabled = true;
  sendBtn.innerHTML = `<span class="red-spinner"></span>`;

  // Show user message
  messages.innerHTML += `
    <div class="ak-msg user">
      <div class="ak-bubble">${question}</div>
      <img src="assets/img/user-avatar.png" class="ak-avatar" alt="User" />
    </div>
  `;
  input.value = "";

  // Bot loading message
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("ak-msg", "bot");
  loadingDiv.innerHTML = `
    <img src="assets/img/akira-avtar.png" class="ak-avatar" alt="Akira" />
    <div class="ak-bubble">
      🔄 ${loadingPhrases[0]}
      <div class="typing-bubbles"><span></span><span></span><span></span></div>
    </div>
  `;
  messages.appendChild(loadingDiv);
  messages.scrollTop = messages.scrollHeight;

  let loadingIndex = 0;
  let dotCount = 0;
  let currentPhrase = loadingPhrases[loadingIndex];

  const loadingInterval = setInterval(() => {
    loadingDiv.querySelector(".ak-bubble").innerHTML = `
      🔄 ${currentPhrase}
      <div class="typing-bubbles"><span></span><span></span><span></span></div>
    `;
    dotCount++;
    if (dotCount % 3 === 0) {
      loadingIndex = (loadingIndex + 1) % loadingPhrases.length;
      currentPhrase = loadingPhrases[loadingIndex];
    }
  }, 1000);

  const selectedIntent = document.getElementById("akira-intent").value;

  fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: question,
      session_id: "default_user",
      source: selectedIntent,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      clearInterval(loadingInterval);
      loadingDiv.remove();

      const reply = data.answer || "Sorry, I didn't get that.";
      const time = getFormattedTime();
      const confidence = data.confidence || "mid";

      const responseHTML = `
        <div class="ak-msg bot">
          <img src="assets/img/akira-avtar.png" class="ak-avatar" alt="Akira" />
          <div class="ak-bubble">
            <div class="ak-answer">${marked.parse(reply)}</div>
            <div class="ak-meta">
              ${time}
              &nbsp;&nbsp;
              <span class="confidence ${confidence.toLowerCase()}">Confidence: ${confidence}</span>
              &nbsp;&nbsp;
              <span class="retry-link" onclick="sendAkiraMessage()">Retry prompt</span>
            </div>
            ${generateReferences(data.references || data.url || [])}
            ${generateFeedback()}
            ${generateSuggestions(data.follow_up_questions || [])}
          </div>
        </div>
      `;
      messages.innerHTML += responseHTML;
      messages.scrollTop = messages.scrollHeight;
    })
    .catch(() => {
      clearInterval(loadingInterval);
      loadingDiv.remove();
      messages.innerHTML += `
        <div class="ak-msg bot">
          <img src="assets/img/akira-avtar.png" class="ak-avatar" alt="Akira" />
          <div class="ak-bubble"><em>Oops! Akira is offline.</em></div>
        </div>`;
    })
    .finally(() => {
      // ✅ Re-enable input & button
      input.disabled = false;
      sendBtn.disabled = false;
      sendBtn.innerHTML = "➤";
      input.focus();
    });
}




// Generate references list
function generateReferences(refs) {
  if (typeof refs === "string") {
    return `<div class="ak-links"><strong>References:</strong><ul><li><a href="${refs}" target="_blank">${refs}</a></li></ul></div>`;
  }
  if (!refs || refs.length === 0) return "";
  return `<div class="ak-links"><strong>References:</strong><ul>${refs
    .map(
      (r, i) => `<li>[${i + 1}] <a href="${r}" target="_blank">${r}</a></li>`
    )
    .join("")}</ul></div>`;
}

// Generate suggested follow-up questions
function generateSuggestions(followUps) {
  if (!followUps.length) return "";
  return `
    <div class="follow-up-section">
      <strong>Suggested Questions:</strong>
      <ul>
        ${followUps
          .map(
            (q) =>
              `<li class="ak-follow-up" onclick="handleFollowUp('${q.replace(
                /'/g,
                "\\'"
              )}')">${q}</li>`
          )
          .join("")}
      </ul>
    </div>`;
}

// Generate feedback section
function generateFeedback() {
  return `
    <div class="ak-feedback">
      <strong>Feedback:</strong> Was this helpful?
      <button onclick="submitFeedback(true, event)">👍</button>
      <button onclick="submitFeedback(false, event)">👎</button>


    </div>`;
}

// Handle follow-up click
function handleFollowUp(q) {
  document.getElementById("akira-user-input").value = q;
  sendAkiraMessage();
}

// Submit thumbs up/down feedback
// function submitFeedback(isLiked) {
//   fetch("http://localhost:8000/feedback", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       question: "previous",
//       response: "previous",
//       is_liked: isLiked,
//       session_id: "default_user",
//       source: "web",
//     }),
//   }).then(() => {
//     const last = document.querySelector(
//       "#akira-messages .ak-msg.bot:last-child .ak-feedback"
//     );
//     if (last) last.innerHTML += "<div>✅ Feedback submitted!</div>";
//   });
// }

function submitFeedback(isLiked, event) {
  event.stopPropagation(); // 🛑 Stop the click from closing chatbox

  const lastFeedbackDiv = document.querySelector(
    "#akira-messages .ak-msg.bot:last-child .ak-feedback"
  );

  if (!lastFeedbackDiv) return;

  // Disable buttons and show loading state
  const buttons = lastFeedbackDiv.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
  });

  lastFeedbackDiv.innerHTML += `<div class="ak-feedback-status">⏳ Submitting feedback...</div>`;

  fetch("http://localhost:8000/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: "previous",
      response: "previous",
      is_liked: isLiked,
      session_id: "default_user",
      source: "web",
    }),
  })
    .then(() => {
      const statusEl = lastFeedbackDiv.querySelector(".ak-feedback-status");
      if (statusEl) {
        statusEl.innerHTML = "✅ Feedback submitted!";
        statusEl.style.color = "green";
        statusEl.style.marginTop = "4px";
      }
    })
    .catch(() => {
      const statusEl = lastFeedbackDiv.querySelector(".ak-feedback-status");
      if (statusEl) {
        statusEl.innerHTML = "❌ Failed to submit feedback.";
        statusEl.style.color = "red";
      }
    });
}
