// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    keyboard: {
        enabled: true,
    },
    mousewheel: {
        invert: true,
    },
    on: {
        init: function () {
            console.log('Swiper initialized successfully');
            // Add active class to first slide
            this.slides[this.activeIndex].classList.add('swiper-slide-active');
        },
        slideChange: function () {
            // Remove active class from all slides
            this.slides.forEach(slide => {
                slide.classList.remove('swiper-slide-active');
            });
            // Add active class to current slide
            this.slides[this.activeIndex].classList.add('swiper-slide-active');
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.text-content, .floating-shapes, .image-container, .code-window');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add click handlers for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Add scroll to next section functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        swiper.update();
    }, 250);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        swiper.slideNext();
    } else if (e.key === 'ArrowLeft') {
        swiper.slidePrev();
    }
});

console.log('ITD Academy Hero Slider loaded successfully!');

// end session hero


// إضافة هذا الكود لتفعيل الفيديو
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء نافذة الفيديو
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-modal__content">
            <button class="video-modal__close">
                <i class="fas fa-times"></i>
            </button>
            <iframe src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(videoModal);

    // تفعيل أزرار التشغيل
    const playButtons = document.querySelectorAll('.play-btn');
    const closeButton = videoModal.querySelector('.video-modal__close');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            const iframe = videoModal.querySelector('iframe');
            iframe.src = videoUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // إغلاق نافذة الفيديو
    closeButton.addEventListener('click', function() {
        videoModal.classList.remove('active');
        const iframe = videoModal.querySelector('iframe');
        iframe.src = '';
        document.body.style.overflow = '';
    });

    // إغلاق عند النقر خارج المحتوى
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            const iframe = videoModal.querySelector('iframe');
            iframe.src = '';
            document.body.style.overflow = '';
        }
    });

    // تفعيل Swiper
    const studentsSwiper = new Swiper('.studentsSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
});


// إضافة هذا الكود لتفعيل عدادات الإحصائيات
document.addEventListener('DOMContentLoaded', function() {
    // عدادات الإحصائيات
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const suffix = statNumber.textContent.includes('%') ? '%' : '+';
                const duration = 2000; // مدة العد بالمللي ثانية
                const step = target / (duration / 16); // 60 frame per second
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current) + suffix;
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // تأثيرات hover إضافية
    const reasonBoxes = document.querySelectorAll('.reason-box');
    
    reasonBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff, #f8fafc)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
    });
});



// إضافة هذا الكود لتفعيل التفاعلات
document.addEventListener('DOMContentLoaded', function() {
    // تأثيرات عند التمرير
    const stepCards = document.querySelectorAll('.step-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.3 });
    
    stepCards.forEach(card => observer.observe(card));
    
    // تأثيرات hover للخطوات
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const stepNum = this.getAttribute('data-step');
            const icon = this.querySelector('.step-icon');
            const num = this.querySelector('.header-num');
            
            // تأثير اهتزاز خفيف
            icon.style.animation = 'bounce 0.6s ease';
            num.style.animation = 'pulse 0.6s ease';
            
            setTimeout(() => {
                icon.style.animation = '';
                num.style.animation = '';
            }, 600);
        });
        
        // إضافة فئة active عند النقر
        card.addEventListener('click', function() {
            stepCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // تأثير الزر اللامع
    const shineBtn = document.querySelector('.success-steps_link');
    if (shineBtn) {
        setInterval(() => {
            shineBtn.querySelector('.btn-shine').style.animation = 'shine 3s ease-in-out infinite';
        }, 4000);
    }
});

// إضافة animation إضافية
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0) scale(1); }
        40% { transform: translateY(-10px) scale(1.1); }
        80% { transform: translateY(-5px) scale(1.05); }
    }
    
    @keyframes shine {
        0% { right: -100%; }
        50% { right: 100%; }
        100% { right: 100%; }
    }
    
    .step-card.active {
        border-color: #1C8A44;
        box-shadow: 0 15px 40px rgba(28, 138, 68, 0.2) !important;
    }
    
    .step-card.active .step-icon {
        animation: bounce 0.6s ease;
    }
