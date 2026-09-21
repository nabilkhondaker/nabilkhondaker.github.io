export function setupSimulations() {
  const simulationsData = [
    {
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

  // Render featured + all simulations grids (exact original behavior)
  const featuredSimsGrid = document.getElementById('featured-sims-grid');
  const allSimsGrid = document.getElementById('all-sims-grid');

  const createSimCard = (sim) => {
    const card = document.createElement('div');
    card.className = 'sim-card';
    card.innerHTML = `
      <div class="sim-video-wrapper">
        <video muted loop playsinline preload="metadata">
          <source src="${sim.videoSrc}" type="video/mp4">
        </video>
      </div>
      <div class="sim-info">
        <h3>${sim.title}</h3>
        <p>${sim.desc}</p>
      </div>
    `;

    card.addEventListener('click', () => openSimModal(sim));
    return card;
  };

  // Populate grids (featured = first few, all = everything)
  simulationsData.forEach((sim, idx) => {
    if (allSimsGrid) allSimsGrid.appendChild(createSimCard(sim));
    if (featuredSimsGrid && idx < 3) {
      featuredSimsGrid.appendChild(createSimCard(sim));
    }
  });

  // Modal logic (exact original)
  const simModal = document.getElementById('sim-modal');
  const simCloseBtn = document.getElementById('sim-close-btn');
  const simVideo = document.getElementById('sim-modal-video');
  const simTitle = document.getElementById('sim-modal-title');
  const simDesc = document.getElementById('sim-modal-desc');

  function openSimModal(sim) {
    if (!simModal || !simVideo) return;
    simTitle.textContent = sim.title;
    simDesc.textContent = sim.desc;
    simVideo.src = sim.videoSrc;
    simVideo.load();
    simVideo.play().catch(() => {});
    simModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSimModal() {
    if (!simModal) return;
    simModal.classList.add('hidden');
    if (simVideo) {
      simVideo.pause();
      simVideo.src = '';
    }
    document.body.style.overflow = 'auto';
  }

  if (simCloseBtn) {
    simCloseBtn.addEventListener('click', closeSimModal);
  }

  if (simModal) {
    simModal.addEventListener('click', (e) => {
      if (e.target === simModal) closeSimModal();
    });
  }
}
