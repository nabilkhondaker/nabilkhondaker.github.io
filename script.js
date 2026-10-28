class Portfolio {
    constructor() {
        this.init();
    }
    init() {
        this.setupLoading();
        this.setupSocialLinks();
        this.setupScrollAnimations();
        this.setupFooterYear();
        this.setupClock();
        this.setupEmailCopy();
        this.setupThemePicker();
        this.setupWikiViewer();
        this.setupSimulations();
        this.setupPortfolioOverlay();
        this.setupOverviewModal();
        this.setupSidebarAndRightPages();
        this.setupAchievementsGallery();
        this.setupJournalFilters();
        this.setupQuestions();
        this.setupNabilaiChatbot();
        this.setupMentorshipNotif();
        this.setupMarkets();
    }

    setupLoading() {
        const removeLoader = () => {
            const loading = document.getElementById('loading');
            if (loading) {
                setTimeout(() => {
                    loading.classList.add('hidden');
                    setTimeout(() => loading.remove(), 500);
                }, 1000);
            }
        };

        if (document.readyState === 'complete') {
            removeLoader();
        } else {
            window.addEventListener('load', removeLoader, {
                passive: true
            });
        }
    }

    setupSocialLinks() {
        const socialBtns = document.querySelectorAll('.social-btn[data-link]');
        socialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(btn.dataset.link, '_blank', 'noopener,noreferrer');
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -30px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupFooterYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    setupClock() {
        const clockEl = document.getElementById('clock-time');
        if (!clockEl) return;

        const update = () => {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        };

        update();
        setInterval(update, 1000);
    }

    setupEmailCopy() {
        const copyBtn = document.getElementById('copy-email-btn');
        const emailText = document.getElementById('email-text');

        if (copyBtn && emailText) {
            copyBtn.addEventListener('click', () => {
                const emailLink = emailText.querySelector('a');
                const targetString = emailLink ? emailLink.textContent.trim() : emailText.textContent.trim();
                navigator.clipboard.writeText(targetString)
                    .then(() => {
                        const originalIcon = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #23a55a;"></i>';
                        copyBtn.style.pointerEvents = 'none';
                        setTimeout(() => {
                            copyBtn.innerHTML = originalIcon;
                            copyBtn.style.pointerEvents = 'auto';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy email: ', err);
                    });
            });
        }
    }

    setupThemePicker() {
        const themeBtn = document.getElementById('theme-btn');
        const themePanel = document.getElementById('theme-panel');
        const themeCloseBtn = document.getElementById('theme-panel-close');
        const colorPicker = document.getElementById('color-picker');
        const colorPreview = document.querySelector('.color-preview-circle');
        const presetButtons = document.querySelectorAll('.preset-btn');
        const root = document.documentElement;

        const themes = {
            gold: {
                accent: '#913700',
                secondary: '#ffe600',
                bg: '#0a0a0b'
            },
            cyber: {
                accent: '#ff0055',
                secondary: '#00ffcc',
                bg: '#05000a'
            },
            toxic: {
                accent: '#0d5f00',
                secondary: '#00ff66',
                bg: '#000501'
            },
            cosmic: {
                accent: '#4d0099',
                secondary: '#00ffff',
                bg: '#02000a'
            },
            crimson: {
                accent: '#910000',
                secondary: '#ff4d4d',
                bg: '#0a0000'
            },
            noir: {
                accent: '#c0c0c0',
                secondary: '#f5f5f5',
                bg: '#000000'
            }
        };

        let isUpdating = false;

        const applyThemeStyles = (accentColor, secondaryColor, backgroundColor = '#0a0a0b', skipInputUpdate = false) => {
            if (isUpdating) return;
            isUpdating = true;

            root.style.setProperty('--accent', accentColor);
            root.style.setProperty('--accent-blue', secondaryColor);
            root.style.setProperty('--bg-primary', backgroundColor);

            if (colorPreview) colorPreview.style.background = accentColor;

            if (colorPicker && !skipInputUpdate) {
                colorPicker.value = accentColor;
            }

            const cleanHex = accentColor.replace('#', '');
            const r = parseInt(cleanHex.substring(0, 2), 16);
            const g = parseInt(cleanHex.substring(2, 4), 16);
            const b = parseInt(cleanHex.substring(4, 6), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // Also evaluate background brightness so pure-black / near-black themes
            // always keep light text even when the accent itself is a bright silver.
            const bgClean = (backgroundColor || '#0a0a0b').replace('#', '');
            let bgBrightness = 0;
            if (bgClean.length === 6) {
                const br = parseInt(bgClean.substring(0, 2), 16);
                const bg = parseInt(bgClean.substring(2, 4), 16);
                const bb = parseInt(bgClean.substring(4, 6), 16);
                bgBrightness = (br * 299 + bg * 587 + bb * 114) / 1000;
            }

            if (bgBrightness < 80 || brightness <= 165) {
                // Dark background (or dark accent) → light text / light borders
                root.style.setProperty('--text-primary', '#ffffff');
                root.style.setProperty('--text-secondary', '#c8c8c8');
                root.style.setProperty('--border', 'rgba(255, 255, 255, 0.10)');
            } else {
                // Light accent on a light-ish bg → dark text
                root.style.setProperty('--text-primary', '#111112');
                root.style.setProperty('--text-secondary', '#333336');
                root.style.setProperty('--border', 'rgba(0, 0, 0, 0.15)');
            }

            isUpdating = false;
        };

        if (themeBtn && themePanel) {
            themeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                themePanel.classList.toggle('hidden');
            });
        }

        if (themeCloseBtn && themePanel) {
            themeCloseBtn.addEventListener('click', () => {
                themePanel.classList.add('hidden');
            });
        }

        document.addEventListener('click', (e) => {
            if (themePanel && themeBtn && !themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
                themePanel.classList.add('hidden');
            }
        }, {
            passive: true
        });

        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                presetButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetName = btn.dataset.theme;
                const config = themes[targetName];

                if (config) {
                    applyThemeStyles(config.accent, config.secondary, config.bg, false);
                    localStorage.setItem('site-theme-custom', JSON.stringify(config));
                }
            });
        });

        if (colorPicker) {
            let rafTimeout;
            colorPicker.addEventListener('input', (e) => {
                presetButtons.forEach(b => b.classList.remove('active'));

                const customAccent = e.target.value;
                const customSecondary = '#ffffff';

                if (rafTimeout) cancelAnimationFrame(rafTimeout);

                rafTimeout = requestAnimationFrame(() => {
                    applyThemeStyles(customAccent, customSecondary, '#0a0a0b', true);
                    localStorage.setItem('site-theme-custom', JSON.stringify({
                        accent: customAccent,
                        secondary: customSecondary,
                        bg: '#0a0a0b'
                    }));
                });
            });
        }

        const savedCustomConfig = localStorage.getItem('site-theme-custom');
        if (savedCustomConfig) {
            try {
                const parsed = JSON.parse(savedCustomConfig);
                applyThemeStyles(parsed.accent, parsed.secondary, parsed.bg, false);

                presetButtons.forEach(b => {
                    if (themes[b.dataset.theme]?.accent === parsed.accent) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
            } catch (e) {
                console.error("Theme configuration mapping issue on startup:", e);
            }
        }
    }

    setupWikiViewer() {
        const wikiBtn = document.getElementById('wiki-btn');
        const wikiModal = document.getElementById('wiki-modal');
        const wikiCloseBtn = document.getElementById('wiki-close-btn');
        const wikiRefreshBtn = document.getElementById('wiki-refresh-btn');
        const wikiImage = document.getElementById('wiki-image');

        const wikiData = [
            "img/wiki/1.jpg",
            "img/wiki/2.jpg",
            "img/wiki/3.jpg",
            "img/wiki/4.jpg",
            "img/wiki/5.jpg",
            "img/wiki/6.webp",
            "img/wiki/7.jpg",
            "img/wiki/8.jpg",
            "img/wiki/9.jpg",
            "img/wiki/10.jpg",
            "img/wiki/11.jpg",
            "img/wiki/12.webp",
            "img/wiki/13.jpg",
            "img/wiki/14.webp",
            "img/wiki/15.jpg",
            "img/wiki/16.jpg",
            "img/wiki/17.webp",
            "img/wiki/18.jpg",
            "img/wiki/19.jpg",
            "img/wiki/20.jpg",
            "img/wiki/21.jpg",
            "img/wiki/22.jpg",
            "img/wiki/23.webp",
            "img/wiki/24.jpg",
            "img/wiki/25.jpg",
            "img/wiki/26.jpg",
            "img/wiki/27.jpg",
            "img/wiki/28.jpg",
            "img/wiki/29.jpg",
            "img/wiki/30.webp",
            "img/wiki/31.jpg",
            "img/wiki/32.jpg",
            "img/wiki/33.jpg",
            "img/wiki/34.jpg",
            "img/wiki/35.jpg",
            "img/wiki/36.jpg",
            "img/wiki/37.jpg",
            "img/wiki/38.jpg",
            "img/wiki/39.jpg",
            "img/wiki/40.webp",
            "img/wiki/41.jpg",
            "img/wiki/42.jpg",
            "img/wiki/43.jpg",
            "img/wiki/44.webp",
            "img/wiki/45.jpg",
            "img/wiki/46.webp",
            "img/wiki/47.jpg",
            "img/wiki/48.jpg",
            "img/wiki/49.jpg",
            "img/wiki/50.jpg",
            "img/wiki/51.jpg",
            "img/wiki/52.jpg",
            "img/wiki/53.jpg",
            "img/wiki/54.jpg",
            "img/wiki/55.jpg",
            "img/wiki/56.jpg",
            "img/wiki/57.jpg",
            "img/wiki/58.jpg",
            "img/wiki/59.jpg",
            "img/wiki/60.jpg",
            "img/wiki/61.jpg",
            "img/wiki/62.jpg",
            "img/wiki/63.jpg",
            "img/wiki/64.jpg",
            "img/wiki/65.jpg",
            "img/wiki/66.jpg",
            "img/wiki/67.jpg",
            "img/wiki/68.jpg",
            "img/wiki/69.jpg",
            "img/wiki/70.jpg",
            "img/wiki/71.jpg",
            "img/wiki/72.jpg",
            "img/wiki/73.jpg",
            "img/wiki/74.jpg",
            "img/wiki/75.jpg",
            "img/wiki/76.jpg",
            "img/wiki/77.jpg",
            "img/wiki/78.jpg",
            "img/wiki/79.jpg",
            "img/wiki/80.jpg",
            "img/wiki/81.webp",
            "img/wiki/82.jpg",
            "img/wiki/83.jpg",
            "img/wiki/84.jpg",
            "img/wiki/85.jpg",
            "img/wiki/86.jpg",
            "img/wiki/87.jpg",
            "img/wiki/88.jpg",
            "img/wiki/89.jpg",
            "img/wiki/90.jpg",
            "img/wiki/91.jpg",
            "img/wiki/92.jpg",
            "img/wiki/93.jpg",
            "img/wiki/94.jpg",
            "img/wiki/95.jpg",
            "img/wiki/96.jpg",
            "img/wiki/97.webp",
            "img/wiki/98.jpg",
            "img/wiki/99.webp",
            "img/wiki/100.jpg",
            "img/wiki/101.jpg",
            "img/wiki/102.jpg",
            "img/wiki/103.jpg",
            "img/wiki/104.webp",
            "img/wiki/105.jpg",
            "img/wiki/106.jpg",
            "img/wiki/107.jpg",
            "img/wiki/108.jpg",
            "img/wiki/109.jpg",
            "img/wiki/110.jpg",
            "img/wiki/111.jpg",
            "img/wiki/112.jpg",
            "img/wiki/113.jpg",
            "img/wiki/114.jpg",
            "img/wiki/115.jpg",
            "img/wiki/116.jpg",
            "img/wiki/117.webp",
            "img/wiki/118.jpg",
            "img/wiki/119.jpg",
            "img/wiki/120.webp",
            "img/wiki/121.jpg",
            "img/wiki/122.jpg",
            "img/wiki/123.jpg",
            "img/wiki/124.jpg",
            "img/wiki/125.jpg",
            "img/wiki/126.jpg",
            "img/wiki/127.jpg",
            "img/wiki/128.jpg",
            "img/wiki/129.jpg",
            "img/wiki/130.jpg",
            "img/wiki/131.jpg",
            "img/wiki/132.jpg",
            "img/wiki/133.webp",
            "img/wiki/134.webp",
            "img/wiki/135.jpg",
            "img/wiki/136.jpg",
            "img/wiki/137.jpg",
            "img/wiki/138.webp",
            "img/wiki/139.jpg",
            "img/wiki/140.jpg",
            "img/wiki/141.jpg",
            "img/wiki/142.jpg",
            "img/wiki/143.jpg",
            "img/wiki/144.jpg",
            "img/wiki/145.jpg",
            "img/wiki/146.jpg",
            "img/wiki/147.jpg",
            "img/wiki/148.jpg",
            "img/wiki/149.jpg",
            "img/wiki/150.jpg",
            "img/wiki/151.webp",
            "img/wiki/152.jpg",
            "img/wiki/153.jpg",
            "img/wiki/154.jpg",
            "img/wiki/155.jpg",
            "img/wiki/156.jpg",
            "img/wiki/157.jpg",
            "img/wiki/158.jpg",
            "img/wiki/159.jpg",
            "img/wiki/160.jpg",
            "img/wiki/161.jpg",
            "img/wiki/162.jpg",
            "img/wiki/163.jpg",
            "img/wiki/164.webp",
            "img/wiki/165.jpg",
            "img/wiki/166.jpg",
            "img/wiki/167.jpg",
            "img/wiki/168.webp",
            "img/wiki/169.jpg",
            "img/wiki/170.jpg",
            "img/wiki/171.jpg",
            "img/wiki/172.jpg",
            "img/wiki/173.jpg",
            "img/wiki/174.jpg",
            "img/wiki/175.jpg",
            "img/wiki/176.jpg",
            "img/wiki/177.jpg",
            "img/wiki/178.jpg",
            "img/wiki/179.jpg",
            "img/wiki/180.jpg",
            "img/wiki/181.jpg",
            "img/wiki/182.jpg",
            "img/wiki/183.jpg",
            "img/wiki/184.jpg",
            "img/wiki/185.jpg",
            "img/wiki/186.jpg",
            "img/wiki/187.jpg",
            "img/wiki/188.jpg",
            "img/wiki/189.jpg"
        ];

        const getRandomImage = () => {
            const randomIndex = Math.floor(Math.random() * wikiData.length);
            const imagePath = wikiData[randomIndex];

            wikiImage.style.opacity = '0';
            setTimeout(() => {
                wikiImage.src = imagePath;
                wikiImage.onload = () => {
                    wikiImage.style.opacity = '1';
                };
            }, 200);
        };

        if (wikiImage) wikiImage.style.transition = 'opacity 0.2s ease';

        if (wikiBtn && wikiModal) {
            wikiBtn.addEventListener('click', () => {
                getRandomImage();
                wikiModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });

            const closeModal = () => {
                wikiModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            };

            wikiCloseBtn.addEventListener('click', closeModal);
            wikiModal.addEventListener('click', (e) => {
                if (e.target === wikiModal) closeModal();
            });

            if (wikiRefreshBtn) {
                wikiRefreshBtn.addEventListener('click', () => {
                    const icon = wikiRefreshBtn.querySelector('i');
                    icon.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    icon.style.transform = `rotate(${(wikiRefreshBtn.clicks || 1) * 360}deg)`;
                    wikiRefreshBtn.clicks = (wikiRefreshBtn.clicks || 1) + 1;
                    getRandomImage();
                });
            }
        }
    }

    setupSimulations() {
        const simulationsData = window.__simulationsData = [{
                id: 1,
                title: "two disks bouncing on flat plate spring-coupled between opposed pin supports",
                desc: "two disks bounce on a frictionless flat plate that is spring-supported at both ends between opposed pin supports, with perfectly elastic collisions (e = 1)",
                videoSrc: "simulations/ds1.mp4",
                whyText: "i wanted a clean test case for impact dynamics combined with a flexible base. the plate isn’t rigid, so every collision feeds energy into the springs and the motion of the plate feeds back into the next bounce. it felt like a good way to practice modeling contact + continuous elastic deformation together.",
                learnedText: "how to formulate the equations when the “ground” itself is a dynamic degree of freedom, and how energy is conserved (or nearly conserved) across successive impacts when e = 1. also got better at handling the discontinuous velocity jumps from elastic collisions inside an otherwise continuous spring-mass system.",
                challengesText: "getting the impact detection and impulse resolution correct without introducing artificial energy gain or loss was the main headache. the coupling between the vertical motion of the plate and the horizontal/rotational degrees of freedom of the disks also required careful lagrange or newton-euler setup so the reactions at the pin supports stayed consistent."
            },
            {
                id: 2,
                title: "formation of blocks coupled by rods and springs ",
                desc: "a multi-body system of rigid blocks linked by rods and springs, subjected to harmonic base excitation at angular frequencies around 3–5 rad/s",
                videoSrc: "simulations/ds2.mp4",
                whyText: "i was interested in how a chain of rigid bodies connected by both rigid and elastic elements responds when the whole thing is shaken. it’s a classic vibration-isolation / multi-degree-of-freedom problem and a good excuse to derive the full mass, damping, and stiffness matrices.",
                learnedText: "how the natural frequencies and mode shapes shift once you mix rigid links with springs, and how base excitation projects onto those modes. also practiced assembling the equations for a system that has both holonomic constraints (the rods) and force elements (the springs).",
                challengesText: "keeping the rigid rods from introducing numerical stiffness or constraint drift while still letting the springs do their job. choosing the right coordinates (absolute vs relative) and making sure the harmonic forcing term was applied correctly to the base without accidentally forcing internal degrees of freedom was fiddly."
            },
            {
                id: 3,
                title: "swinging block with harmonic driving force spring-coupled to masses with pendulums",
                desc: "a central swinging block driven by a harmonic force and spring-coupled on either side to masses that each carry a pendulum",
                videoSrc: "simulations/ds3.mp4",
                whyText: "this one combines forced vibration of a rigid body with secondary pendulum dynamics. i wanted to see energy transfer between the driven block and the pendulums through the coupling springs, and how the pendulums can act as tuned absorbers or amplifiers depending on frequency.",
                learnedText: "how to write the lagrange equations for a system that mixes translational/rotational motion of the central block with the angular degrees of freedom of the pendulums. also saw clearly how the phase relationship between the driving force and the pendulum swings changes across resonance.",
                challengesText: "the nonlinear geometry of the pendulums (sin/cos terms) made the equations messy. linearizing for small angles was tempting but i wanted the full nonlinear behavior, so the numerical integration had to stay stable when the pendulums swung large."
            },
            {
                id: 4,
                title: "pulley system with spring-coupled blocks and oscillating disk",
                desc: "a cable-and-pulley arrangement featuring two spring-coupled sliding blocks on a horizontal track together with a vertically oscillating disk.",
                videoSrc: "simulations/ds4.mp4",
                whyText: "pulley systems force you to deal with kinematic constraints that link translational degrees of freedom in non-obvious ways. adding the springs and the oscillating disk made it a nice mixed constraint + force problem.",
                learnedText: "how to reduce the system using the pulley constraint (the cable length is constant) so you only keep independent coordinates, then derive the effective inertia and the forces that appear in those reduced coordinates. also practiced treating the disk’s vertical motion as an additional degree of freedom that still has to satisfy the cable constraint.",
                challengesText: "making sure the constraint forces (cable tensions) were consistent and that the numerical scheme didn’t slowly violate the constant-length condition. the interaction between the horizontal spring-coupled blocks and the vertical disk motion through the cable was easy to get wrong in the virtual-work or lagrange formulation."
            },
            {
                id: 5,
                title: "triple pendulum with spring coupling fixed mount to second mass",
                desc: "a triple-pendulum system consisting of two disks and a tip mass, with an additional spring that couples the fixed mount to the second mass",
                videoSrc: "simulations/ds5.mp4",
                whyText: "triple pendulums are already chaotic and interesting; adding a spring from the fixed support to an intermediate mass changes the effective restoring forces and couples the angles in a new way. i wanted to see how that extra elastic term alters the classic multi-pendulum dynamics.",
                learnedText: "deriving the full nonlinear equations for a triple pendulum is already a workout (lots of coupled sin/cos terms and coriolis accelerations). inserting the spring force into the lagrange equations and tracking how energy flows between the three angles taught me a lot about generalized forces.",
                challengesText: "the algebra for the kinetic and potential energy gets long fast. keeping the equations organized and verifying them against special cases (e.g., setting the spring stiffness to zero should recover a normal triple pendulum) took care. numerical stability when the system goes chaotic was also something i had to watch."
            },
            {
                id: 6,
                title: "rigid swinging frame with two spring-pendulum assemblies",
                desc: "a rigid swinging frame that contains two independent spring-supported pendulum assemblies, one on each side",
                videoSrc: "simulations/ds6.mp4",
                whyText: "i liked the idea of a rigid body that itself can swing, carrying two internal vibrating systems. it creates a clear primary motion (the frame) and secondary motions (the spring-pendulums) that interact through the moving support points.",
                learnedText: "how the acceleration of the frame appears as a kinematic excitation for the internal pendulums, and how the reaction forces from those pendulums feed back into the equation of motion of the frame. it’s a nice illustration of two-way coupling between a rigid-body degree of freedom and elastic-pendulum degrees of freedom.",
                challengesText: "writing the position of each pendulum mass in an inertial frame (so the kinetic energy is correct) while the frame is rotating required careful use of rotation matrices or complex geometry. making sure the spring forces ...(truncated 238 characters)...ally oscillating mass",
                desc: "a disk carrying an offset pendulum that rolls without slipping atop a horizontally oscillating, spring-supported cart",
                videoSrc: "simulations/ds7.mp4",
                whyText: "rolling-without-slipping is a classic non-holonomic (or holonomic in this planar case) constraint, and attaching an offset pendulum adds an interesting unbalanced rotor effect. the whole thing sitting on a spring-supported cart that can move horizontally makes the base itself dynamic.",
                learnedText: "how to enforce the no-slip condition (relating the cart’s translation, the disk’s translation, and the disk’s rotation) and then derive the remaining independent equations. the offset pendulum introduces a time-varying inertia and a centrifugal term that couples strongly into the rolling motion.",
                challengesText: "getting the rolling constraint correct and consistent with the spring force on the cart was tricky. the offset pendulum also means the center of mass of the disk+pendulum system is moving, so the moment balance about the contact point has to be handled carefully."
            },
            {
                id: 8,
                title: "two disks coupled by parallel rods with pendulum",
                desc: "two disks connected by parallel rods and fitted with a pendulum, constrained to move along a parabolic surface",
                videoSrc: "simulations/ds8.mp4",
                whyText: "parallel rods keep the orientation of the disks linked, and the parabolic constraint forces the whole assembly to follow a curved path. adding a pendulum gives an extra swinging degree of freedom. it’s a nice mix of geometric constraint and rigid-body coupling.",
                learnedText: "how to parameterize motion on a parabolic constraint and then write the lagrange equations with the remaining free coordinates (including the pendulum angle). the parallel-rod connection also imposes orientation constraints that reduce the number of independent rotational degrees of freedom.",
                challengesText: "the parabolic surface means the normal force and the tangential acceleration are related through the local curvature. deriving the effective kinetic energy and the generalized forces while respecting both the parallel-rod constraints and the surface constraint required careful coordinate choice."
            },
            {
                id: 9,
                title: "a free slider and a spring-bound slider carrying a pendulum",
                desc: "a free sliding mass and a spring-restrained sliding mass that carries a pendulum, both free to move on a frictionless horizontal track",
                videoSrc: "simulations/ds9.mp4",
                whyText: "simple looking, but it cleanly shows the interaction between an unconstrained degree of freedom and a spring-pendulum system. momentum conservation in the horizontal direction becomes interesting once the pendulum starts swinging.",
                learnedText: "how the free slider’s motion is affected by the reaction force transmitted through the (implicit) interaction or just by the overall momentum balance, and how the pendulum’s swing modulates the effective force on the spring-bound mass. good practice with systems that have both free and elastically constrained coordinates.",
                challengesText: "keeping the horizontal momentum accounting correct and making sure the pendulum’s horizontal inertia was properly coupled into the equations of the two sliders. small mistakes in the kinetic-energy terms showed up as violations of momentum conservation."
            },
            {
                id: 10,
                title: "rocking frame with suspended interior block and pendulum",
                desc: "a rocking rectangular frame that contains an interior block suspended by a spring and also carries a pendulum at its base",
                videoSrc: "simulations/ds10.mp4",
                whyText: "rocking frames appear in seismic and impact problems. putting a sprung mass and a pendulum inside creates internal dynamics that interact with the rocking motion, which itself is discontinuous when the frame lifts off or impacts the ground.",
                learnedText: "how to model a rigid body that can rock (piecewise contact) while still carrying continuous internal degrees of freedom. the switch between one-sided contact and free flight, plus the impact map when the frame hits the ground again, had to live alongside the ordinary differential equations of the suspended block and pendulum.",
                challengesText: "hybrid dynamics (continuous ODEs + discrete impact events) are always messy. detecting contact, applying the correct impulse, and then restarting the integration without introducing energy errors or constraint drift took the most care."
            },
            {
                id: 11,
                title: "two disks coupled by springs rolling horizontally on parallel surfaces",
                desc: "two disks linked by springs that roll horizontally on a pair of parallel upper and lower surfaces",
                videoSrc: "simulations/ds11.mp4",
                whyText: "rolling on both an upper and lower surface is an unusual constraint setup, and the springs between the disks create an elastic coupling. i wanted to see the resulting oscillation modes under pure rolling.",
                learnedText: "how the no-slip conditions on two parallel surfaces constrain the relative translation and rotation of the disks, and how the spring forces then drive the remaining free motion. the kinematics alone already force a relationship between the angular and linear velocities.",
                challengesText: "enforcing two simultaneous rolling constraints without over-constraining the system or introducing inconsistency. the algebraic relationship between the coordinates had to be derived carefully before the dynamics could even be written."
            },
            {
                id: 12,
                title: "three inverted pendulums sharing common pivot coupled by springs",
                desc: "three inverted pendulums that share a common pivot point and are mutually coupled to one another by springs",
                videoSrc: "simulations/ds12.mp4",
                whyText: "inverted pendulums are classic unstable systems; coupling three of them at a single pivot with springs creates a multi-degree-of-freedom unstable equilibrium whose linearized modes can be studied, and whose nonlinear behavior is rich.",
                learnedText: "how to write the equations for multiple inverted pendulums that share the same pivot (so the kinetic energy terms are tightly coupled) and then add the spring potential between them. linearizing about the upright position gives a clear eigenvalue problem for the coupled system.",
                challengesText: "the upright equilibrium is unstable, so any numerical integration is sensitive to initial conditions and time-step size. getting the linearized stiffness and mass matrices right so the predicted natural frequencies matched the nonlinear simulation for small amplitudes was the main verification step."
            }
        ];

        const featuredGrid = document.getElementById('featured-sims-grid');
        const allGrid = document.getElementById('all-sims-grid');

        const modal = document.getElementById('sim-modal');
        const modalVideo = document.getElementById('sim-modal-video');
        const modalTitle = document.getElementById('sim-modal-title');
        const modalDesc = document.getElementById('sim-modal-desc');
        const closeBtn = document.getElementById('sim-close-btn');

        const featuredSimIds = [1, 5, 12];

        const renderSims = (container, dataList) => {
            if (!container) return;
            container.innerHTML = '';

            dataList.forEach((sim) => {
                const card = document.createElement('div');
                card.className = 'sim-card';

                card.innerHTML = `
    <div class="sim-video-wrapper">
        <video muted loop playsinline preload="auto" style="pointer-events: none;">
            <source src="${sim.videoSrc}" type="video/mp4">
        </video>
    </div>
    <div class="sim-info">
        <h4>${sim.title}</h4>
    </div>
    
    <div class="glass-bubble">
        <div class="glass-bubble-inner">
            <h4>Simulation Details</h4>
            <p>${sim.desc}</p>
            <button class="mini-btn overview-btn"><i class="fa-solid fa-circle-info"></i> overview</button>
        </div>
    </div>
`;

                const video = card.querySelector('video');

                const forceThumbnail = () => {
                    if (video.readyState >= 2) {
                        video.currentTime = 0.1;
                        video.pause();
                    }
                };

                video.addEventListener('loadeddata', forceThumbnail, { once: true });
                video.addEventListener('loadedmetadata', forceThumbnail, { once: true });

                if (video.readyState >= 2) {
                    forceThumbnail();
                }
                card.addEventListener('mouseenter', () => {
                    video.play().catch(() => {});
                });
                card.addEventListener('mouseleave', () => {
                    video.pause();
                });

                card.addEventListener('click', () => {
                    modalVideo.src = sim.videoSrc;
                    modalTitle.textContent = sim.title;
                    modalDesc.textContent = sim.desc;

                    const videoContainer = modalVideo.parentElement;
                    let modalOverviewBtn = videoContainer.querySelector('.sim-modal-overview-btn');

                    if (!modalOverviewBtn) {
                        videoContainer.style.position = 'relative';
                        modalOverviewBtn = document.createElement('button');
                        modalOverviewBtn.className = 'mini-btn overview-btn sim-modal-overview-btn';
                        modalOverviewBtn.innerHTML = '<i class="fa-solid fa-circle-info"></i> overview';
                        videoContainer.appendChild(modalOverviewBtn);
                    }

                    modalOverviewBtn.onclick = (e) => {
                        e.stopPropagation();
                        if (window.openOverviewModal) {
                            window.openOverviewModal(
                                sim.title,
                                sim.desc,
                                sim.whyText,
                                sim.learnedText,
                                sim.challengesText
                            );
                        }
                    };

                    modal.classList.remove('hidden');
                    modalVideo.play().catch(() => {});
                });

                const overviewBtn = card.querySelector('.overview-btn');
                if (overviewBtn) {
                    overviewBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (window.openOverviewModal) {
                            window.openOverviewModal(
                                sim.title,
                                sim.desc,
                                sim.whyText,
                                sim.learnedText,
                                sim.challengesText
                            );
                        }
                    });
                }

                container.appendChild(card);
            });
        };

        const featuredSims = simulationsData.filter(s => featuredSimIds.includes(s.id));

        renderSims(featuredGrid, featuredSims);
        renderSims(allGrid, simulationsData);

        const closeModal = () => {
            modal.classList.add('hidden');
            modalVideo.pause();
            setTimeout(() => {
                modalVideo.src = '';
            }, 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    setupPortfolioOverlay() {
        const openBtn = document.getElementById('open-full-portfolio-btn');
        const closeBtn = document.getElementById('close-portfolio-btn');
        const closeBtnFront = document.getElementById('close-portfolio-btn-front');
        const overlay = document.getElementById('full-portfolio-page');
        const scrollToSimsBtn = document.getElementById('scroll-to-sims-btn');

        if (openBtn && (closeBtn || closeBtnFront) && overlay) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                overlay.scrollTo(0, 0);

                if (scrollToSimsBtn) {
                    scrollToSimsBtn.classList.remove('hidden-btn');
                }
            });

            const triggerClose = () => {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            };

            if (closeBtn) closeBtn.addEventListener('click', triggerClose);
            if (closeBtnFront) closeBtnFront.addEventListener('click', triggerClose);
        }

        if (scrollToSimsBtn && overlay) {
            const target = document.getElementById('dynamics-sims-section');

            const updateButtonVisibility = () => {
                if (!target) return;

                const overlayRect = overlay.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();

                const isSectionBelow = targetRect.top > overlayRect.bottom - 120;

                if (isSectionBelow) {
                    scrollToSimsBtn.classList.remove('hidden-btn');
                } else {
                    scrollToSimsBtn.classList.add('hidden-btn');
                }
            };

            overlay.addEventListener('scroll', updateButtonVisibility, {
                passive: true
            });

            window.addEventListener('resize', updateButtonVisibility);

            scrollToSimsBtn.addEventListener('click', () => {
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    setupOverviewModal() {
        const overviewModal = document.getElementById('overview-modal');
        const overviewCloseBtn = document.getElementById('overview-close-btn');

        if (overviewCloseBtn && overviewModal) {
            const closeOverview = () => {
                overviewModal.classList.add('hidden');
            };
            overviewCloseBtn.addEventListener('click', closeOverview);
            overviewModal.addEventListener('click', (e) => {
                if (e.target === overviewModal) closeOverview();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !overviewModal.classList.contains('hidden')) {
                    closeOverview();
                }
            });
        }
    }

    /* ========== NEW: VS Code Sidebar + Right-slide pages ========== */
    setupSidebarAndRightPages() {
        const trigger = document.getElementById('sidebar-trigger');
        const sidebar = document.getElementById('vs-sidebar');
        const backdrop = document.getElementById('vs-sidebar-backdrop');
        const closeBtn = document.getElementById('vs-sidebar-close');
        const items = document.querySelectorAll('.vs-sidebar-item');
        const closeRightBtns = document.querySelectorAll('.close-right-page');
        const mentoringContactBtn = document.getElementById('mentoring-contact-btn');

        const openSidebar = () => {
            sidebar.classList.add('open');
            backdrop.classList.add('visible');
            document.body.style.overflow = 'hidden';
        };

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            backdrop.classList.remove('visible');
            // only restore scroll if no right page is open
            if (!document.querySelector('.page-overlay-right.active')) {
                document.body.style.overflow = 'auto';
            }
        };

        if (trigger) trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (backdrop) backdrop.addEventListener('click', closeSidebar);

        // Shared opener for right-slide overlays (used by sidebar + Lab Spotlight tech notes → journal)
        window.openRightPage = function openRightPage(pageId) {
            const page = document.getElementById(`page-${pageId}`);
            if (!page) return;
            closeSidebar();
            document.querySelectorAll('.page-overlay-right').forEach(p => p.classList.remove('active'));
            page.classList.add('active');
            document.body.style.overflow = 'hidden';
            page.scrollTo(0, 0);
            if (pageId === 'glossary' && typeof window.initGlossary === 'function') {
                window.initGlossary();
            }
            if (pageId === 'trivia' && typeof window.initTrivia === 'function') {
                window.initTrivia();
            }
        };

        items.forEach(item => {
            item.addEventListener('click', () => {
                const pageId = item.dataset.page;
                if (typeof window.openRightPage === 'function') {
                    window.openRightPage(pageId);
                }
            });
        });

        closeRightBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.closest('.page-overlay-right');
                if (page) {
                    page.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Mentoring → Contact redirect
        if (mentoringContactBtn) {
            mentoringContactBtn.addEventListener('click', () => {
                const mentoringPage = document.getElementById('page-mentoring');
                if (mentoringPage) {
                    mentoringPage.classList.remove('active');
                }
                document.body.style.overflow = 'auto';

                // small delay so the overlay finishes closing before scroll
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 350);
            });
        }

        // Escape closes right page or sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeRight = document.querySelector('.page-overlay-right.active');
                if (activeRight) {
                    activeRight.classList.remove('active');
                    document.body.style.overflow = 'auto';
                } else if (sidebar.classList.contains('open')) {
                    closeSidebar();
                }
            }
        });
    }

    setupAchievementsGallery() {
        const track = document.getElementById('gallery-track');
        const prevBtn = document.getElementById('gallery-prev');
        const nextBtn = document.getElementById('gallery-next');
        const dotsContainer = document.getElementById('gallery-dots');
        const captionEl = document.getElementById('gallery-caption');
        const galleryEl = document.getElementById('achievements-gallery');

        if (!track) return;

        const slides = track.querySelectorAll('.gallery-slide');
        let current = 0;

        // build dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.gallery-dot');

        const updateCaption = (index) => {
            if (!captionEl) return;
            const text = slides[index]?.dataset.caption || '';
            captionEl.classList.add('is-fading');
            setTimeout(() => {
                captionEl.textContent = text;
                captionEl.classList.remove('is-fading');
            }, 160);
        };

        const goTo = (index) => {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            updateCaption(current);
        };

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

        // touch / swipe support
        if (galleryEl) {
            let startX = 0;
            let deltaX = 0;
            let isDragging = false;

            galleryEl.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                deltaX = 0;
                isDragging = true;
            }, { passive: true });

            galleryEl.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                deltaX = e.touches[0].clientX - startX;
            }, { passive: true });

            galleryEl.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                if (Math.abs(deltaX) > 50) {
                    if (deltaX < 0) goTo(current + 1);
                    else goTo(current - 1);
                }
            }, { passive: true });
        }

        // set initial caption
        updateCaption(0);
    }


    setupJournalFilters() {
        const filters = document.getElementById('journal-filters');
        const feed = document.getElementById('journal-feed');
        if (!filters || !feed) return;

        const buttons = filters.querySelectorAll('.journal-filter');
        const entries = feed.querySelectorAll('.journal-entry');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                entries.forEach(entry => {
                    const tags = (entry.dataset.tags || '').trim().split(/\s+/).filter(Boolean);
                    if (filter === 'all' || tags.includes(filter)) {
                        entry.classList.remove('journal-hidden');
                    } else {
                        entry.classList.add('journal-hidden');
                    }
                });
            });
        });
    }


    setupQuestions() {
        const filters = document.getElementById('questions-filters');
        const feed = document.getElementById('questions-feed');
        const countEl = document.getElementById('questions-result-count');
        const modal = document.getElementById('questions-answer-modal');
        const modalTitle = document.getElementById('questions-answer-title');
        const modalBody = document.getElementById('questions-answer-body');
        const modalClose = document.getElementById('questions-answer-close');
        if (!filters || !feed) return;

        const answers = {
            'q-mesh-conv-2r': {
                title: 'selective refinement vs uniform h-refinement',
                body: `uniform refinement of the full 2r domain hit the browser heap limit before stress recovery converged. selective refinement around the elbow joint and base support recovered max von mises within ~2% of the last successful uniform mesh while staying under the memory cap. the trade-off is extra bookkeeping for hanging-node constraints and a less automatic workflow — but it is the only path that finished in pure js without streaming the matrix out of core.`
            },
            'q-dls-lambda': {
                title: 'damped least-squares near the reach circle',
                body: `λ ≈ 0.02 kept joint-rate trajectories continuous through the outer workspace without visible elbow flips. larger λ (0.05–0.1) felt overdamped and lagged the target; smaller λ still oscillated between configurations. hysteresis on the elbow-up / elbow-down branch plus the soft dls barrier together closed the loop for the physical paddle demo.`
            },
            'q-lbm-fsi': {
                title: 'float32 lbm + flexible beam stability',
                body: `at moderate reynolds (roughly up to a few hundred on the tested grids) float32 typed arrays held a stable fsi coupling when the structural timestep was sub-cycled and a light numerical viscosity was retained in the collision operator. higher re or large beam deflections still produced density blow-ups; those cases need either a smaller lattice spacing, gpu offload, or a stronger stabilization scheme before they are trustworthy.`
            },
            'q-pid-windup': {
                title: 'anti-windup on the 2r motor plant',
                body: `conditional integration (freeze the integral while the actuator is saturated and the error has the same sign) reduced overshoot on recovery more cleanly than hard-clamping the integrator state. clamping alone still left a residual kick when the plant came out of saturation. derivative filtering stayed on; the win was almost entirely from how the integral term was gated.`
            },
            'q-csr-offbyone': {
                title: 'patch-test failure root cause',
                body: `the bug was an off-by-one in the coo→csr row-pointer construction, not the condensation order. a one-element patch test produced wrong nodal forces until the converter was fixed; after that, the same condensation path passed the patch and matched the analytical bar solution. journal entry 2026-04-27 tracks the regression test that now guards the sparse format.`
            }
        };

        const entries = () => feed.querySelectorAll('.questions-entry');

        const updateCount = () => {
            const visible = [...entries()].filter(e => !e.classList.contains('questions-hidden'));
            if (countEl) {
                const n = visible.length;
                countEl.textContent = `${n} question${n === 1 ? '' : 's'}`;
            }
        };

        filters.querySelectorAll('.questions-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filters.querySelectorAll('.questions-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                entries().forEach(entry => {
                    const status = entry.dataset.status || '';
                    const tags = (entry.dataset.tags || '').trim().split(/\s+/).filter(Boolean);
                    let show = true;
                    if (filter === 'all') show = true;
                    else if (filter === 'open' || filter === 'answered') show = status === filter;
                    else show = tags.includes(filter);
                    entry.classList.toggle('questions-hidden', !show);
                });
                updateCount();
            });
        });

        const openModal = (id) => {
            const data = answers[id];
            if (!data || !modal) return;
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalBody) modalBody.innerHTML = `<p>${data.body}</p>`;
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            if (!modal) return;
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            // restore scroll only if no right-page is open
            if (!document.querySelector('.page-overlay-right.active')) {
                document.body.style.overflow = 'auto';
            }
        };

        feed.querySelectorAll('.questions-answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(btn.dataset.answerId);
            });
        });

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        updateCount();
    }

    setupNabilaiChatbot() {
        const toggle = document.getElementById('nabilai-toggle');
        const panel = document.getElementById('nabilai-panel');
        const closeBtn = document.getElementById('nabilai-close');
        const messagesEl = document.getElementById('nabilai-messages');
        const optionsEl = document.getElementById('nabilai-options');
        if (!toggle || !panel || !messagesEl || !optionsEl) return;

        // hide chatbot when any overlay page is open
        const syncOverlayState = () => {
            const openByClass = document.querySelector(
                '.full-page-overlay.active, .page-overlay-right.active, #full-portfolio-page.active'
            );
            if (openByClass) {
                document.body.classList.add('overlay-open');
            } else {
                document.body.classList.remove('overlay-open');
            }
        };

        const overlays = [
            document.getElementById('full-portfolio-page'),
            document.getElementById('page-achievements'),
            document.getElementById('page-mentoring'),
            document.getElementById('page-workflow'),
            document.getElementById('page-journal'),
            document.getElementById('page-questions'),
            document.getElementById('page-glossary'),
            document.getElementById('page-trivia'),
            document.getElementById('page-toolbox'),
            document.getElementById('page-accomplishments'),
            document.getElementById('page-future-goals')
        ].filter(Boolean);

        const obs = new MutationObserver(syncOverlayState);
        overlays.forEach(el => obs.observe(el, { attributes: true, attributeFilter: ['class', 'style'] }));
        document.addEventListener('click', () => setTimeout(syncOverlayState, 80), { passive: true });

// ----- conversation data -----
const stages = [
    {
        label: 'the basics',
        options: [
            {
                q: 'why did you choose computational engineering?',
                a: 'i like the mix of real physics, numerics, and code that actually has to stay honest with the physical world. pure software felt a little too detached, pure mechanical work sometimes treated the solvers as black boxes. computational engineering / quantitative scientific computing lets me keep one foot in continuum mechanics and one foot in writing the solvers, filters, and sciml-style models myself.'
            },
            {
                q: 'what originally got you interested in engineering?',
                a: 'taking stuff apart as a kid and wanting to know why it worked. later it was watching how software could drive physical systems — robots, simulations, control loops. once i saw that you could close the loop from math → code → hardware (or even stay purely computational and still stay faithful to the physics), i was hooked.'
            },
            {
                q: 'why computational mechanics / sciml instead of pure computer science?',
                a: 'i still write a lot of code, but pure cs felt a little too detached from the physics for me. computational mechanics and quantitative scientific computing let me keep the numerics, the continuum models, and the machine-learning layer in the same problem. i get to assemble stiffness matrices, build topology pipelines, and experiment with physics-informed methods — then still print the part or tune the motor if i want. that combination is what keeps me going.'
            }
        ]
    },
    {
        label: 'how it started',
        options: [
            {
                q: 'when did you start programming?',
                a: 'seriously around early high school. started with simple scripts and web stuff, then moved into python for numerics and c++ when i needed speed for the dynamics and fea tools. the programming side grew naturally out of wanting better tools for the engineering and scientific computing problems i was already interested in.'
            },
            {
                q: 'when did you start working with cad?',
                a: 'mid high school, once i needed real geometry for the robot links and fixtures. parametric cad became the bridge between the kinematics numbers and the parts i could actually print or machine. now it is just part of the normal loop — model, analyze, revise — whether the end goal is a physical prototype or a pure simulation study.'
            },
            {
                q: 'when did you start building physical projects?',
                a: 'the 2r planar robot paddle was the first real mechatronics build that closed the full loop: camera → kinematics → pid → motors. before that it was smaller electronics and prints, but that project is when software, numerics, and hardware stopped being separate hobbies.'
            }
        ]
    },
    {
        label: 'how you work',
        options: [
            {
                q: 'what made you start writing your own engineering software?',
                a: 'commercial tools are great until you want to change the algorithm or just understand what is happening under the hood. for topology optimization, the browser fea playground, and the generative cto engine i wanted the math to be mine — so i could swap filters, change the objective, experiment with physics-informed layers, or run it in a browser without a license. building the solvers forced me to actually learn the methods instead of treating them as black boxes.'
            },
            {
                q: 'why are you so interested in computational mechanics and sciml?',
                a: 'because most of the interesting problems sit at the intersection of continuum mechanics, numerics, scientific computing, and machine learning. once you can assemble a stiffness matrix, filter a density field, integrate a multibody system, or train a physics-informed model yourself, the commercial packages stop feeling magical and start feeling like tools you can improve. that is the part i enjoy most.'
            },
            {
                q: 'why do you combine software, numerics, and mechanical systems?',
                a: 'a lot of modern engineering work is already computational — fea, optimization, controls, digital twins, sciml. if you only know the theory or only know the code, you miss half the design loop. writing the tools lets me test ideas faster, inject learning-based components where they make sense, and understand the assumptions that commercial software quietly makes.'
            }
        ]
    },
    {
        label: 'what you care about',
        options: [
            {
                q: 'what area of engineering interests you the most?',
                a: 'computational mechanics, quantitative scientific computing, and sciml right now — topology optimization, custom fea / cfd pipelines, physics-informed methods, and the robotics / kinematics side that turns those designs into things that move. i also keep coming back to dynamics simulations and digital twins because they force you to be honest about energy, contact, and model fidelity.'
            },
            {
                q: 'what area are you currently trying to learn more about?',
                a: 'deeper numerical methods for large sparse systems, better manufacturing constraints inside topology optimization, more robust contact / impact formulations, and physics-informed / scientific machine learning techniques for system identification, surrogate modeling, and design. also starting to look harder at cyber-physical security for industrial control systems and quantitative modeling of markets — still early, but both sit at cool intersections.'
            },
            {
                q: 'do you consider yourself more of a computational engineer, software developer, or mechatronics engineer?',
                a: 'computational engineer with a strong mechatronics streak is probably the honest label. the projects that feel most like “me” are the ones that need continuum models, numerics or sciml methods, and sometimes a physical plant at the same time. pure software and pure structures work are both in service of that middle ground.'
            }
        ]
    },
    {
        label: 'where you are headed',
        options: [
            {
                q: 'what field do you want to specialize in?',
                a: 'computational mechanics, quantitative scientific computing, and design automation / sciml — topology optimization, custom simulation pipelines, physics-informed modeling, and the robotics / control layer that turns optimized structures into working systems. i want the software, the numerics, and the hardware (when it exists) to stay tightly coupled.'
            },
            {
                q: 'do you want to pursue research or industry?',
                a: 'both, ideally. research for the deep methods, open questions, and sciml techniques; industry for the constraint of real hardware, schedules, and manufacturing. the best work i have done so far has always had a foot in each.'
            },
            {
                q: 'do you want to eventually work on your own projects/company?',
                a: 'yes. long term i want the freedom to pick the problems and ship tools or products that actually get used. a company is one path; strong independent projects and open scientific computing tools are another. either way the goal is the same — keep building things that close the loop between simulation, learning, and the physical world.'
            }
        ]
    },
    {
        label: 'school & learning',
        options: [
            {
                q: 'why did you take such a heavy stem course load?',
                a: 'because the independent projects were already asking for the math, physics, and numerical methods. ap physics, calc, dual enrollment, and the engineering associate work were not just resume padding — they were the language i needed to make the fea, controls, dynamics, and early sciml-style code trustworthy.'
            },
            {
                q: 'which class influenced your interests the most?',
                a: 'ap physics and the college-level statics / dynamics style courses, plus the numerical linear algebra and programming work that grew out of them. once forces, energy, free-body diagrams, and discrete solvers stopped being homework and started being the language of the robot arm, the topology runs, and the custom assemblers, everything clicked into place.'
            },
            {
                q: 'how did ap physics affect the way you approach computational work?',
                a: 'it trained me to start from conservation laws and free-body diagrams instead of jumping straight to software or a black-box model. even when i am writing a solver or a physics-informed network, i still ask “where does the energy go?” and “what are the boundary conditions really doing?” that habit came from physics.'
            }
        ]
    },
    {
        label: 'projects & self-teaching',
        options: [
            {
                q: 'how do you balance coursework with independent engineering projects?',
                a: 'the projects usually become the reason the coursework matters. when a class covers something i need for the robot, the optimizer, or a numerical method, the homework stops feeling abstract. time management is still real — i protect deep-work blocks for coding, numerics, and hardware and treat the class deadlines as hard constraints.'
            },
            {
                q: 'do your independent projects usually go beyond what you are learning in class?',
                a: 'almost always. class gives the foundations; the projects force the next layer — sparse solvers, contact models, real motor dynamics, manufacturing constraints, density filtering, and early sciml experiments. that gap is intentional. it is how i figure out what i still need to learn.'
            },
            {
                q: 'what concepts have you taught yourself outside school?',
                a: 'simp topology optimization, density filtering and heaviside projection, custom stiffness-matrix assembly, damped least-squares inverse kinematics, basic multibody contact, sparse numerical linear algebra that keeps the browser and c++ solvers stable, and the beginnings of physics-informed / scientific machine learning approaches for engineering problems.'
            }
        ]
    },
    {
        label: 'looking ahead',
        options: [
            {
                q: 'what kind of research would you want to participate in?',
                a: 'computational design methods that respect manufacturing and dynamics constraints from the start, physics-informed / sciml techniques for modeling and optimization, or robotics / mechatronics work where the structural design and the control policy are co-optimized. anything that keeps the simulation and the learning honest about the physical plant.'
            },
            {
                q: 'do you want to pursue graduate school?',
                a: 'likely yes, especially if it lets me go deeper on computational mechanics, quantitative scientific computing, or sciml while still staying close to hardware validation or real systems when it makes sense. the exact timing depends on finding the right group and problem, not just collecting another degree.'
            },
            {
                q: 'what kind of engineer / computational scientist do you want to be by the end of university?',
                a: 'someone who can take a structural, dynamic, or multiphysics problem, write or adapt the numerical and learning-based tools, produce a design or model that respects real constraints, and then stand next to the physical prototype (or the high-fidelity simulation) and explain why the numbers matched (or why they did not). fluent in both the continuous math and the discrete code, comfortable with sciml methods, and still willing to pick up a screwdriver.'
            }
        ]
    }
];

        let stageIndex = 0;
        let isBusy = false;

        const scrollToBottom = () => {
            requestAnimationFrame(() => {
                messagesEl.scrollTop = messagesEl.scrollHeight;
            });
        };

        const addMessage = (text, who = 'bot') => {
            const div = document.createElement('div');
            div.className = `nabilai-msg ${who}`;
            div.textContent = text;
            messagesEl.appendChild(div);
            scrollToBottom();
            return div;
        };

        const showTyping = () => {
            const el = document.createElement('div');
            el.className = 'nabilai-typing';
            el.id = 'nabilai-typing-indicator';
            el.innerHTML = `
                <span class="nabilai-typing-label">nabilai</span>
                <span class="nabilai-typing-gears">
                    <i class="fa-solid fa-gear"></i>
                    <i class="fa-solid fa-gear"></i>
                    <i class="fa-solid fa-gear"></i>
                </span>`;
            messagesEl.appendChild(el);
            scrollToBottom();
            return el;
        };

        const hideTyping = () => {
            const el = document.getElementById('nabilai-typing-indicator');
            if (el) el.remove();
        };

        const renderOptions = () => {
            optionsEl.innerHTML = '';
            if (stageIndex >= stages.length) {
                const wrap = document.createElement('div');
                wrap.className = 'nabilai-restart';
                const btn = document.createElement('button');
                btn.className = 'nabilai-restart-btn';
                btn.textContent = 'start over';
                btn.addEventListener('click', () => {
                    stageIndex = 0;
                    messagesEl.innerHTML = '';
                    addMessage('hey — ask me anything from the list. i will keep the answers real and tied to the work on this site.');
                    renderOptions();
                });
                wrap.appendChild(btn);
                optionsEl.appendChild(wrap);
                return;
            }

            const stage = stages[stageIndex];
            const label = document.createElement('div');
            label.className = 'nabilai-stage-label';
            label.textContent = stage.label;
            optionsEl.appendChild(label);

            stage.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'nabilai-opt-btn';
                btn.textContent = opt.q;
                btn.addEventListener('click', () => handleOption(opt));
                optionsEl.appendChild(btn);
            });
        };

        const handleOption = async (opt) => {
            if (isBusy) return;
            isBusy = true;

            optionsEl.querySelectorAll('.nabilai-opt-btn').forEach(b => b.disabled = true);

            addMessage(opt.q, 'user');

            await new Promise(r => setTimeout(r, 280));
            showTyping();

            const delay = Math.min(1600, 700 + opt.a.length * 4);
            await new Promise(r => setTimeout(r, delay));
            hideTyping();

            addMessage(opt.a, 'bot');

            stageIndex += 1;
            await new Promise(r => setTimeout(r, 350));
            renderOptions();
            isBusy = false;
        };

        const openPanel = () => {
            panel.classList.remove('hidden');
            toggle.classList.add('is-open');
            if (messagesEl.children.length === 0) {
                addMessage('hey — ask me anything from the list. i will keep the answers real and tied to the work on this site.');
                renderOptions();
            }
        };

        const closePanel = () => {
            panel.classList.add('hidden');
            toggle.classList.remove('is-open');
        };

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle.classList.add('is-clicking');
            setTimeout(() => toggle.classList.remove('is-clicking'), 320);

            if (panel.classList.contains('hidden')) {
                setTimeout(openPanel, 120);
            } else {
                closePanel();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closePanel();
            });
        }

        document.addEventListener('click', (e) => {
            if (!panel.classList.contains('hidden') &&
                !panel.contains(e.target) &&
                !toggle.contains(e.target)) {
                closePanel();
            }
        });

        setTimeout(syncOverlayState, 300);
    }

    setupMarkets() {
        const filters = document.querySelectorAll('#markets-trade-filters .markets-filter-btn');
        const rows = document.querySelectorAll('#markets-trade-table tbody tr');

        if (filters.length && rows.length) {
            filters.forEach(btn => {
                btn.addEventListener('click', () => {
                    filters.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.dataset.filter || 'all';
                    rows.forEach(row => {
                        const asset = row.dataset.asset || '';
                        const show = filter === 'all' || asset === filter;
                        row.classList.toggle('markets-row-hidden', !show);
                    });
                });
            });
        }

        // in-page section nav (markets overlay only)
        const page = document.getElementById('page-markets');
        const navLinks = document.querySelectorAll('.markets-section-nav .markets-nav-link');
        if (page && navLinks.length) {
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href') || '';
                    if (!href.startsWith('#')) return;
                    const target = page.querySelector(href);
                    if (!target) return;
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        }
    }

    setupMentorshipNotif() {
        const btn = document.getElementById('mentorship-notif-btn');
        const popover = document.getElementById('mentorship-notif-popover');
        const closeBtn = document.getElementById('mentorship-notif-close');
        if (!btn || !popover) return;

        const STORAGE_KEY = 'mentorship_notif_clicked';
        const CLOSE_MS = 280;
        let isOpen = false;
        let closeTimer = null;

        const hasClicked = () => {
            try {
                return localStorage.getItem(STORAGE_KEY) === 'true';
            } catch {
                return false;
            }
        };

        const markClicked = () => {
            try {
                localStorage.setItem(STORAGE_KEY, 'true');
            } catch (e) {
                console.warn('could not persist mentorship notif state', e);
            }
            btn.classList.remove('is-idle');
            btn.classList.add('is-static');
        };

        // pulse only until first click ever
        if (hasClicked()) {
            btn.classList.add('is-static');
        } else {
            btn.classList.add('is-idle');
        }

        const openPopover = () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            isOpen = true;
            popover.hidden = false;
            void popover.offsetWidth;
            requestAnimationFrame(() => {
                popover.classList.add('is-open');
            });
            btn.setAttribute('aria-expanded', 'true');
            markClicked();
        };

        const closePopover = () => {
            if (!isOpen && !popover.classList.contains('is-open')) return;
            isOpen = false;
            popover.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                if (!isOpen) popover.hidden = true;
                closeTimer = null;
            }, CLOSE_MS);
        };

        const togglePopover = () => {
            if (isOpen) closePopover();
            else openPopover();
        };

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePopover();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closePopover();
            });
        }

        document.addEventListener('click', (e) => {
            if (!isOpen) return;
            if (popover.contains(e.target) || btn.contains(e.target)) return;
            closePopover();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) closePopover();
        });
    }


}

