// contact.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== تهيئة المتغيرات العالمية ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contactForm');
    const mapModal = document.getElementById('mapModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const openMapBtn = document.querySelector('.open-map');
    const modalCloses = document.querySelectorAll('.modal-close');
    const closeConfirmationBtn = document.querySelector('.close-confirmation');
    const contactBubbles = document.querySelectorAll('.contact-bubble');

    // ========== وظيفة القائمة المتنقلة ==========
    function initMobileMenu() {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ========== وظيفة الأسئلة الشائعة ==========
    function initFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        });
    }

    // ========== وظيفة الفقاعات العائمة ==========
    function initContactBubbles() {
        contactBubbles.forEach(bubble => {
            bubble.addEventListener('click', function() {
                const type = this.classList[1]; // bubble-1, bubble-2, etc.
                
                switch(type) {
                    case 'bubble-1':
                        window.open('https://api.whatsapp.com/send?phone=201080901957', '_blank');
                        break;
                    case 'bubble-2':
                        window.location.href = 'tel:+201080901957';
                        break;
                    case 'bubble-3':
                        window.location.href = 'mailto:info@itd-academy.tech';
                        break;
                }
            });
        });
    }

    // ========== وظيفة إدارة المودالات ==========
    function initModals() {
        // فتح مودال الخريطة
        openMapBtn.addEventListener('click', function() {
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // إغلاق جميع المودالات
        modalCloses.forEach(closeBtn => {
            closeBtn.addEventListener('click', closeAllModals);
        });

        // إغلاق مودال التأكيد
        closeConfirmationBtn.addEventListener('click', closeAllModals);

        // إغلاق بالنقر خارج المحتوى
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', closeAllModals);
        });

        // إغلاق بالزر ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
    }

    function closeAllModals() {
        mapModal.classList.remove('active');
        confirmationModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========== وظيفة نموذج التواصل ==========
    function initContactForm() {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة البيانات
            if (validateForm()) {
                // محاكاة إرسال البيانات
                simulateFormSubmission();
            }
        });

        // إضافة تحقق فوري للحقول
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // مسح أي أخطاء سابقة
        clearFieldError(field);
        
        // التحقق من الحقول المطلوبة
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'هذا الحقل مطلوب');
            isValid = false;
        }
        
        // تحقق إضافي حسب نوع الحقل
        if (value) {
            switch(field.type) {
                case 'email':
                    if (!isValidEmail(value)) {
                        showFieldError(field, 'البريد الإلكتروني غير صحيح');
                        isValid = false;
                    }
                    break;
                case 'tel':
                    if (!isValidPhone(value)) {
                        showFieldError(field, 'رقم الهاتف غير صحيح');
                        isValid = false;
                    }
                    break;
            }
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#EF4444';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#EF4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
    }

    function clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function simulateFormSubmission() {
        // إظهار حالة التحميل
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // محاكاة إرسال البيانات إلى الخادم
        setTimeout(() => {
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // إعادة حالة الزر
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // إظهار مودال التأكيد
            confirmationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // تتبع التحويل (يمكن إضافة Google Analytics هنا)
            console.log('Form submitted successfully');
            
        }, 2000);
    }

    // ========== وظيفة تأثيرات التمرير ==========
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.method-card, .faq-item, .info-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ========== وظائف إضافية ==========
    function initAdditionalFeatures() {
        // نسخ معلومات الاتصال عند النقر
        const contactDetails = document.querySelectorAll('.contact-detail');
        contactDetails.forEach(detail => {
            detail.style.cursor = 'pointer';
            detail.addEventListener('click', function() {
                const textToCopy = this.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('تم نسخ النص: ' + textToCopy);
                });
            });
        });

        // تتبع النقرات على أزرار التواصل
        document.querySelectorAll('a[href*="whatsapp"], a[href*="tel"], a[href*="mailto"]').forEach(link => {
            link.addEventListener('click', function() {
                const platform = this.href.includes('whatsapp') ? 'WhatsApp' :
                              this.href.includes('tel') ? 'Phone' : 'Email';
                console.log(`Contact via ${platform} clicked`);
            });
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            z-index: 1000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // ========== تهيئة جميع الوظائف ==========
    function init() {
        initMobileMenu();
        initFAQ();
        initContactBubbles();
        initModals();
        initContactForm();
        initScrollAnimations();
        initAdditionalFeatures();

        console.log('ITD Academy - Contact Page Initialized');
    }

    // تشغيل التهيئة
    init();
});

// تأثيرات إضافية
document.addEventListener('DOMContentLoaded', function() {
    // تأثيرات Hover على بطاقات التواصل
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // تحميل سلس لروابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});