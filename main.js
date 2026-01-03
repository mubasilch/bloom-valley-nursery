function showMessage(el, msg, type){
  el.textContent = msg;
  el.className = `notice ${type}`;
}

document.getElementById("subscribeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailEl = document.getElementById("email");
  const msgEl = document.getElementById("subscribeMessage");
  const email = emailEl.value.trim();

  // basic validation
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!ok){
    showMessage(msgEl, "Please enter a valid email address.", "error");
    emailEl.focus();
    return;
  }

  // store minimal non-sensitive data
  localStorage.setItem("subscriberEmail", email);
  showMessage(msgEl, "Thanks for subscribing! We’ll send seasonal updates.", "success");
  e.target.reset();
});

// Prefill subscribe email if returning user
(() => {
  const saved = localStorage.getItem("subscriberEmail");
  if(saved && document.getElementById("email")){
    document.getElementById("email").value = saved;
  }
})();

document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("message").value.trim();
  const msgEl = document.getElementById("contactMessage");

  if(name.length < 2){
    showMessage(msgEl, "Name must be at least 2 characters.", "error");
    return;
  }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!ok){
    showMessage(msgEl, "Please enter a valid email address.", "error");
    return;
  }
  if(message.length < 10){
    showMessage(msgEl, "Message must be at least 10 characters.", "error");
    return;
  }

  // save non-sensitive submission
  const payload = { name, email, message, submittedAt: new Date().toISOString() };
  localStorage.setItem("lastContactSubmission", JSON.stringify(payload));

  showMessage(msgEl, "Message sent! We’ll respond as soon as possible.", "success");
  e.target.reset();
});