window.openOverviewModal = (title, summary, why, learned, challenges) => {
    document.getElementById('overview-title').innerHTML = title;
    document.getElementById('overview-summary').innerHTML = summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    document.getElementById('overview-why').innerHTML = why || "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore.";
    document.getElementById('overview-learned').innerHTML = learned || "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.";
    document.getElementById('overview-challenges').innerHTML = challenges || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.";

    const modal = document.getElementById('overview-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
};

/* =========================================================
   LAB SPOTLIGHT — one project + one dynamics sim per calendar day
   Resets at local midnight (stable across refreshes until next day)
   ========================================================= */
window.initLabSpotlight = function initLabSpotlight() {
    const projectSlot = document.getElementById('lab-project-slot');
    const simSlot = document.getElementById('lab-sim-slot');
    if (!projectSlot || !simSlot) return;

    const projects = window.__projectsData;
    const sims = window.__simulationsData;

    if (!projects || !projects.length || !sims || !sims.length) {
        setTimeout(() => {
            if (window.__projectsData && window.__simulationsData) {
                window.initLabSpotlight();
            }
        }, 120);
        return;
    }

    // Deterministic daily seed from local YYYY-MM-DD (changes at midnight)
    const now = new Date();
    const dayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Simple seeded RNG (mulberry32) so the same day always yields the same pair
    const hashDay = (str) => {
        let h = 1779033703 ^ str.length;
        for (let i = 0; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
            h = (h << 13) | (h >>> 19);
        }
        return (h >>> 0);
    };
    const mulberry32 = (a) => () => {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const rand = mulberry32(hashDay(dayKey));

    const project = projects[Math.floor(rand() * projects.length)];
    const sim = sims[Math.floor(rand() * sims.length)];

    // --- Project side ---
    const titleEl = document.getElementById('lab-project-title');
    const tagEl = document.getElementById('lab-project-tag');
    const descEl = document.getElementById('lab-project-desc');
    const techEl = document.getElementById('lab-project-tech');
    const linksEl = document.getElementById('lab-project-links');
    const overviewBtn = document.getElementById('lab-project-overview-btn');

    if (titleEl) titleEl.innerHTML = project.title || 'untitled project';
    if (tagEl) tagEl.textContent = project.tag || '';

    // Spotlight-only slightly deeper blurb (still fits the card).
    // Regular project cards elsewhere keep the original short description.
    if (descEl) {
        const base = (project.description || '').trim();
        let extra = '';
        if (project.why) {
            // one short sentence from why — soft cap so the card stays balanced
            const why = project.why.trim().replace(/\s+/g, ' ');
            const firstSentence = (why.match(/^[^.!?]+[.!?]?/) || [why])[0];
            extra = firstSentence.length > 190
                ? firstSentence.slice(0, 187).replace(/\s+\S*$/, '') + '…'
                : firstSentence;
        }
        descEl.textContent = extra ? `${base} ${extra}` : base;
    }

    if (techEl) {
        if (project.techSpecs) {
            techEl.innerHTML = `
                <button type="button" class="lab-tech-notes-link" id="lab-tech-notes-btn" title="open lab journal">
                    <em>tech notes</em>
                </button>
                <span class="lab-tech-sep">·</span>
                <span class="lab-tech-body">${project.techSpecs}</span>
            `;
            techEl.style.display = '';
            const techBtn = document.getElementById('lab-tech-notes-btn');
            if (techBtn) {
                techBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (typeof window.openRightPage === 'function') {
                        window.openRightPage('journal');
                    }
                });
            }
        } else {
            techEl.innerHTML = '';
            techEl.style.display = 'none';
        }
    }

    if (linksEl) {
        let html = '';
        if (project.repo) {
            html += `<a href="${project.repo}" class="highlight-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> repo</a>`;
        }
        if (project.link) {
            html += `<a href="${project.link}" class="highlight-link" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> live site</a>`;
        }
        linksEl.innerHTML = html;
    }

    if (overviewBtn) {
        overviewBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.openOverviewModal) {
                window.openOverviewModal(
                    project.title,
                    project.description,
                    project.why || '',
                    project.learned || '',
                    project.challenges || ''
                );
            }
        };
    }

    // --- Simulation side ---
    const videoEl = document.getElementById('lab-sim-video');
    const simTitleEl = document.getElementById('lab-sim-title');
    const simDescEl = document.getElementById('lab-sim-desc');
    const simOverviewBtn = document.getElementById('lab-sim-overview-btn');

    if (simTitleEl) simTitleEl.textContent = sim.title || 'dynamics simulation';
    if (simDescEl) simDescEl.textContent = sim.desc || '';

    if (videoEl && sim.videoSrc) {
        videoEl.src = sim.videoSrc;
        videoEl.load();
        const tryPlay = () => {
            videoEl.play().catch(() => {});
        };
        videoEl.addEventListener('loadeddata', tryPlay, { once: true });
        if (videoEl.readyState >= 2) tryPlay();

        const card = document.getElementById('lab-sim-slot');
        if (card) {
            card.addEventListener('mouseenter', () => videoEl.play().catch(() => {}));
        }
    }

    if (simOverviewBtn) {
        simOverviewBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.openOverviewModal) {
                window.openOverviewModal(
                    sim.title,
                    sim.desc,
                    sim.whyText || '',
                    sim.learnedText || '',
                    sim.challengesText || ''
                );
            }
        };
    }
};

