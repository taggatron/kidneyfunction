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
    }
    if(key === 'excretion'){
      const u = svgDoc.getElementById('ureter'); if(u) u.classList.add('pulse');
      const urine = svgDoc.getElementById('urine'); if(urine) urine.classList.add('flowing');
    }
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
});
