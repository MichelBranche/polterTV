// Vercel Web Analytics initialization
// This script initializes Vercel Web Analytics for the PolterTV project

(function() {
  // Initialize the analytics queue
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };

  // Load the analytics script
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Add script to document
  if (document.head) {
    document.head.appendChild(script);
  } else {
    // Fallback if head is not ready
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(script);
    });
  }
})();
