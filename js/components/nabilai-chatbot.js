export function setupNabilaiChatbot() {
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
        document.getElementById('page-glossary'),
        document.getElementById('page-trivia'),
        document.getElementById('page-accomplishments'),
        document.getElementById('page-future-goals')
    ].filter(Boolean);

    const obs = new MutationObserver(syncOverlayState);
    overlays.forEach(el => obs.observe(el, {
        attributes: true,
        attributeFilter: ['class', 'style']
    }));
    document.addEventListener('click', () => setTimeout(syncOverlayState, 80), {
        passive: true
    });

    // ----- conversation data (all lowercase) -----
    const stages = [{
            label: 'the basics',
            options: [{
                    q: 'why did you choose mechanical engineering?',
                    a: 'i like the mix of real physics and tangible hardware. software is powerful, but i wanted a field where the numbers actually have to survive contact with the physical world — loads, tolerances, heat, friction. mechanical engineering felt like the most direct way to keep one foot in theory and one foot in making things that move.'
                },
                {
                    q: 'what originally got you interested in engineering?',
                    a: 'taking stuff apart as a kid and wanting to know why it worked. later it was watching how software could drive physical systems — robots, simulations, control loops. once i saw that you could close the loop from math → code → hardware, i was hooked.'
                },
                {
                    q: 'why mechanical engineering instead of computer science?',
                    a: 'i still write a lot of code, but pure cs felt a little too detached from the physical side for me. mech e lets me keep the software and the structures in the same problem. i get to build solvers and then also print the part or tune the motor. that combination is what keeps me going.'
                }
            ]
        },
        {
            label: 'how it started',
            options: [{
                    q: 'when did you start programming?',
                    a: 'seriously around early high school. started with simple scripts and web stuff, then moved into python for numerics and c++ when i needed speed for the dynamics and fea tools. the programming side grew naturally out of wanting better tools for the engineering problems i was already interested in.'
                },
                {
                    q: 'when did you start working with cad?',
                    a: 'mid high school, once i needed real geometry for the robot links and fixtures. parametric cad became the bridge between the kinematics numbers and the parts i could actually print or machine. now it is just part of the normal loop — model, analyze, revise.'
                },
                {
                    q: 'when did you start building physical projects?',
                    a: 'the 2r planar robot paddle was the first real mechatronics build that closed the full loop: camera → kinematics → pid → motors. before that it was smaller electronics and prints, but that project is when software and hardware stopped being separate hobbies.'
                }
            ]
        },
        {
            label: 'how you work',
            options: [{
                    q: 'what made you start writing your own engineering software?',
                    a: 'commercial tools are great until you want to change the algorithm or just understand what is happening under the hood. for topology optimization and the browser fea playground i wanted the math to be mine — so i could swap filters, change the objective, or run it in a browser without a license. building the solvers forced me to actually learn the methods instead of treating them as black boxes.'
                },
                {
                    q: 'why are you so interested in computational engineering?',
                    a: 'because most of the interesting problems sit at the intersection of continuum mechanics, numerics, and code. once you can assemble a stiffness matrix, filter a density field, or integrate a multibody system yourself, the commercial packages stop feeling magical and start feeling like tools you can improve. that is the part i enjoy most.'
                },
                {
                    q: 'why do you combine software with mechanical engineering?',
                    a: 'a lot of modern mechanical work is already computational — fea, optimization, controls, digital twins. if you only know the theory or only know the code, you miss half the design loop. writing the tools lets me test ideas faster and understand the assumptions that commercial software quietly makes.'
                }
            ]
        },
        {
            label: 'what you care about',
            options: [{
                    q: 'what area of engineering interests you the most?',
                    a: 'computational mechanics and generative design right now — topology optimization, custom fea pipelines, and the robotics / kinematics side that turns those designs into things that move. i also keep coming back to dynamics simulations because they force you to be honest about energy and contact.'
                },
                {
                    q: 'what area are you currently trying to learn more about?',
                    a: 'deeper numerical methods for large sparse systems, better manufacturing constraints inside topology optimization, and more robust contact / impact formulations for the dynamics work. also starting to look harder at cyber-physical security for industrial control systems — still early, but it sits at a cool intersection.'
                },
                {
                    q: 'do you consider yourself more of a mechanical engineer, software developer, or mechatronics engineer?',
                    a: 'mechatronics is probably the honest label. the projects that feel most like “me” are the ones that need kinematics, controls, and a physical plant at the same time. the pure software and pure structures work are both in service of that middle ground.'
                }
            ]
        },
        {
            label: 'where you are headed',
            options: [{
                    q: 'what engineering field do you want to specialize in?',
                    a: 'computational mechanics and design automation — topology optimization, custom simulation pipelines, and the robotics / control layer that turns optimized structures into working systems. i want the software and the hardware to stay tightly coupled.'
                },
                {
                    q: 'do you want to pursue research or industry?',
                    a: 'both, ideally. research for the deep methods and open questions, industry for the constraint of real hardware, schedules, and manufacturing. the best work i have done so far has always had a foot in each.'
                },
                {
                    q: 'do you want to eventually work on your own projects/company?',
                    a: 'yes. long term i want the freedom to pick the problems and ship tools or products that actually get used. a company is one path; strong independent projects and open tools are another. either way the goal is the same — keep building things that close the loop between simulation and the physical world.'
                }
            ]
        },
        {
            label: 'school & learning',
            options: [{
                    q: 'why did you take such a heavy stem course load?',
                    a: 'because the independent projects were already asking for the math and physics. ap physics, calc, dual enrollment, and the engineering associate work were not just resume padding — they were the language i needed to make the fea, controls, and dynamics code trustworthy.'
                },
                {
                    q: 'which class influenced your engineering interests the most?',
                    a: 'ap physics and the college-level statics / dynamics style courses. once forces, energy, and free-body diagrams stopped being homework and started being the language of the robot arm and the topology runs, everything clicked into place.'
                },
                {
                    q: 'how did ap physics affect the way you approach engineering?',
                    a: 'it trained me to start from conservation laws and free-body diagrams instead of jumping straight to software. even when i am writing a solver, i still ask “where does the energy go?” and “what are the boundary conditions really doing?” that habit came from physics.'
                }
            ]
        },
        {
            label: 'projects & self-teaching',
            options: [{
                    q: 'how do you balance coursework with independent engineering projects?',
                    a: 'the projects usually become the reason the coursework matters. when a class covers something i need for the robot or the optimizer, the homework stops feeling abstract. time management is still real — i protect deep-work blocks for coding and hardware and treat the class deadlines as hard constraints.'
                },
                {
                    q: 'do your independent projects usually go beyond what you are learning in class?',
                    a: 'almost always. class gives the foundations; the projects force the next layer — sparse solvers, contact models, real motor dynamics, manufacturing constraints. that gap is intentional. it is how i figure out what i still need to learn.'
                },
                {
                    q: 'what engineering concepts have you taught yourself outside school?',
                    a: 'simp topology optimization, density filtering and heaviside projection, custom stiffness-matrix assembly, damped least-squares inverse kinematics, basic multibody contact, and a lot of the practical numerical linear algebra that keeps the browser and c++ solvers stable.'
                }
            ]
        },
        {
            label: 'looking ahead',
            options: [{
                    q: 'what kind of engineering research would you want to participate in?',
                    a: 'computational design methods that respect manufacturing and dynamics constraints from the start, or robotics / mechatronics work where the structural design and the control policy are co-optimized. anything that keeps the simulation honest about the physical plant.'
                },
                {
                    q: 'do you want to pursue graduate school?',
                    a: 'likely yes, especially if it lets me go deeper on computational mechanics or design automation while still staying close to hardware validation. the exact timing depends on finding the right group and problem, not just collecting another degree.'
                },
                {
                    q: 'what kind of engineer do you want to be by the end of university?',
                    a: 'someone who can take a structural or dynamic problem, write or adapt the numerical tools, produce a design that respects real constraints, and then stand next to the physical prototype and explain why the numbers matched (or why they did not). fluent in both the continuous math and the discrete code, and still willing to pick up a screwdriver.'
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
