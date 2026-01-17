(function(){
  const $ = (sel, root=document)=>root.querySelector(sel);
  const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));

  // Mobile nav
  const navToggle = $('#navToggle');
  const menu = $('#menu');
  if(navToggle && menu){
    navToggle.addEventListener('click', ()=>{
      const isOpen = menu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    $$('.menu a').forEach(a=>a.addEventListener('click', ()=>{
      menu.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));
  }

  // FAQ accordion
  $$('.faq-q').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Year and notice
  const year = $('#year');
  if(year) year.textContent = new Date().getFullYear();

  // Testimonial carousel
  const track = $('#tTrack');
  if(track){
    const cards = $$('.t-card', track);
    let index = 0;
    const show = (i)=>{
      cards.forEach((c,idx)=>c.classList.toggle('active', idx===i));
    };
    show(index);
    $('#tPrev')?.addEventListener('click', ()=>{ index = (index - 1 + cards.length) % cards.length; show(index); });
    $('#tNext')?.addEventListener('click', ()=>{ index = (index + 1) % cards.length; show(index); });
    setInterval(()=>{ index = (index + 1) % cards.length; show(index); }, 6500);
  }

  // Pricing: highlight selected
  $$('.plan').forEach(plan=>{
    plan.addEventListener('click', ()=>{
      $$('.plan').forEach(p=>p.classList.remove('selected'));
      plan.classList.add('selected');
    })
  })

  // Contact form (optional): if deployed with Vercel API route, send there.
  const form = $('#leadForm');
  const status = $('#formStatus');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      status.textContent = 'Sending...';
      try{
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Request failed');
        status.textContent = 'Thanks! We\'ll reach out shortly.';
        form.reset();
      }catch(err){
        // Local preview fallback
        status.textContent = 'Saved locally. Deploy to enable email sending.';
      }
    });
  }
})();