`;
document.head.appendChild(style);
// إضافة هذا الكود لتفعيل Swiper والتأثيرات
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل Swiper
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // تفعيل أزرار "مفيد"
    const helpfulButtons = document.querySelectorAll('.helpful-btn');
    
    helpfulButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                icon.className = 'far fa-thumbs-up';
                text.textContent = 'مفيد';
            } else {
                this.classList.add('active');
                icon.className = 'fas fa-thumbs-up';
                text.textContent = 'مفيد!';
                
                // تأثير اهتزاز
                this.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    });

    // تأثيرات عند التمرير
    const reviewCards = document.querySelectorAll('.review-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.3 });
    
    reviewCards.forEach(card => observer.observe(card));

    // عدادات الإحصائيات
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = statNumber.textContent;
                const isPercentage = target.includes('%');
                const isTime = target.includes('/');
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
                
                let current = 0;
                const duration = 2000;
                const step = numericValue / (duration / 16);
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (isPercentage) {
                        statNumber.textContent = Math.floor(current) + '%';
                    } else if (isTime) {
                        statNumber.textContent = Math.floor(current) + '/7';
                    } else {
                        statNumber.textContent = Math.floor(current) + '+';
                    }
                }, 16);
                
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
});

// إضافة animation إضافية
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: scale(1); }
        40% { transform: scale(1.1); }
        80% { transform: scale(1.05); }
    }
    
    .review-card:hover .reviewer-avatar img {
        animation: bounce 0.6s ease;
    }
`;
document.head.appendChild(style);

// تفعيل البحث والتصفية في الأسئلة الشائعة
document.addEventListener('DOMContentLoaded', function() {
    // عناصر البحث
    const searchInput = document.getElementById('faqSearch');
    const searchResults = document.getElementById('searchResults');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqRows = document.querySelectorAll('.faq__row');

    // تصفية حسب الفئة
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // تحديث الأزرار النشطة
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // تصفية الأسئلة
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                    setTimeout(() => {
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        cat.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // وظيفة البحث
    function performSearch(query) {
        const results = [];
        
        faqRows.forEach(row => {
            const question = row.querySelector('.question-text').textContent.toLowerCase();
            const answer = row.querySelector('.answer-content').textContent.toLowerCase();
            const questionElement = row.closest('.faq-category');
            
            if (question.includes(query) || answer.includes(query)) {
                results.push({
                    element: row,
                    category: questionElement
                });
            }
        });
        
        return results;
    }

    // عرض نتائج البحث
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">لم نجد نتائج تطابق بحثك</div>';
        } else {
            results.forEach(result => {
                const questionText = result.element.querySelector('.question-text').textContent;
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="result-question">${questionText}</div>
                `;
                
                resultItem.addEventListener('click', function() {
                    // إظهار الفئة المناسبة
                    const category = result.category.getAttribute('data-category');
                    const categoryBtn = document.querySelector(`[data-category="${category}"]`);
                    if (categoryBtn) categoryBtn.click();
                    
                    // فتح السؤال
                    const toggle = result.element.querySelector('.faq__toggle');
                    toggle.checked = true;
                    
                    // إخفاء نتائج البحث
                    searchResults.classList.remove('active');
                    searchInput.value = '';
                    
                    // التمرير إلى السؤال
                    result.element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                });
                
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('active');
    }

    // حدث البحث
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length > 2) {
            const results = performSearch(query);
            displaySearchResults(results);
        } else {
            searchResults.classList.remove('active');
        }
    });

    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // تأثيرات عند فتح الأسئلة
    faqRows.forEach(row => {
        const toggle = row.querySelector('.faq__toggle');
        const question = row.querySelector('.faq__question');
        
        toggle.addEventListener('change', function() {
            if (this.checked) {
                row.style.background = 'linear-gradient(135deg, #f8fafc, #ffffff)';
                row.style.borderColor = '#1C8A44';
            } else {
                row.style.background = 'white';
                row.style.borderColor = 'rgba(226, 232, 240, 0.8)';
            }
        });
        
        // تأثير hover إضافي
        question.addEventListener('mouseenter', function() {
            if (!toggle.checked) {
                row.style.transform = 'translateY(-2px)';
            }
        });
        
        question.addEventListener('mouseleave', function() {
            if (!toggle.checked) {
                row.style.transform = 'translateY(0)';
            }
        });
    });

    // إضافة أنيميشن للنتائج
    const style = document.createElement('style');
    style.textContent = `
        .search-result-item {
            padding: 15px 20px;
            border-bottom: 1px solid #e2e8f0;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-result-item:hover {
            background: #f8fafc;
            padding-right: 25px;
        }
        
        .result-question {
            color: #1e3a8a;
            font-weight: 600;
            line-height: 1.4;
        }
        
        .no-results {
            padding: 20px;
            text-align: center;
            color: #64748b;
        }
        
        .faq-category {
            transition: all 0.4s ease;
        }
    `;
    document.head.appendChild(style);
});

