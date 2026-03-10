document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const senderNameInput = document.getElementById('sender-name');
    const receiverNameInput = document.getElementById('receiver-name');
    const generateBtn = document.getElementById('generate-btn');
    const resultSection = document.getElementById('result-section');
    const dynamicGreeting = document.getElementById('dynamic-greeting');
    const copyBtn = document.getElementById('copy-btn');
    const baseMessage = document.getElementById('base-message');
    const starsContainer = document.getElementById('stars-container');

    // Generate Background Stars
    function generateStars() {
        const numStars = 50;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random properties
            const size = Math.random() * 3 + 1; // 1px to 4px
            const posX = Math.random() * 100; // 0% to 100% vh/vw
            const posY = Math.random() * 100;
            const delay = Math.random() * 5; // 0s to 5s delay
            const duration = Math.random() * 10 + 10; // 10s to 20s
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}vw`;
            star.style.top = `${posY}vh`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `1s, ${duration}s`; // twinkle, float
            
            starsContainer.appendChild(star);
        }
    }

    // Call once
    generateStars();

    // Generate Wish Event
    generateBtn.addEventListener('click', () => {
        const sender = senderNameInput.value.trim();
        const receiver = receiverNameInput.value.trim();

        if (sender && receiver) {
            // Display the dynamically generated message section
            dynamicGreeting.innerHTML = `With warm wishes from <strong>${sender}</strong> to <strong>${receiver}</strong>.`;
            resultSection.classList.remove('hidden');
            
            // Add a slight scroll to ensure the result is visible on smaller screens
            setTimeout(() => {
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            // Visual feedback if inputs are empty
            if (!sender) {
                senderNameInput.focus();
                senderNameInput.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.5)';
                setTimeout(() => senderNameInput.style.boxShadow = '', 2000);
            } else {
                receiverNameInput.focus();
                receiverNameInput.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.5)';
                setTimeout(() => receiverNameInput.style.boxShadow = '', 2000);
            }
        }
    });

    // Copy to Clipboard Event
    copyBtn.addEventListener('click', () => {
        const sender = senderNameInput.value.trim();
        const receiver = receiverNameInput.value.trim();
        
        if (!sender || !receiver) return;

        // Clean text version of the message formatting
        const textToCopy = `Eid Mubarak! 🌙\n\nAs the blessed month of Ramadan has passed, may Allah accept our fasts, prayers, and all good deeds. May He forgive our sins, grant us His endless mercy, and keep our hearts firm in faith.\n\nMay this Eid bring peace, happiness, and countless blessings to you and your family. Ameen.\n\nWith warm wishes from ${sender} to ${receiver}.`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Success feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `<span>Copied!</span> <i class="fas fa-check"></i>`;
            copyBtn.style.background = 'rgba(212, 175, 55, 0.3)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard.');
        });
    });

    // Handle enter key press to submit
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    };

    senderNameInput.addEventListener('keypress', handleEnter);
    receiverNameInput.addEventListener('keypress', handleEnter);
});
