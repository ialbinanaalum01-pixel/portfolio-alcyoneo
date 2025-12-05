// Small script: countdown + email capture
(function(){
  const LAUNCH_DAYS = 30; // adjust as needed
  const launchDate = new Date(Date.now() + LAUNCH_DAYS*24*60*60*1000);

  const countdownEl = document.getElementById('countdown');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById('email');
  const messageEl = document.getElementById('form-message');

  function pad(n){return String(n).padStart(2,'0')}

  function updateCountdown(){
    const now = new Date();
    const diff = launchDate - now;
    if(diff <= 0){
      countdownEl.textContent = 'We have launched!';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff/ (1000*60)) % 60);
    const secs = Math.floor((diff/1000) % 60);
    countdownEl.textContent = `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();

  yearEl.textContent = new Date().getFullYear();

  function isValidEmail(email){
    return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = emailInput.value.trim();
    if(!isValidEmail(email)){
      messageEl.textContent = 'Please enter a valid email address.';
      return;
    }
    try{
      // In a real site you'd POST this to your backend or email provider.
      localStorage.setItem('subscribedEmail', email);
      messageEl.textContent = 'Thanks — we\'ll notify you at ' + email + '.';
      emailInput.value = '';
    }catch(err){
      messageEl.textContent = 'Unable to save your email locally. Please try again.';
    }
  });
})();