async function updateDiscordCard() {
    const statusCard = document.querySelector('.status-card');
    const statusAvatar = document.querySelector('.status-avatar');
    const statusDot = document.querySelector('.discord-status-dot');
    const statusIndicator = document.getElementById('discord-status-indicator');
    const statusName = document.querySelector('.status-info h3');
    const statusText = document.querySelector('.status-info p');

    const userId = "1056634135961153576";

    if (statusCard) statusCard.classList.add('loading');

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (!response.ok) throw new Error('Network status payload mismatch error');

        const data = await response.json();

        if (data.success && data.data) {
            const presence = data.data;
            const currentStatus = presence.discord_status || 'offline';

            if (statusAvatar && presence.discord_user.avatar) {
                const targetSrc = `https://cdn.discordapp.com/avatars/${userId}/${presence.discord_user.avatar}.png?size=128`;
                if (statusAvatar.src !== targetSrc) {
                    statusAvatar.src = targetSrc;
                    statusAvatar.alt = `${presence.discord_user.global_name || presence.discord_user.username}'s Profile`;
                }
            }

            if (statusName) {
                const targetName = presence.discord_user.global_name || presence.discord_user.username;
                if (statusName.textContent !== targetName) statusName.textContent = targetName;
            }

            if (statusDot) {
                let statusColor = '#80848e';
                switch (currentStatus) {
                    case 'online':
                        statusColor = '#23a55a';
                        break;
                    case 'idle':
                        statusColor = '#f0b232';
                        break;
                    case 'dnd':
                        statusColor = '#f23f43';
                        break;
                    default:
                        statusColor = '#80848e';
                }
                if (statusDot.style.backgroundColor !== statusColor) {
                    statusDot.style.backgroundColor = statusColor;
                }
            }

            if (statusIndicator) {
                const targetClass = `discord-status-aesthetic status-${currentStatus}`;
                if (statusIndicator.className !== targetClass) {
                    statusIndicator.className = targetClass;
                }
            }

            if (statusText) {
                let newText = '';
                if (presence.custom_status) {
                    if (presence.custom_status.emoji && presence.custom_status.emoji.name) {
                        newText += presence.custom_status.emoji.name + ' ';
                    }
                    newText += presence.custom_status.text || '';
                    newText = newText.trim() || 'Active now';
                } else if (presence.activities && presence.activities.length > 0) {
                    const activeGame = presence.activities.find(act => act.type !== 4);
                    newText = activeGame ? `Playing ${activeGame.name}` : currentStatus.toUpperCase();
                } else {
                    newText = currentStatus === 'offline' ? 'offline right now' : 'online / active';
                }
                if (statusText.textContent !== newText) statusText.textContent = newText;
            }
        }
    } catch (err) {
        console.error("Lanyard payload syncing optimization abort:", err);
        if (statusText) statusText.textContent = "playing with finite element analysis . . .";
        if (statusIndicator) {
            statusIndicator.className = 'discord-status-aesthetic status-offline';
        }
    } finally {
        if (statusCard) statusCard.classList.remove('loading');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    if (typeof updateDiscordCard === 'function') {
        updateDiscordCard();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
/* =========================================================
   ENGINEERING TRIVIA
   ========================================================= */

const TRIVIA_TOPICS = {
  all: {
    id: "all",
    label: "all topics",
    desc: "mixed bag across everything",
    icon: "fa-solid fa-globe"
  },
  fea: {
    id: "fea",
    label: "fea / mechanics",
    desc: "fem, meshes, stiffness, boundary conditions",
    icon: "fa-solid fa-cube"
  },
  topo: {
    id: "topo",
    label: "topology opt",
    desc: "simp, filters, compliance, volume fraction",
    icon: "fa-solid fa-bezier-curve"
  },
  robotics: {
    id: "robotics",
    label: "robotics",
    desc: "ik, jacobians, singularities, dofs",
    icon: "fa-solid fa-robot"
  },
  dynamics: {
    id: "dynamics",
    label: "dynamics",
    desc: "natural frequency, energy, resonance, lagrange",
    icon: "fa-solid fa-wave-square"
  },
  controls: {
    id: "controls",
    label: "controls",
    desc: "pid, lqr, windup, settling time",
    icon: "fa-solid fa-sliders"
  },
  numerics: {
    id: "numerics",
    label: "numerics",
    desc: "sparse matrices, web workers, conditioning",
    icon: "fa-solid fa-code"
  }
};

const TRIVIA_QUESTIONS = {
  fea: {
    foundational: [
      { q: "what does fem stand for in structural analysis?", options: ["finite element method", "force energy model", "flexible elastic material", "frequency excitation mode"], answer: 0 },
      { q: "young's modulus has units of:", options: ["force", "stress (pressure)", "energy", "dimensionless"], answer: 1 },
      { q: "which boundary condition fixes a displacement value?", options: ["neumann", "dirichlet", "robin", "mixed"], answer: 1 },
      { q: "mesh refinement generally aims to reduce:", options: ["material cost", "discretization error", "young's modulus", "poisson's ratio"], answer: 1 },
      { q: "poisson's ratio describes:", options: ["density change with temperature", "lateral contraction vs axial extension", "fatigue life", "thermal conductivity"], answer: 1 },
      { q: "safety factor is roughly:", options: ["strength / applied stress", "stress / strain", "mass / volume", "force / area only"], answer: 0 },
      { q: "degrees of freedom in a planar 2r robot arm:", options: ["1", "2", "3", "6"], answer: 1 },
      { q: "hooke's law relates force to:", options: ["mass × acceleration", "spring stiffness × extension", "pressure × area", "torque × angle"], answer: 1 },
      { q: "in a linear spring, force is proportional to:", options: ["velocity", "acceleration", "displacement", "jerk"], answer: 2 },
      { q: "compliance in structural optimization is a measure of:", options: ["mass", "flexibility (work done by loads)", "volume fraction", "mesh quality"], answer: 1 }
    ],
    intermediate: [
      { q: "a patch test in finite elements checks whether an element can:", options: ["handle large deformation", "represent constant stress/strain states exactly", "run in real time", "export to stl"], answer: 1 },
      { q: "the discrete system that results from finite-element spatial discretization of linear elasticity is typically:", options: ["a dense unconstrained ode", "a large sparse linear system Ku = f", "a pure eigenvalue problem with no loads", "a set of independent scalar equations"], answer: 1 },
      { q: "ill-conditioning of the stiffness matrix can be worsened by:", options: ["good element aspect ratios", "near-incompressibility or highly distorted elements", "using sparse storage", "applying dirichlet conditions"], answer: 1 },
      { q: "mesh dependency in topology optimization means:", options: ["the design stays the same under refinement", "the optimized layout changes unwantedly when the mesh is refined", "the mesh cannot be generated", "only triangular elements are allowed"], answer: 1 },
      { q: "the main computational bottleneck of a large 3-d linear elastic solve is often:", options: ["drawing the mesh", "assembling and solving the sparse system Ku = f", "writing the input deck by hand", "choosing the color map"], answer: 1 },
      { q: "csr (compressed sparse row) stores:", options: ["only the diagonal", "values, column indices, and row pointers", "a full dense copy", "only upper triangular entries"], answer: 1 },
      { q: "a sparse matrix is one where:", options: ["most entries are zero", "all entries are equal", "the matrix is singular", "rows sum to one"], answer: 0 },
      { q: "the condition number of a matrix roughly measures:", options: ["its sparsity", "sensitivity of the solution to perturbations", "the number of nonzeros", "its rank only"], answer: 1 }
    ],
    advanced: [
      { q: "a krylov subspace is generated by:", options: ["random sampling only", "repeated matrix-vector products with a starting vector", "svd of the full matrix", "finite-difference stencils"], answer: 1 },
      { q: "preconditioning an iterative solver aims to:", options: ["increase the condition number", "cluster eigenvalues so the solver converges in fewer iterations", "make the matrix dense", "eliminate the residual entirely in one step always"], answer: 1 },
      { q: "the frobenius norm of a matrix is:", options: ["the largest singular value only", "sqrt of the sum of squared entries", "the determinant", "the trace"], answer: 1 },
      { q: "anisotropic fdm strength means:", options: ["properties are identical in every direction", "interlayer strength is often much lower than filament-direction strength", "poisson's ratio is always 0.5", "young's modulus is infinite"], answer: 1 }
    ]
  },

  topo: {
    foundational: [
      { q: "compliance in structural optimization is a measure of:", options: ["mass", "flexibility (work done by loads)", "volume fraction", "mesh quality"], answer: 1 },
      { q: "volume fraction in topology optimization is:", options: ["always 1.0", "the allowed solid volume divided by design domain volume", "the same as density filter radius", "a free parameter with no constraint"], answer: 1 },
      { q: "mesh refinement generally aims to reduce:", options: ["material cost", "discretization error", "young's modulus", "poisson's ratio"], answer: 1 },
      { q: "safety factor is roughly:", options: ["strength / applied stress", "stress / strain", "mass / volume", "force / area only"], answer: 0 }
    ],
    intermediate: [
      { q: "in simp topology optimization, the penalization exponent p is typically:", options: ["less than 1", "equal to 1", "around 3 or higher", "exactly 0"], answer: 2 },
      { q: "checkerboarding in topology optimization is primarily controlled by:", options: ["raising the volume fraction", "density or sensitivity filtering", "using denser matrices", "switching to explicit dynamics"], answer: 1 },
      { q: "heaviside projection in topology optimization is used to:", options: ["increase mesh density", "push intermediate densities toward 0 or 1", "compute the jacobian", "assemble the force vector"], answer: 1 },
      { q: "the adjoint method in topology optimization is valued because it:", options: ["avoids assembling the stiffness matrix", "gives all design sensitivities at roughly the cost of one extra solve", "eliminates the need for a filter", "works only for nonlinear materials"], answer: 1 },
      { q: "mesh dependency in topology optimization means:", options: ["the design stays the same under refinement", "the optimized layout changes unwantedly when the mesh is refined", "the mesh cannot be generated", "only triangular elements are allowed"], answer: 1 },
      { q: "a pareto-optimal design is one where:", options: ["all objectives are simultaneously at their individual unconstrained optima", "no objective can be improved without worsening at least one other", "the volume fraction is exactly 0.5", "the mesh is uniform"], answer: 1 }
    ],
    advanced: [
      { q: "in the oc (optimality criteria) update for compliance minimization, the lagrange multiplier primarily enforces:", options: ["mesh quality", "the volume constraint", "time-step stability", "shader precision"], answer: 1 },
      { q: "continuation (homotopy) in topology optimization is used to:", options: ["skip the volume constraint", "gradually tighten difficult parameters (e.g. β or p) while tracking solutions", "replace the density field with a level set only", "run the solver on the gpu exclusively"], answer: 1 },
      { q: "morphological closing (dilation then erosion) in density fields is mainly used to:", options: ["increase compliance artificially", "enforce a minimum length scale / fill small holes", "compute the adjoint", "replace the stiffness matrix"], answer: 1 },
      { q: "a level-set representation of a boundary stores the interface as:", options: ["an explicit triangle mesh only", "the zero contour of a higher-dimensional scalar function", "a list of spring constants", "a dense pixel buffer without gradients"], answer: 1 }
    ]
  },

  robotics: {
    foundational: [
      { q: "degrees of freedom in a planar 2r robot arm:", options: ["1", "2", "3", "6"], answer: 1 },
      { q: "an end effector is:", options: ["the base of the robot", "the tool or gripper at the distal end", "a type of joint", "a control gain"], answer: 1 },
      { q: "the jacobian matrix in robotics maps:", options: ["forces to torques only", "joint velocities to end-effector velocities", "masses to accelerations", "pixels to coordinates"], answer: 1 },
      { q: "forward kinematics computes:", options: ["joint angles from tip pose", "tip pose from joint angles", "torques from forces", "gains from error"], answer: 1 }
    ],
    intermediate: [
      { q: "a singularity in a robot jacobian means:", options: ["the arm is at maximum speed", "the matrix loses rank and some tip motions become impossible", "all joints are locked", "the controller has zero error"], answer: 1 },
      { q: "damped least squares is used near singularities to:", options: ["increase joint speeds", "trade some accuracy for smoother joint motion", "remove all damping", "compute forward kinematics only"], answer: 1 },
      { q: "a homogeneous transformation matrix is typically:", options: ["2×2", "3×3", "4×4", "n×n for n dofs"], answer: 2 },
      { q: "in damped least squares the damping factor λ primarily:", options: ["increases cartesian accuracy at all costs", "limits joint velocity when the jacobian is nearly singular", "removes the need for a pseudoinverse", "sets the volume fraction"], answer: 1 }
    ],
    advanced: [
      { q: "the moore-penrose pseudoinverse satisfies how many penrose conditions?", options: ["1", "2", "4", "6"], answer: 2 },
      { q: "velocity-level contact constraints are preferred over pure position-level corrections because they:", options: ["are easier to code and always add energy", "better respect impact maps and energy consistency", "remove the need for a coefficient of restitution", "only work for soft bodies"], answer: 1 }
    ]
  },

  dynamics: {
    foundational: [
      { q: "natural frequency is the frequency at which a system:", options: ["fails", "oscillates freely after disturbance", "reaches steady state under force", "dissipates all energy"], answer: 1 },
      { q: "in a linear spring, force is proportional to:", options: ["velocity", "acceleration", "displacement", "jerk"], answer: 2 },
      { q: "hooke's law relates force to:", options: ["mass × acceleration", "spring stiffness × extension", "pressure × area", "torque × angle"], answer: 1 },
      { q: "the reynolds number is a ratio of:", options: ["inertial to viscous forces", "stress to strain", "kinetic to potential energy", "length to diameter"], answer: 0 }
    ],
    intermediate: [
      { q: "energy drift in a dynamics simulation often signals:", options: ["perfect conservation", "a numerical issue in integration or contact treatment", "too large a safety factor", "incorrect young's modulus"], answer: 1 },
      { q: "in a base-excitation problem the input is typically:", options: ["an applied force on the mass", "a prescribed motion of the support", "a temperature field", "a random material property"], answer: 1 },
      { q: "resonance occurs when a driving frequency approaches:", options: ["zero", "a natural frequency of the system", "the nyquist frequency only", "machine precision"], answer: 1 },
      { q: "lagrange multipliers appear when:", options: ["you minimize an unconstrained objective", "you enforce constraints in optimization or dynamics", "you compute a simple average", "you render a shader"], answer: 1 }
    ],
    advanced: [
      { q: "the open-loop eigenvalues of an inverted pendulum linearized about upright typically include:", options: ["only stable left-half-plane poles", "at least one unstable (positive real part) pole", "only pure imaginary poles", "no eigenvalues"], answer: 1 },
      { q: "velocity-level contact constraints are preferred over pure position-level corrections because they:", options: ["are easier to code and always add energy", "better respect impact maps and energy consistency", "remove the need for a coefficient of restitution", "only work for soft bodies"], answer: 1 }
    ]
  },

  controls: {
    foundational: [
      { q: "a pid controller has three terms. the 'i' stands for:", options: ["inertia", "integral", "impulse", "isotropic"], answer: 1 },
      { q: "natural frequency is the frequency at which a system:", options: ["fails", "oscillates freely after disturbance", "reaches steady state under force", "dissipates all energy"], answer: 1 }
    ],
    intermediate: [
      { q: "settling time in a step response is the time to:", options: ["reach the first peak", "enter and stay within a band around the final value", "leave the initial condition", "zero the derivative gain"], answer: 1 },
      { q: "integral windup occurs when:", options: ["the proportional gain is too low", "the integral term keeps accumulating while the actuator is saturated", "derivative action is zero", "the sampling rate is infinite"], answer: 1 },
      { q: "in lqr the cost function balances:", options: ["only control effort", "state error and control effort via weighting matrices q and r", "mesh size and time step", "shader precision and frame rate"], answer: 1 }
    ],
    advanced: [
      { q: "the open-loop eigenvalues of an inverted pendulum linearized about upright typically include:", options: ["only stable left-half-plane poles", "at least one unstable (positive real part) pole", "only pure imaginary poles", "no eigenvalues"], answer: 1 },
      { q: "observability is the property that:", options: ["the system can be driven to any state", "the full internal state can be reconstructed from outputs over time", "all poles are stable", "the controller has zero error"], answer: 1 }
    ]
  },

  numerics: {
    foundational: [
      { q: "a sparse matrix is one where:", options: ["most entries are zero", "all entries are equal", "the matrix is singular", "rows sum to one"], answer: 0 },
      { q: "in javascript, an arraybuffer is primarily used for:", options: ["storing strings", "raw binary data", "css styles", "dom nodes"], answer: 1 },
      { q: "a web worker runs code:", options: ["on the main ui thread only", "in a separate background thread", "only on the gpu", "only during page load"], answer: 1 },
      { q: "csr format is commonly used for:", options: ["image compression", "sparse matrix storage", "audio encoding", "json parsing"], answer: 1 },
      { q: "a unit test typically checks:", options: ["the whole application end-to-end", "one small piece of code in isolation", "network latency", "ui color contrast"], answer: 1 }
    ],
    intermediate: [
      { q: "csr (compressed sparse row) stores:", options: ["only the diagonal", "values, column indices, and row pointers", "a full dense copy", "only upper triangular entries"], answer: 1 },
      { q: "the condition number of a matrix roughly measures:", options: ["its sparsity", "sensitivity of the solution to perturbations", "the number of nonzeros", "its rank only"], answer: 1 },
      { q: "a transferable object in the browser (e.g. arraybuffer) allows:", options: ["copying data twice", "moving ownership between threads without copying", "only string messages", "gpu texture upload only"], answer: 1 },
      { q: "the frobenius norm of a matrix is:", options: ["the largest singular value only", "sqrt of the sum of squared entries", "the determinant", "the trace"], answer: 1 }
    ],
    advanced: [
      { q: "a krylov subspace is generated by:", options: ["random sampling only", "repeated matrix-vector products with a starting vector", "svd of the full matrix", "finite-difference stencils"], answer: 1 },
      { q: "preconditioning an iterative solver aims to:", options: ["increase the condition number", "cluster eigenvalues so the solver converges in fewer iterations", "make the matrix dense", "eliminate the residual entirely in one step always"], answer: 1 },
      { q: "a transferable arraybuffer sent via postmessage:", options: ["is copied and remains usable on both sides", "is neutered on the sending side and owned by the receiver", "can only contain integers", "requires webgl"], answer: 1 },
      { q: "the nyquist rate for a band-limited signal of bandwidth b is:", options: ["b samples/s", "2b samples/s", "b/2 samples/s", "4b samples/s"], answer: 1 },
      { q: "in a constrained optimization problem the stationarity condition involving ∇f = λ∇g is associated with:", options: ["unconstrained gradient descent", "lagrange multipliers", "pure random search", "mesh smoothing only"], answer: 1 }
    ]
  }
};

class TriviaController {
  constructor() {
    this.topic = "all";
    this.level = "foundational";
    this.count = 10;
    this.queue = [];
    this.index = 0;
    this.score = 0;
    this.answered = false;
    this.historyKey = "nabil-trivia-scores";
    this.popupShowAll = false;
    this.cacheDom();
    this.bindEvents();
    this.renderTopics();
    this.showSetup();
  }

  cacheDom() {
    this.setupEl = document.getElementById("trivia-setup");
    this.quizEl = document.getElementById("trivia-quiz");
    this.resultsEl = document.getElementById("trivia-results");
    this.topicRow = document.getElementById("trivia-topic-row");
    this.levelRow = document.getElementById("trivia-level-row");
    this.slider = document.getElementById("trivia-count-slider");
    this.countValue = document.getElementById("trivia-count-value");
    this.startBtn = document.getElementById("trivia-start-btn");
    this.progressFill = document.getElementById("trivia-progress-fill");
    this.qCounter = document.getElementById("trivia-q-counter");
    this.scoreLive = document.getElementById("trivia-score-live");
    this.questionText = document.getElementById("trivia-question-text");
    this.optionsEl = document.getElementById("trivia-options");
    this.feedbackEl = document.getElementById("trivia-feedback");
    this.feedbackText = document.getElementById("trivia-feedback-text");
    this.nextBtn = document.getElementById("trivia-next-btn");
    this.resultsIcon = document.getElementById("trivia-results-icon");
    this.resultsTitle = document.getElementById("trivia-results-title");
    this.resultsScore = document.getElementById("trivia-results-score");
    this.resultsPct = document.getElementById("trivia-results-pct");
    this.resultsMsg = document.getElementById("trivia-results-msg");
    this.retryBtn = document.getElementById("trivia-retry-btn");
    this.homeBtn = document.getElementById("trivia-home-btn");
    this.pastWrap = document.getElementById("trivia-past-wrap");
    this.pastList = document.getElementById("trivia-past-list");
    this.pastOpenBtn = document.getElementById("trivia-past-open-btn");
    this.popup = document.getElementById("trivia-scores-popup");
    this.popupBody = document.getElementById("trivia-scores-popup-body");
    this.popupClose = document.getElementById("trivia-scores-popup-close");
  }

  renderTopics() {
    if (!this.topicRow) return;
    this.topicRow.innerHTML = "";
    Object.values(TRIVIA_TOPICS).forEach(t => {
      const btn = document.createElement("button");
      btn.className = "trivia-topic-btn" + (t.id === this.topic ? " active" : "");
      btn.dataset.topic = t.id;
      btn.title = t.desc;
      btn.innerHTML = `
        <i class="${t.icon}"></i>
        <span class="topic-name">${t.label}</span>
      `;
      btn.addEventListener("click", () => {
        this.topicRow.querySelectorAll(".trivia-topic-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.topic = t.id;
      });
      this.topicRow.appendChild(btn);
    });
  }

  bindEvents() {
    if (this.levelRow) {
      this.levelRow.querySelectorAll(".trivia-level-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          this.levelRow.querySelectorAll(".trivia-level-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.level = btn.dataset.level;
        });
      });
    }

    if (this.slider) {
      this.slider.addEventListener("input", () => {
        this.count = parseInt(this.slider.value, 10);
        if (this.countValue) this.countValue.textContent = this.count;
      });
    }

    if (this.startBtn) this.startBtn.addEventListener("click", () => this.startQuiz());
    if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.nextQuestion());
    if (this.retryBtn) this.retryBtn.addEventListener("click", () => this.startQuiz());
    if (this.homeBtn) this.homeBtn.addEventListener("click", () => this.showSetup());

    if (this.pastOpenBtn) {
      this.pastOpenBtn.addEventListener("click", () => this.openScoresPopup(false));
    }
    if (this.popupClose) {
      this.popupClose.addEventListener("click", () => this.closeScoresPopup());
    }
    if (this.popup) {
      this.popup.addEventListener("click", (e) => {
        if (e.target === this.popup) this.closeScoresPopup();
      });
    }
  }

  showScreen(name) {
    if (this.setupEl) this.setupEl.classList.toggle("hidden", name !== "setup");
    if (this.quizEl) this.quizEl.classList.toggle("hidden", name !== "quiz");
    if (this.resultsEl) this.resultsEl.classList.toggle("hidden", name !== "results");
  }

  showSetup() {
    this.queue = [];
    this.index = 0;
    this.score = 0;
    this.answered = false;
    if (this.feedbackEl) this.feedbackEl.classList.add("hidden");
    if (this.progressFill) this.progressFill.style.width = "0%";
    this.showScreen("setup");
    this.renderPastPreview();
  }

  getHistory() {
    try {
      const raw = localStorage.getItem(this.historyKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveHistory(entry) {
    const list = this.getHistory();
    list.unshift(entry);
    const trimmed = list.slice(0, 50);
    try {
      localStorage.setItem(this.historyKey, JSON.stringify(trimmed));
    } catch (e) {
      console.warn("could not save trivia score", e);
    }
  }

  formatWhen(iso) {
    try {
      const d = new Date(iso);
      const date = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      return { date, time };
    } catch {
      return { date: "—", time: "" };
    }
  }

  renderPastPreview() {
    const history = this.getHistory();
    if (!this.pastWrap || !this.pastList) return;

    if (!history.length) {
      this.pastWrap.style.display = "none";
      this.pastList.innerHTML = "";
      return;
    }

    this.pastWrap.style.display = "";
    const preview = history.slice(0, 3);
    this.pastList.innerHTML = preview.map(h => {
      const { date, time } = this.formatWhen(h.at);
      const topicLabel = (TRIVIA_TOPICS[h.topic] && TRIVIA_TOPICS[h.topic].label) || h.topic || "all";
      return `
        <div class="trivia-past-row">
          <div class="trivia-past-main">
            <span class="trivia-past-score">${h.score} / ${h.total} · ${h.pct}%</span>
            <span class="trivia-past-meta">${topicLabel} · ${h.level} · ${date} ${time}</span>
          </div>
        </div>`;
    }).join("");
  }

  openScoresPopup(showAll) {
    this.popupShowAll = !!showAll;
    if (!this.popup || !this.popupBody) return;
    const history = this.getHistory();

    if (!history.length) {
      this.popupBody.innerHTML = `<div class="trivia-scores-popup-empty">no quizzes taken yet</div>`;
    } else {
      const limit = this.popupShowAll ? history.length : Math.min(4, history.length);
      const slice = history.slice(0, limit);
      let html = slice.map(h => {
        const { date, time } = this.formatWhen(h.at);
        const topicLabel = (TRIVIA_TOPICS[h.topic] && TRIVIA_TOPICS[h.topic].label) || h.topic || "all";
        return `
          <div class="trivia-score-entry">
            <div class="trivia-score-entry-top">
              <span class="trivia-score-entry-score">${h.score} / ${h.total}</span>
              <span class="trivia-score-entry-pct">${h.pct}%</span>
            </div>
            <div class="trivia-score-entry-meta">${topicLabel} · ${h.level} · ${h.count} questions<br>${date} · ${time}</div>
          </div>`;
      }).join("");

      if (!this.popupShowAll && history.length > 4) {
        html += `<button type="button" class="trivia-scores-view-all" id="trivia-scores-view-all">view all (${history.length})</button>`;
      }
      this.popupBody.innerHTML = html;

      const viewAll = document.getElementById("trivia-scores-view-all");
      if (viewAll) {
        viewAll.addEventListener("click", () => this.openScoresPopup(true));
      }
    }

    this.popup.classList.add("open");
  }

  closeScoresPopup() {
    if (this.popup) this.popup.classList.remove("open");
    this.popupShowAll = false;
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  buildPool() {
    const level = this.level || "foundational";
    if (this.topic === "all") {
      let pool = [];
      Object.keys(TRIVIA_QUESTIONS).forEach(tid => {
        const levelPool = (TRIVIA_QUESTIONS[tid] && TRIVIA_QUESTIONS[tid][level]) || [];
        pool = pool.concat(levelPool);
      });
      // dedupe by question text
      const seen = new Set();
      pool = pool.filter(q => {
        if (seen.has(q.q)) return false;
        seen.add(q.q);
        return true;
      });
      return pool;
    }
    const topicData = TRIVIA_QUESTIONS[this.topic];
    if (!topicData) return TRIVIA_QUESTIONS.fea.foundational || [];
    return (topicData[level] || topicData.foundational || []).slice();
  }

  startQuiz() {
    const pool = this.buildPool();
    const n = Math.min(this.count, pool.length);
    if (n === 0) {
      alert("no questions available for this topic + difficulty combination yet.");
      return;
    }
    this.queue = this.shuffle(pool).slice(0, n);
    this.index = 0;
    this.score = 0;
    this.answered = false;
    this.closeScoresPopup();
    this.showScreen("quiz");
    this.renderQuestion();
  }

  renderQuestion() {
    const item = this.queue[this.index];
    if (!item) return this.finishQuiz();

    this.answered = false;
    if (this.feedbackEl) this.feedbackEl.classList.add("hidden");
    if (this.questionText) this.questionText.textContent = item.q;
    if (this.qCounter) this.qCounter.textContent = `question ${this.index + 1} / ${this.queue.length}`;
    if (this.scoreLive) this.scoreLive.textContent = `score: ${this.score}`;
    if (this.progressFill) {
      this.progressFill.style.width = `${(this.index / this.queue.length) * 100}%`;
    }

    if (this.optionsEl) {
      this.optionsEl.innerHTML = "";
      item.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "trivia-option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => this.selectAnswer(i));
        this.optionsEl.appendChild(btn);
      });
    }
  }

  selectAnswer(choice) {
    if (this.answered) return;
    this.answered = true;
    const item = this.queue[this.index];
    const correct = choice === item.answer;

    const buttons = this.optionsEl.querySelectorAll(".trivia-option-btn");
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === item.answer) b.classList.add("correct");
      else if (i === choice && !correct) b.classList.add("wrong");
    });

    if (correct) this.score += 1;

    if (this.feedbackText) {
      this.feedbackText.textContent = correct
        ? "correct — nice."
        : `not quite. the answer is “${item.options[item.answer]}”.`;
      this.feedbackText.className = correct ? "feedback-correct" : "feedback-wrong";
    }
    if (this.scoreLive) this.scoreLive.textContent = `score: ${this.score}`;
    if (this.feedbackEl) this.feedbackEl.classList.remove("hidden");

    if (this.nextBtn) {
      this.nextBtn.innerHTML = this.index + 1 >= this.queue.length
        ? `see results <i class="fa-solid fa-flag-checkered"></i>`
        : `next <i class="fa-solid fa-arrow-right"></i>`;
    }
  }

  nextQuestion() {
    this.index += 1;
    if (this.index >= this.queue.length) this.finishQuiz();
    else this.renderQuestion();
  }

  finishQuiz() {
    const total = this.queue.length || 1;
    const pct = Math.round((this.score / total) * 100);

    this.saveHistory({
      at: new Date().toISOString(),
      topic: this.topic,
      level: this.level,
      count: total,
      score: this.score,
      total,
      pct
    });

    this.showResults(pct, total);
  }

  showResults(pct, total) {
    this.showScreen("results");
    if (this.progressFill) this.progressFill.style.width = "100%";
    if (this.resultsScore) this.resultsScore.textContent = `${this.score} / ${total}`;
    if (this.resultsPct) this.resultsPct.textContent = `${pct}%`;

    let msg = "";
    let icon = "✓";
    if (pct >= 90) { msg = "excellent — you really know this material."; icon = "◈"; }
    else if (pct >= 70) { msg = "solid work. a few edges still to sharpen."; icon = "◆"; }
    else if (pct >= 50) { msg = "decent foundation. review the misses and try again."; icon = "◇"; }
    else { msg = "rough pass. dig into the glossary and come back."; icon = "○"; }

    if (this.resultsIcon) this.resultsIcon.textContent = icon;
    if (this.resultsMsg) this.resultsMsg.textContent = msg;
    if (this.resultsTitle) this.resultsTitle.textContent = "quiz complete";
  }
}

window.initTrivia = function () {
  if (!window._triviaController) {
    window._triviaController = new TriviaController();
  } else {
    // always reset to setup when the page is opened again
    window._triviaController.showSetup();
  }
};
