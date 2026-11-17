/* Web Danışmanı — Kredi Kartı Mockup
   Yalnızca arayüz: hiçbir veri saklanmaz veya gönderilmez. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const card = $('#card');
  const tilt = $('#tilt');
  const scene = $('#scene');
  const focusBox = $('#focusBox');
  const form = $('#form');
  const payBtn = $('#payBtn');
  const demoBtn = $('#demoBtn');
  const flipBtn = $('#flipBtn');

  const ORDER = ['number', 'name', 'exp', 'cvv'];
  const inputs = { number: $('#inNumber'), name: $('#inName'), exp: $('#inExp'), cvv: $('#inCvv') };
  const targets = { number: $('#tNumber'), name: $('#tName'), exp: $('#tExp') };
  const digits = (v) => v.replace(/\D/g, '');

  /* ---------- kart numarası yuvaları ---------- */
  const slots = [];
  for (let g = 0; g < 4; g++) {
    const grp = document.createElement('span');
    grp.className = 'grp';
    for (let i = 0; i < 4; i++) {
      const slot = document.createElement('span');
      slot.className = 'slot empty';
      slot.innerHTML = '<span>•</span>';
      slot.dataset.ch = '';
      grp.append(slot);
      slots.push(slot);
    }
    targets.number.append(grp);
  }

  const replay = (el, cls) => {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  };

  const setText = (el, text) => {
    if (el.textContent === text) return;
    el.textContent = text;
    replay(el, 'bump');
  };

  /* ---------- doğrulama ---------- */
  const valid = {
    number: () => digits(inputs.number.value).length === 16,
    name: () => inputs.name.value.trim().length >= 3,
    exp: () => {
      const d = digits(inputs.exp.value);
      if (d.length !== 4) return false;
      const m = +d.slice(0, 2);
      const y = 2000 + +d.slice(2);
      const now = new Date();
      if (m < 1 || m > 12) return false;
      return y > now.getFullYear() || (y === now.getFullYear() && m >= now.getMonth() + 1);
    },
    cvv: () => digits(inputs.cvv.value).length === 3,
  };

  /* ---------- canlı güncelleme ---------- */
  const render = {
    number() {
      const d = digits(inputs.number.value).slice(0, 16);
      inputs.number.value = d.replace(/(.{4})(?=.)/g, '$1 ');
      slots.forEach((slot, i) => {
        const ch = d[i] || '';
        if (slot.dataset.ch === ch) return;
        slot.dataset.ch = ch;
        slot.firstChild.textContent = ch || '•';
        slot.classList.toggle('empty', !ch);
        replay(slot, 'in');
      });
    },
    name() {
      const v = inputs.name.value.replace(/\s+/g, ' ').trimStart();
      inputs.name.value = v;
      const upper = v.trim().toLocaleUpperCase('tr-TR');
      setText($('#outName'), upper || 'AD SOYAD');
      $('#outSig').textContent = v.trim();
      moveFocus(current);
    },
    exp() {
      let d = digits(inputs.exp.value).slice(0, 4);
      if (d.length === 1 && d > '1') d = '0' + d;
      inputs.exp.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
      const mm = d.slice(0, 2).padEnd(2, 'A');
      const yy = d.slice(2).padEnd(2, 'Y');
      setText($('#outExp'), d ? `${mm}/${yy}` : 'AA/YY');
    },
    cvv() {
      const d = digits(inputs.cvv.value).slice(0, 3);
      inputs.cvv.value = d;
      setText($('#outCvv'), d.padEnd(3, '•'));
    },
  };

  /* ---------- adım göstergesi ---------- */
  let current = null;
  const stepEls = Object.fromEntries($$('#steps button').map((b) => [b.dataset.step, b.parentElement]));

  function updateSteps() {
    let doneCount = 0;
    ORDER.forEach((k) => {
      const ok = valid[k]();
      if (ok) doneCount++;
      stepEls[k].classList.toggle('done', ok);
      stepEls[k].classList.toggle('active', current === k);
      const field = inputs[k].closest('.field');
      field.classList.toggle('valid', ok);
      if (ok) field.classList.remove('invalid');
    });
    // Çubuk: tamamlanan ardışık adımlara göre dolar
    let run = 0;
    while (run < ORDER.length && valid[ORDER[run]]()) run++;
    const pct = Math.min(run, ORDER.length - 1) / (ORDER.length - 1) * 100;
    $('#stepsFill').style.width = pct + '%';
    return doneCount;
  }

  /* ---------- odak çerçevesi + çevirme ---------- */
  function moveFocus(key) {
    const t = targets[key];
    if (!t) { focusBox.classList.remove('on'); return; }
    const padX = scene.clientWidth * 0.022;
    const padY = scene.clientWidth * 0.012;
    focusBox.style.transform = `translate(${t.offsetLeft - padX}px, ${t.offsetTop - padY}px)`;
    focusBox.style.width = t.offsetWidth + padX * 2 + 'px';
    focusBox.style.height = t.offsetHeight + padY * 2 + 'px';
    focusBox.classList.add('on');
  }

  function setFlip(on) {
    card.classList.toggle('flipped', on);
  }

  ORDER.forEach((k) => {
    const el = inputs[k];
    el.addEventListener('input', () => { render[k](); updateSteps(); });
    el.addEventListener('focus', () => {
      current = k;
      setFlip(k === 'cvv');
      card.classList.toggle('cvv-on', k === 'cvv');
      moveFocus(k);
      updateSteps();
    });
    el.addEventListener('blur', (e) => {
      const next = e.relatedTarget;
      if (next && Object.values(inputs).includes(next)) return;
      current = null;
      card.classList.remove('cvv-on');
      focusBox.classList.remove('on');
      if (next !== flipBtn) setFlip(false);
      updateSteps();
    });
  });

  $$('#steps button').forEach((b) => b.addEventListener('click', () => inputs[b.dataset.step].focus()));
  flipBtn.addEventListener('click', () => setFlip(!card.classList.contains('flipped')));
  window.addEventListener('resize', () => moveFocus(current));

  /* ---------- tema ---------- */
  $$('.sw').forEach((sw) => sw.addEventListener('click', () => {
    $$('.sw').forEach((s) => s.setAttribute('aria-pressed', String(s === sw)));
    card.dataset.theme = sw.dataset.theme;
    setText($('#tierName'), sw.dataset.name);
  }));

  /* ---------- 3B eğim ---------- */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fine && !calm) {
    scene.addEventListener('pointermove', (e) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      tilt.classList.add('live');
      tilt.style.setProperty('--ry', (x - 0.5) * 16 + 'deg');
      tilt.style.setProperty('--rx', (0.5 - y) * 12 + 'deg');
      const glare = $('.glare');
      glare.style.setProperty('--mx', x * 100 + '%');
      glare.style.setProperty('--my', y * 100 + '%');
    });
    scene.addEventListener('pointerleave', () => {
      tilt.classList.remove('live');
      tilt.style.setProperty('--ry', '0deg');
      tilt.style.setProperty('--rx', '0deg');
    });
  }

  /* ---------- gönderim (sahte) ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (payBtn.classList.contains('loading')) return;
    const bad = ORDER.filter((k) => !valid[k]());
    if (bad.length) {
      bad.forEach((k) => replay(inputs[k].closest('.field'), 'invalid'));
      inputs[bad[0]].focus();
      return;
    }
    document.activeElement.blur();
    setFlip(false);
    payBtn.classList.add('loading');
    setTimeout(showSuccess, 1700);
  });

  function showSuccess() {
    payBtn.classList.remove('loading');
    const first = inputs.name.value.trim().split(' ')[0];
    $('#sName').textContent = first ? ', ' + first : '';
    $('#sCard').textContent = '•••• ' + digits(inputs.number.value).slice(-4);
    $('#sRef').textContent = 'WD-' + String(Math.floor(Math.random() * 1e6)).padStart(6, '0');
    $('#formView').hidden = true;
    $('#successView').hidden = false;
    $('#resetBtn').focus();
  }

  $('#resetBtn').addEventListener('click', () => {
    form.reset();
    ORDER.forEach((k) => {
      render[k]();
      inputs[k].closest('.field').classList.remove('invalid', 'valid');
    });
    focusBox.classList.remove('on');
    updateSteps();
    $('#successView').hidden = true;
    $('#formView').hidden = false;
    inputs.number.focus();
  });

  /* ---------- demo: alanları yazarak doldur ---------- */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  demoBtn.addEventListener('click', async () => {
    demoBtn.disabled = true;
    const yy = String((new Date().getFullYear() + 3) % 100).padStart(2, '0');
    const demo = { number: '5412750000001234', name: 'Deniz Yılmaz', exp: '08' + yy, cvv: '123' };
    for (const k of ORDER) {
      const el = inputs[k];
      el.value = '';
      el.focus();
      await sleep(k === 'cvv' ? 650 : 250);
      for (const ch of demo[k]) {
        el.value += ch;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(calm ? 0 : 55);
      }
      await sleep(300);
    }
    payBtn.focus();
    demoBtn.disabled = false;
  });

  updateSteps();
})();
