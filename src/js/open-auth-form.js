import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import firebaseApp from './firebase-config';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.login-container');
  const openModalButton = document.querySelector('.sign-up-button');
  const closeModalButton = document.querySelector('.login-close');
  const signUpForm = document.querySelector('.login-form');
  const nameInput = document.getElementById('name-field');
  const emailInput = document.getElementById('email-field');
  const passwordInput = document.getElementById('password-field');
  const actionButton = document.getElementById('action-button');
  const toggleAuthButton = document.getElementById('toggle-auth');
  const nameFieldWrapper = document.getElementById('name-field-wrapper');
  const authButton = document.getElementById('auth-button');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const logoutButton = document.getElementById('logout-button');
  const userDropdown = document.querySelector('.user-dropdown');

  const auth = getAuth(firebaseApp);

  const openModal = () => {
    modal.classList.add('active');
    nameFieldWrapper.style.display = 'block';
    nameInput.required = true;
    actionButton.textContent = 'Sign Up';
    toggleAuthButton.textContent = 'Switch to Log In';
  };

  if (openModalButton) {
    openModalButton.addEventListener('click', () => {
      if (!auth.currentUser) {
        openModal();
      } else {
        userDropdown.classList.toggle('active');
      }
    });
  }

  closeModalButton.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  toggleAuthButton.addEventListener('click', () => {
    if (actionButton.textContent === 'Sign Up') {
      nameFieldWrapper.style.display = 'none';
      nameInput.required = false;
      actionButton.textContent = 'Log In';
      toggleAuthButton.textContent = 'Switch to Sign Up';
    } else {
      nameFieldWrapper.style.display = 'block';
      nameInput.required = true;
      actionButton.textContent = 'Sign Up';
      toggleAuthButton.textContent = 'Switch to Log In';
    }
  });

  signUpForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const name = nameInput.value.trim();

    if (actionButton.textContent === 'Sign Up') {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (name) {
          await updateProfile(userCredential.user, {
            displayName: name,
          });
        }
        alert(`Account created successfully for ${email}!`);
        modal.classList.remove('active');
      } catch (error) {
        alert(`Sign Up failed: ${error.message}`);
      }
    } else if (actionButton.textContent === 'Log In') {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert(`Welcome back, ${userCredential.user.email}!`);
        modal.classList.remove('active');
      } catch (error) {
        alert(`Log In failed: ${error.message}`);
      }
    }
  });

  onAuthStateChanged(auth, user => {
    if (user) {
      // Dacă utilizatorul este autentificat
      authButton.textContent = user.displayName || 'User';
      authButton.classList.add('user-name');
      dropdownMenu.classList.remove('hidden'); // Asigură-te că dropdown-ul nu este ascuns

      // Elimină orice eveniment existent pe authButton și adaugă funcționalitatea dropdown
      authButton.onclick = () => {
        dropdownMenu.classList.toggle('active');
      };
    } else {
      // Dacă utilizatorul nu este autentificat
      authButton.textContent = 'Sign Up';
      authButton.classList.remove('user-name');
      dropdownMenu.classList.add('hidden'); // Ascunde dropdown-ul dacă nu este conectat

      // Deschide modalul de autentificare
      authButton.onclick = () => {
        openModal();
      };
    }
  });

  logoutButton.addEventListener('click', async () => {
    try {
      await signOut(auth);
      alert('You have been logged out!');
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
});
