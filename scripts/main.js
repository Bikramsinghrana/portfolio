/**
 * Portfolio Website - Main JavaScript
 * Handles navigation, scroll effects, and form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on page load

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');

    const highlightActiveNav = () => {
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    // ============================================
    // Contact Form Handling
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create mailto link (fallback for static site)
            const mailtoLink = `mailto:bikramsinghrajput7262@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            window.location.href = mailtoLink;

            // Show success feedback
            alert('Opening your email client to send the message. If it doesn\'t open, please email me directly at bikramsinghrajput7262@gmail.com');
        });
    }

    // ============================================
    // Fast Scroll Reveal Animation (GPU Accelerated)
    // ============================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    // Observe elements that need reveal animation
    document.querySelectorAll('.skill-card, .experience-item').forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });

    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        const toggleScrollButton = () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleScrollButton);
        toggleScrollButton(); // Check on load

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Client-Side Security & Content Protection
    // (Set DEBUG_MODE = true or add ?debug=true in URL to enable Inspect / Right-click)
    // ============================================
    const DEBUG_MODE = false; // <-- Change to true while developing/debugging

    const urlParams = new URLSearchParams(window.location.search);
    const isDebugActive = DEBUG_MODE || urlParams.get('debug') === 'true';

    if (!isDebugActive) {
        // Disable right-click context menu (prevents "Inspect", "Save As", "View Source")
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Disable keyboard shortcuts for DevTools, View Source, and Page Saving
        document.addEventListener('keydown', (e) => {
            // F12 (DevTools)
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                return false;
            }

            const isCtrlOrCmd = e.ctrlKey || e.metaKey;

            if (isCtrlOrCmd) {
                const key = (e.key || '').toLowerCase();

                // Ctrl+U (View Page Source)
                // Ctrl+S (Save Page)
                // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Developer Tools / Inspect)
                if (
                    key === 'u' ||
                    key === 's' ||
                    (e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
                ) {
                    e.preventDefault();
                    return false;
                }

                // Prevent Ctrl+C / Ctrl+A / Ctrl+X outside of editable input/textarea fields
                const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
                if (targetTag !== 'input' && targetTag !== 'textarea') {
                    if (key === 'c' || key === 'a' || key === 'x') {
                        e.preventDefault();
                        return false;
                    }
                }
            }
        });

        // Disable dragging images and text
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });

        // Disable copying outside of form inputs
        document.addEventListener('copy', (e) => {
            const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
            if (targetTag !== 'input' && targetTag !== 'textarea') {
                e.preventDefault();
                return false;
            }
        });
    } else {
        console.warn('⚠️ DEBUG MODE IS ACTIVE: Right-click, Inspect, and shortcuts are enabled for debugging.');
    }

    console.log('Portfolio website loaded successfully! 🚀');
});
