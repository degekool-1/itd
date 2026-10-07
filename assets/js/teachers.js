// teachers.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== تهيئة المتغيرات العالمية ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teacherCards = document.querySelectorAll('.teacher-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const modal = document.getElementById('teacherModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const viewProfileButtons = document.querySelectorAll('.view-profile');
    const viewCoursesButtons = document.querySelectorAll('.view-courses');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // ========== بيانات المدربين ==========
    const teachersData = {
        'ahmed-mohamed': {
            name: 'أحمد محمد',
            title: 'خبير تطوير الويب والذكاء الاصطناعي',
            bio: 'مبرمج ومطور ويب بخبرة تزيد عن 8 سنوات. متخصص في تعليم الأطفال واليافعين لغات البرمجة بطريقة مبسطة وممتعة. حاصل على شهادات في الذكاء الاصطناعي وتعلم الآلة من مؤسسات عالمية.',
            image: '../images/teachers/ahmed-mohamed.jpg',
            stats: {
                courses: 15,
                students: 1200,
                rating: 4.9
            },
            skills: ['Python', 'JavaScript', 'AI', 'Web Development', 'Machine Learning'],
            experience: '8+ سنوات',
            education: [
                'بكالوريوس علوم الحاسب - جامعة القاهرة',
                'شهادة في الذكاء الاصطناعي - جامعة ستانفورد',
                'شهادة في تطوير الويب - MIT'
            ],
            achievements: [
                'أفضل مدرب برمجة للأطفال 2023',
                'مطور معتمد من Google',
                'شارك في تأليف 3 كتب تعليمية للبرمجة'
            ],
            courses: [
                'تطوير الويب للمبتدئين',
                'Python المتقدم',
                'مقدمة في الذكاء الاصطناعي',
                'تعلم الآلة للأطفال'
            ]
        },
        'sara-ahmed': {
            name: 'سارة أحمد',
            title: 'مصممة واجهات ومتخصصة في تعليم الأطفال',
            bio: 'مصممة جرافيك وواجهات مستخدم بخبرة 6 سنوات. متخصصة في تعليم التصميم والإبداع للأطفال باستخدام أدوات بسيطة ومناسبة. شغوفة بتحويل الأفكار إلى تصاميم جميلة وتطوير الإبداع لدى الصغار.',
            image: '../images/teachers/sara-ahmed.jpg',
            stats: {
                courses: 12,
                students: 950,
                rating: 5.0
            },
            skills: ['UI/UX Design', 'Graphic Design', 'Figma', 'Creative Thinking', 'Adobe Creative Suite'],
            experience: '6+ سنوات',
            education: [
                'بكالوريوس تصميم جرافيك - جامعة حلوان',
                'شهادة في تصميم واجهات المستخدم - معهد التصميم',
                'دبلوم في الفنون الرقمية'
            ],
            achievements: [
                'جائزة أفضل تصميم تعليمي 2022',
                'مصممة معتمدة من Adobe',
                'معرض شخصي لأعمال الطلاب'
            ],
            courses: [
                'تصميم واجهات المستخدم',
                'الإبداع الرقمي للأطفال',
                'تصميم الشعارات',
                'أساسيات التصميم الجرافيكي'
            ]
        }
        // يمكن إضافة المزيد من المدربين
    };

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

    // ========== وظيفة تصفية المدربين ==========
    function initTeacherFilter() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterTeachers(filter);
            });
        });
    }

    function filterTeachers(filter) {
        teacherCards.forEach(card => {
            const specialties = card.getAttribute('data-specialty').split(',');
            
            if (filter === 'all' || specialties.includes(filter)) {
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
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        });
    }

    // ========== وظيفة سلايدر آراء الطلاب ==========
    function initTestimonialsSlider() {
        let currentSlide = 0;
        const slideWidth = 400; // عرض كل بطاقة + الـ gap
        const totalSlides = document.querySelectorAll('.testimonial-card').length;
        
        function updateSlider() {
            testimonialsTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
        
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
        
        // تفعيل السحب على الهواتف
        let startX = 0;
        let currentX = 0;
        
        testimonialsTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialsTrack.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        testimonialsTrack.addEventListener('touchend', () => {
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) { // حد السحب
                if (diff > 0 && currentSlide < totalSlides - 1) {
                    currentSlide++; // سحب لليسار
                } else if (diff < 0 && currentSlide > 0) {
                    currentSlide--; // سحب لليمين
                }
                updateSlider();
            }
        });
    }

    // ========== وظيفة المودال ==========
    function initModal() {
        // فتح المودال عند النقر على عرض الملف الشخصي
        viewProfileButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const teacherId = this.getAttribute('data-teacher');
                openTeacherModal(teacherId, 'profile');
            });
        });

        // فتح المودال عند النقر على دورات المدرب
        viewCoursesButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const teacherId = this.getAttribute('data-teacher');
                openTeacherModal(teacherId, 'courses');
            });
        });

        // إغلاق المودال
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    function openTeacherModal(teacherId, mode = 'profile') {
        const teacher = teachersData[teacherId];
        if (!teacher) return;

        const modalBody = document.querySelector('.modal-body');
        
        if (mode === 'profile') {
            modalBody.innerHTML = generateProfileContent(teacher);
        } else {
            modalBody.innerHTML = generateCoursesContent(teacher);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function generateProfileContent(teacher) {
        return `
            <div class="teacher-profile-modal">
                <div class="profile-header">
                    <div class="profile-image">
                        <img src="${teacher.image}" alt="${teacher.name}">
                    </div>
                    <div class="profile-info">
                        <h2>${teacher.name}</h2>
                        <p class="profile-title">${teacher.title}</p>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <span class="stat-number">${teacher.stats.courses}</span>
                                <span class="stat-label">دورة</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-number">${teacher.stats.students}+</span>
                                <span class="stat-label">طالب</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-number">${teacher.stats.rating}</span>
                                <span class="stat-label">تقييم</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-content">
                    <div class="profile-section">
                        <h3>نبذة عن المدرب</h3>
                        <p>${teacher.bio}</p>
                    </div>

                    <div class="profile-section">
                        <h3>المهارات</h3>
                        <div class="skills-list">
                            ${teacher.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>

                    <div class="profile-grid">
                        <div class="profile-column">
                            <div class="profile-section">
                                <h3>الخبرة</h3>
                                <p>${teacher.experience}</p>
                            </div>

                            <div class="profile-section">
                                <h3>الإنجازات</h3>
                                <ul class="achievements-list">
                                    ${teacher.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                                </ul>
                            </div>
                        </div>

                        <div class="profile-column">
                            <div class="profile-section">
                                <h3>المؤهلات العلمية</h3>
                                <ul class="education-list">
                                    ${teacher.education.map(edu => `<li>${edu}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="profile-actions">
                        <button class="btn btn-primary view-teacher-courses">
                            <i class="fas fa-play-circle"></i>
                            عرض دورات المدرب
                        </button>
                        <a href="https://api.whatsapp.com/send?phone=201080901957" class="btn btn-outline">
                            <i class="fab fa-whatsapp"></i>
                            التواصل عبر واتساب
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function generateCoursesContent(teacher) {
        return `
            <div class="teacher-courses-modal">
                <div class="courses-header">
                    <h2>دورات ${teacher.name}</h2>
                    <p>استعرض جميع الدورات التي يقدمها المدرب</p>
                </div>

                <div class="courses-list">
                    ${teacher.courses.map((course, index) => `
                        <div class="course-item">
                            <div class="course-number">${index + 1}</div>
                            <div class="course-info">
                                <h4>${course}</h4>
                                <div class="course-meta">
                                    <span><i class="fas fa-clock"></i> 12 ساعة</span>
                                    <span><i class="fas fa-video"></i> 8 فيديوهات</span>
                                    <span><i class="fas fa-star"></i> 4.8+</span>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-eye"></i>
                                معاينة
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="courses-actions">
                    <a href="courses.html" class="btn btn-primary">
                        <i class="fas fa-play-circle"></i>
                        عرض جميع الدورات
                    </a>
                </div>
            </div>
        `;
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
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

        document.querySelectorAll('.teacher-card, .methodology-card, .testimonial-card, .faq-item').forEach(el => {
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
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // ========== تهيئة جميع الوظائف ==========
    function init() {
        initMobileMenu();
        initTeacherFilter();
        initFAQ();
        initTestimonialsSlider();
        initModal();
        initScrollAnimations();
        initCounters();
        initFloatingElements();

        console.log('ITD Academy - Teachers Page Initialized');
    }

    // تشغيل التهيئة
    init();
});

// وظائف إضافية
document.addEventListener('DOMContentLoaded', function() {
    // تأثيرات Hover على بطاقات المدربين
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    teacherCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
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
});