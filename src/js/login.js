// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import firebaseApp from './firebase-config';

// document.addEventListener('DOMContentLoaded', () => {
//   const auth = getAuth(firebaseApp);
//   const authButton = document.getElementById('auth-button');
//   const dropdownMenu = document.getElementById('dropdown-menu');
//   const logoutButton = document.getElementById('logout-button');
//   const userDropdown = document.querySelector('.user-dropdown');

//   // Ascultă modificările stării utilizatorului
//   onAuthStateChanged(auth, user => {
//     if (user) {
//       // Dacă utilizatorul este autentificat
//       authButton.textContent = user.displayName || 'User';
//       authButton.dataset.modalOpen = ''; // Elimina opțiunea de deschidere modal
//       authButton.addEventListener('click', () => {
//         userDropdown.classList.toggle('active'); // Afișează/ascunde dropdown-ul
//       });

//       // Funcționalitate Log Out
//       logoutButton.addEventListener('click', async () => {
//         try {
//           await signOut(auth);
//           alert('You have been logged out!');
//           window.location.reload(); // Reîncarcă pagina
//         } catch (error) {
//           console.error('Error during logout:', error);
//         }
//       });
//     } else {
//       // Dacă utilizatorul nu este autentificat
//       authButton.textContent = 'Sign Up';
//       authButton.dataset.modalOpen = 'true'; // Adaugă opțiunea de deschidere modal
//       authButton.addEventListener('click', () => {
//         const modal = document.querySelector('.login-container');
//         modal.classList.add('active'); // Deschide modalul de autentificare
//       });
//     }
//   });
// });
