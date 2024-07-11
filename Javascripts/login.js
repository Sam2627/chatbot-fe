import config from './config.js';

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.querySelector('.sign-up form');

registerBtn.addEventListener('click', () => {
  container.classList.add("active"); 
  registerBtn.classList.add('active'); 
  loginBtn.classList.remove('active');  
});

loginBtn.addEventListener('click', () => {
  container.classList.remove("active");
  loginBtn.classList.add('active');   
  registerBtn.classList.remove('active'); 
});

// Signup form submission
signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const userName = signUpForm.querySelector('input[placeholder="Name"]').value;
  const email = signUpForm.querySelector('input[type="email"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch(`${config.apiUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_name: userName, email, password }) 
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User created:', data);

      container.classList.remove("active");
      loginBtn.classList.add('active');   
      registerBtn.classList.remove('active'); 

    //   showSuccessMessage();
      
      signUpForm.reset(); 
    } else {
      const errorData = await response.json();
      console.error('Signup error:', errorData);
      alert(errorData.error || 'Failed to sign up');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('An error occurred during signup');
  }
});
