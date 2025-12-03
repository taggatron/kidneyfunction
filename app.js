// Simple interactive behaviour for the kidney app
const info = document.getElementById('info');
const buttons = document.querySelectorAll('.buttons button');

const fnContent = {
  filtration: {
    title: 'Filtration',
    body: 'Blood enters the kidney and tiny filters remove waste and extra water. This happens in many tiny parts called nephrons. Filtration helps remove urea and other waste from the blood.'
  },
  reabsorption: {
    title: 'Reabsorption',
    body: 'After filtration, useful things the body needs (like water, glucose and salts) are reabsorbed back into the blood so you don\'t lose them.'
  },
  excretion: {
    title: 'Excretion (Urine)',
    body: 'Waste and extra water become urine. Urine flows through the ureter to the bladder and is stored until you pee.'
  },
  hormones: {
    title: 'Hormone Production',
    body: 'Kidneys make hormones such as erythropoietin which tells your body to make red blood cells, and help activate vitamin D for strong bones.'
  },
  bp: {
    title: 'Blood Pressure Regulation',
    body: 'Kidneys help control blood pressure by balancing salt and water, and by releasing hormones that change how blood vessels and the heart behave.'
  },
  ph: {
    title: 'pH Balance',
    body: 'Kidneys keep the acid/base balance steady by removing acid or base in urine so cells can work properly.'
  }
}

function showFunction(key){
  const data = fnContent[key];
  info.innerHTML = `\n+    <h2>${data.title}</h2>\n+    <p class=\"fn-title\">What it does</p>\n+    <p class=\"fn-body\">${data.body}</p>\n+  `;

  // animate svg elements if available
  const kidneyObj = document.getElementById('kidneySVG');
  if(kidneyObj && kidneyObj.contentDocument){
    const svgDoc = kidneyObj.contentDocument;
    // clear previous highlights
    ['cortex','medulla','ureter','blood','urine','kidneyWhole'].forEach(id=>{
      const el = svgDoc.getElementById(id);
      if(el) el.classList.remove('pulse','flowing');
    });

    if(key === 'filtration'){
      const k = svgDoc.getElementById('kidneyWhole'); if(k) k.classList.add('pulse');
      const blood = svgDoc.getElementById('blood'); if(blood) blood.classList.add('flowing');
    }
    if(key === 'reabsorption'){
      const c = svgDoc.getElementById('cortex'); if(c) c.classList.add('pulse');
      // trigger reabsorption animation: blue/white dots move onto vein line
      try{
        const rw1 = svgDoc.getElementById('reAnimWhite1');
        const rw2 = svgDoc.getElementById('reAnimWhite2');
        const rb1 = svgDoc.getElementById('reAnimBlue1');
        const rb2 = svgDoc.getElementById('reAnimBlue2');
        // artery-direction animations (down into medulla)
        const rAw1 = svgDoc.getElementById('reAnimWhiteA1');
        const rAw2 = svgDoc.getElementById('reAnimWhiteA2');
        const rAb1 = svgDoc.getElementById('reAnimBlueA1');
        const rAb2 = svgDoc.getElementById('reAnimBlueA2');
        if(rw1 && rw1.beginElement) rw1.beginElement();
        if(rb1 && rb1.beginElement) setTimeout(()=>rb1.beginElement(),120);
        if(rw2 && rw2.beginElement) setTimeout(()=>rw2.beginElement(),240);
        if(rb2 && rb2.beginElement) setTimeout(()=>rb2.beginElement(),360);
        // start artery set at same time (mirrored timing)
        if(rAw1 && rAw1.beginElement) rAw1.beginElement();
        if(rAb1 && rAb1.beginElement) setTimeout(()=>rAb1.beginElement(),120);
        if(rAw2 && rAw2.beginElement) setTimeout(()=>rAw2.beginElement(),240);
        if(rAb2 && rAb2.beginElement) setTimeout(()=>rAb2.beginElement(),360);
      }catch(e){/* ignore if not supported */}
    }
    if(key === 'excretion'){
      const u = svgDoc.getElementById('ureter'); if(u) u.classList.add('pulse');
      const urine = svgDoc.getElementById('urine'); if(urine) urine.classList.add('flowing');
      // trigger SMIL urine animations inside kidney svg (if present)
      try{
        const a1 = svgDoc.getElementById('kUrineAnim1'); if(a1 && a1.beginElement) a1.beginElement();
        const a2 = svgDoc.getElementById('kUrineAnim2'); if(a2 && a2.beginElement) setTimeout(()=>a2.beginElement(),120);
        const a3 = svgDoc.getElementById('kUrineAnim3'); if(a3 && a3.beginElement) setTimeout(()=>a3.beginElement(),260);
      }catch(e){/* ignore if not supported */}
    }

    // also try to trigger body SVG urine animations (if the outer object exposed them)
    try{
      const bodyObj = document.getElementById('bodySVG');
      if(bodyObj){
        const b1 = bodyObj._bUrineAnim1;
        const b2 = bodyObj._bUrineAnim2;
        const bUL = bodyObj._bUreterAnimL;
        const bUR = bodyObj._bUreterAnimR;
        // trigger ureter flows first (staggered), then bladder flow
        if(bUL && bUL.beginElement) bUL.beginElement();
        if(bUR && bUR.beginElement) setTimeout(()=>bUR.beginElement(),100);
        if(b1 && b1.beginElement) setTimeout(()=>b1.beginElement(),320);
        if(b2 && b2.beginElement) setTimeout(()=>b2.beginElement(),420);
      }
    }catch(e){/* ignore */}
    if(key === 'hormones'){
      const k = svgDoc.getElementById('kidneyWhole'); if(k) k.classList.add('pulse');
    }
    if(key === 'bp'){
      const v = svgDoc.getElementById('vein'); if(v) v.classList.add('flowing');
      const a = svgDoc.getElementById('artery'); if(a) a.classList.add('flowing');
    }
    if(key === 'ph'){
      const m = svgDoc.getElementById('medulla'); if(m) m.classList.add('pulse');
    }
  }
}

buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const fn = btn.dataset.fn;
    showFunction(fn);
  })
});

// Add hover highlighting for the detailed kidney svg
document.getElementById('kidneySVG').addEventListener('load', ()=>{
  const svgDoc = document.getElementById('kidneySVG').contentDocument;
  if(!svgDoc) return;
  ['cortex','medulla','ureter'].forEach(id=>{
    const el = svgDoc.getElementById(id);
    if(!el) return;
    el.style.cursor = 'pointer';
    el.addEventListener('mouseenter', ()=> el.classList.add('pulse'));
    el.addEventListener('mouseleave', ()=> el.classList.remove('pulse'));
    el.addEventListener('click', ()=>{
      // map click to a function
      if(id === 'cortex') showFunction('filtration');
      if(id === 'medulla') showFunction('reabsorption');
      if(id === 'ureter') showFunction('excretion');
    });
  });
});

// Friendly small animation on body SVG markers
document.getElementById('bodySVG').addEventListener('load', ()=>{
  const b = document.getElementById('bodySVG').contentDocument;
  if(!b) return;
  ['leftMarker','rightMarker'].forEach(id =>{
    const el = b.getElementById(id);
    if(!el) return;
    el.style.transition = 'transform 0.35s ease';
    el.addEventListener('mouseenter', ()=> el.setAttribute('transform','scale(1.08)'));
    el.addEventListener('mouseleave', ()=> el.setAttribute('transform','scale(1)'));
    el.addEventListener('click', ()=>{
      // trigger filtration by default
      showFunction('filtration');
    });
  });
  // make sure body-level urine animations can be started from JS when needed
  try{
    const b1 = b.getElementById('bUrineAnim1');
    const b2 = b.getElementById('bUrineAnim2');
    // expose them by attaching to the outer object so showFunction can trigger
    // store references on the DOM node for quick access
    const obj = document.getElementById('bodySVG');
    obj._bUrineAnim1 = b1;
    obj._bUrineAnim2 = b2;
    // also expose the ureter animations (left and right)
    const bUL = b.getElementById('bUreterAnimL');
    const bUR = b.getElementById('bUreterAnimR');
    obj._bUreterAnimL = bUL;
    obj._bUreterAnimR = bUR;
  }catch(e){/* ignore */}
});

// Hook to trigger body svg urine animations from showFunction when excretion is chosen
// (we do this after bodySVG load above; showFunction will attempt to call beginElement)
