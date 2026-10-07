// course.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== تهيئة المتغيرات العالمية ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const modal = document.getElementById('courseModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const previewButtons = document.querySelectorAll('.preview-btn');

    // ========== بيانات الدورات (يمكن استبدالها ببيانات حقيقية من API) ==========
    const coursesData = {
        'web-development': {
            title: 'تطوير الويب للمبتدئين',
            category: 'تطوير الويب',
            level: 'مبتدئ',
            description: 'ابدأ رحلتك في عالم برمجة الويب بتعلم HTML, CSS, JavaScript واصنع أول موقع ويب خاص بك خلال أسابيع قليلة.',
            features: {
                duration: '24 ساعة تدريب',
                videos: '12 فيديو تعليمي',
                projects: '5 مشاريع عملية'
            },
            rating: 4.8,
            reviews: 127,
            duration: '8 أسابيع',
            price: 1200,
            originalPrice: 1500,
            discount: 20,
            instructor: 'أحمد محمد',
            requirements: ['جهاز كمبيوتر', 'اتصال إنترنت', 'متصفح حديث'],
            syllabus: [
                'مقدمة في عالم الويب',
                'أساسيات HTML',
                'تصميم responsive بـ CSS',
                'البرمجة بـ JavaScript',
                'مشروع نهائي'
            ]
        },
        'python-kids': {
            title: 'Python للأطفال',
            category: 'لغة Python',
            level: 'مبتدئ',
            description: 'تعلم لغة Python من خلال الألعاب والمشاريع المسلية. مثالي للأطفال من سن 10 سنوات.',
            features: {
                duration: '20 ساعة تدريب',
                videos: '15 فيديو تعليمي',
                projects: '8 مشاريع عملية'
            },
            rating: 5.0,
            reviews: 89,
            duration: '6 أسابيع',
            price: 1000,
            originalPrice: 1200,
            discount: 17,
            instructor: 'سارة أحمد',
            requirements: ['جهاز كمبيوتر', 'اتصال إنترنت', 'تركيز عالي'],
            syllabus: [
                'مقدمة في Python',
                'المتغيرات والعمليات',
                'الجمل الشرطية',
                'الحلقات التكرارية',
                'مشاريع ألعاب'
            ]
        }
        // يمكن إضافة المزيد من الدورات هنا
    };

    // ========== وظيفة القائمة المتنقلة ==========
    function initMobileMenu() {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ========== وظيفة تصفية الدورات ==========
    function initCourseFilter() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة النشاط من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // إضافة النشاط للزر المختار
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterCourses(filter);
            });
        });
    }

    function filterCourses(filter) {
        courseCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-level') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // ========== وظيفة الأسئلة الشائعة ==========
    function initFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // إغلاق جميع الأسئلة الأخرى
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // تبديل السؤال الحالي
                item.classList.toggle('active');
            });
        });
    }

    // ========== وظيفة المودال ==========
    function initModal() {
        // فتح المودال عند النقر على زر التسجيل
        enrollButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const courseId = this.getAttribute('data-course');
                openCourseModal(courseId);
            });
        });

        // فتح المودال عند النقر على معاينة مجانية
        previewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const courseCard = this.closest('.course-card');
                const courseId = courseCard.querySelector('.enroll-btn').getAttribute('data-course');
                openCourseModal(courseId, 'preview');
            });
        });

        // إغلاق المودال
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // إغلاق بالزر ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    function openCourseModal(courseId, mode = 'enroll') {
        const course = coursesData[courseId];
        if (!course) return;

        const modalBody = document.querySelector('.modal-body');
        
        if (mode === 'preview') {
            modalBody.innerHTML = generatePreviewContent(course);
        } else {
            modalBody.innerHTML = generateEnrollContent(course);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // إضافة event listeners للأزرار داخل المودال
        initModalButtons();
    }

    function generateEnrollContent(course) {
        return `
            <div class="modal-course-details">
                <div class="modal-header">
                    <h2>${course.title}</h2>
                    <span class="course-category">${course.category}</span>
                </div>
                
                <div class="modal-content-grid">
                    <div class="course-info">
                        <div class="info-section">
                            <h3>معلومات الدورة</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <i class="fas fa-user"></i>
                                    <span>المدرب: ${course.instructor}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-clock"></i>
                                    <span>المدة: ${course.duration}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-signal"></i>
                                    <span>المستوى: ${course.level}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-star"></i>
                                    <span>التقييم: ${course.rating} (${course.reviews} تقييم)</span>
                                </div>
                            </div>
                        </div>

                        <div class="syllabus-section">
                            <h3>محتويات الدورة</h3>
                            <ul class="syllabus-list">
                                ${course.syllabus.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="requirements-section">
                            <h3>المتطلبات</h3>
                            <ul class="requirements-list">
                                ${course.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <div class="enrollment-section">
                        <div class="pricing-card">
                            <div class="price-section">
                                <span class="current-price">${course.price} ج.م</span>
                                <span class="original-price">${course.originalPrice} ج.م</span>
                                <span class="discount">خصم ${course.discount}%</span>
                            </div>
                            
                            <div class="features-list">
                                <div class="feature">
                                    <i class="fas fa-check"></i>
                                    <span>${course.features.duration}</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-check"></i>
                                    <span>${course.features.videos}</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-check"></i>
                                    <span>${course.features.projects}</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-check"></i>
                                    <span>شهادة معتمدة</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-check"></i>
                                    <span>دعم فني مستمر</span>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-full whatsapp-enroll">
                                <i class="fab fa-whatsapp"></i>
                                التسجيل عبر واتساب
                            </button>
                            
                            <button class="btn btn-outline btn-full direct-enroll">
                                <i class="fas fa-credit-card"></i>
                                التسجيل المباشر
                            </button>
                            
                            <div class="guarantee">
                                <i class="fas fa-shield-alt"></i>
                                <span>ضمان استرداد الأموال خلال 7 أيام</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function generatePreviewContent(course) {
        return `
            <div class="modal-preview">
                <div class="preview-header">
                    <h2>معاينة: ${course.title}</h2>
                    <span class="course-category">${course.category}</span>
                </div>
                
                <div class="preview-content">
                    <div class="preview-video">
                        <div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                            <p>فيديو المعاينة سيعرض هنا</p>
                        </div>
                    </div>
                    
                    <div class="preview-info">
                        <h3>ماذا ستتعلم في هذه الدورة؟</h3>
                        <ul class="learning-list">
                            ${course.syllabus.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        
                        <div class="preview-actions">
                            <button class="btn btn-primary full-enroll-from-preview">
                                <i class="fas fa-shopping-cart"></i>
                                التسجيل الكامل
                            </button>
                            <button class="btn btn-outline">
                                <i class="fas fa-download"></i>
                                تحميل منهج الدورة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function initModalButtons() {
        // زر التسجيل عبر واتساب
        const whatsappBtn = document.querySelector('.whatsapp-enroll');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                const courseTitle = document.querySelector('.modal-header h2').textContent;
                const message = `مرحبًا، أريد التسجيل في دورة "${courseTitle}"`;
                const whatsappUrl = `https://api.whatsapp.com/send?phone=201080901957&text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }

        // زر التسجيل المباشر
        const directEnrollBtn = document.querySelector('.direct-enroll');
        if (directEnrollBtn) {
            directEnrollBtn.addEventListener('click', function() {
                // هنا يمكن إضافة منطق التسجيل المباشر
                alert('سيتم توجيهك إلى صفحة الدفع قريبًا');
            });
        }

        // زر التسجيل الكامل من المعاينة
        const fullEnrollBtn = document.querySelector('.full-enroll-from-preview');
        if (fullEnrollBtn) {
            fullEnrollBtn.addEventListener('click', function() {
                closeModal();
                // إعادة فتح المودال بوضع التسجيل
                const courseTitle = document.querySelector('.preview-header h2').textContent.replace('معاينة: ', '');
                const courseId = Object.keys(coursesData).find(key => coursesData[key].title === courseTitle);
                if (courseId) {
                    setTimeout(() => openCourseModal(courseId, 'enroll'), 300);
                }
            });
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // إضافة تأثير الإغلاق
        setTimeout(() => {
            document.querySelector('.modal-body').innerHTML = '';
        }, 300);
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

        // مراقبة العناصر لإضافة تأثيرات الظهور
        document.querySelectorAll('.category-card, .course-card, .path-step, .faq-item').forEach(el => {
            observer.observe(el);
        });
    }

    // ========== وظيفة العدادات المتحركة ==========
    function initCounters() {
        const statsSection = document.querySelector('.hero-stats');
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateNumbers();
                }
            });
        });

        if (statsSection) {
            observer.observe(statsSection);
        }

        function animateNumbers() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + '+';
                }, 16);
            });
        }
    }

    // ========== وظيفة تأثيرات العناصر العائمة ==========
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            // إضافة تأخير مختلف لكل عنصر
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // ========== وظيفة إدارة حالة التمرير ==========
    function initScrollManagement() {
        let lastScrollTop = 0;
        const header = document.querySelector('.courses-header');

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                
                if (scrollTop > lastScrollTop) {
                    // التمرير لأسفل
                    header.classList.add('hidden');
                } else {
                    // التمرير لأعلى
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('scrolled', 'hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ========== تهيئة جميع الوظائف ==========
    function init() {
        initMobileMenu();
        initCourseFilter();
        initFAQ();
        initModal();
        initScrollAnimations();
        initCounters();
        initFloatingElements();
        initScrollManagement();

        console.log('ITD Academy - Courses Page Initialized');
    }

    // تشغيل التهيئة
    init();
});

// ========== وظائف مساعدة إضافية ==========
// تأثيرات Hover على بطاقات الدورات
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// إدارة حالة النقر على الأزرار
document.addEventListener('click', function(e) {
    if (e.target.matches('.enroll-btn, .enroll-btn *')) {
        const button = e.target.closest('.enroll-btn');
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 300);
    }
});

// تحميل سلس لـ anchor links
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
// ========== وظيفة التسجيل عبر واتساب فقط ==========
function initModal() {

    // زر التسجيل الرئيسي
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const courseId = this.getAttribute('data-course');
            const course = coursesData[courseId];

            if (!course) return;

            const message = `مرحبًا، أريد التسجيل في دورة "${course.title}"`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=201080901957&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // زر "معاينة مجانية" — يخلي التسجيل كامل يروح واتساب برضه
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const card = this.closest('.course-card');
            const courseId = card.querySelector('.enroll-btn').getAttribute('data-course');
            const course = coursesData[courseId];

            if (!course) return;

            const message = `مرحبًا، أريد التسجيل في دورة "${course.title}"`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=201080901957&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}
