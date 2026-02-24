document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('interactive-card');

    // 3D Hover Effect for the Hero Card
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        // Smooth transition back
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            card.style.transition = 'transform 0.1s';
        }, 500);
    });

    // Modal Functionality
    const comenzarBtn = document.getElementById('comenzar-btn');
    const modalOverlay = document.getElementById('comenzar-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const subscribeForm = document.getElementById('subscribe-form');
    const successMsg = document.getElementById('success-msg');

    // Open Modal
    comenzarBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        // Reset form state if it was submitted previously
        subscribeForm.style.display = 'flex';
        successMsg.classList.remove('active');
        subscribeForm.reset();
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close Modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Handle Form Submit
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form submission animation/logic (simulated)
        const submitBtn = subscribeForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            subscribeForm.style.display = 'none';
            successMsg.classList.add('active');

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';

            // Auto close after 3 seconds
            setTimeout(() => {
                if (modalOverlay.classList.contains('active')) {
                    closeModal();
                }
            }, 3000);
        }, 1500);
    });
});
