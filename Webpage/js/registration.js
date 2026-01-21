// Source of truth: Archived/v1/components/registration.js

import { i18n } from './i18n.js';

export class Registration {
  constructor() {
    this.step = 1;
    this.data = {};
  }

  init() {
    this.form = document.getElementById('reg-form');
    if (!this.form) return;
    this.renderStep();
  }

  renderStep() {
    const t = (k) => i18n.t(k);
    let content = '';

    if (this.step === 1) {
      content = `
        <div class="space-y-4">
          <label class="block text-sm font-bold text-brush-gray">${t('label_name')}</label>
          <input type="text" name="name" required class="w-full p-2" value="${this.data.name || ''}">
          <label class="block text-sm font-bold text-brush-gray">${t('label_nat')}</label>
          <input type="text" name="nationality" required class="w-full p-2" value="${this.data.nationality || ''}">
          <button type="button" id="next-step" class="w-full bg-midnight-blue text-white py-3 rounded mt-4">${t('btn_next')}</button>
        </div>
      `;
    } else if (this.step === 2) {
      content = `
        <div class="space-y-4">
          <label class="block text-sm font-bold text-brush-gray">${t('label_uni')}</label>
          <select name="university" class="w-full p-2">
            <option>NTU</option><option>NUS</option><option>SMU</option><option>Other</option>
          </select>
          <label class="block text-sm font-bold text-brush-gray">${t('label_ticket')}</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2"><input type="radio" name="pass" value="70" checked> $70</label>
            <label class="flex items-center gap-2"><input type="radio" name="pass" value="15"> $15</label>
          </div>
          <div class="flex gap-2">
            <button type="button" id="prev-step" class="flex-1 border border-midnight-blue py-3 rounded">${t('btn_prev')}</button>
            <button type="button" id="next-step" class="flex-1 bg-midnight-blue text-white py-3 rounded">${t('btn_next')}</button>
          </div>
        </div>
      `;
    } else {
      content = `
        <div class="space-y-4">
          <label class="block text-sm font-bold text-brush-gray">${t('label_diet')}</label>
          <select name="diet" class="w-full p-2">
            <option>Normal</option><option>Vegetarian</option><option>Halal</option>
          </select>
          <button type="submit" class="w-full bg-gold text-white py-3 rounded font-bold">${t('btn_submit')}</button>
          <button type="button" id="prev-step" class="w-full text-sm opacity-60">${t('btn_prev')}</button>
        </div>
      `;
    }

    this.form.innerHTML = content;
    this.bindEvents();
  }

  bindEvents() {
    const next = this.form.querySelector('#next-step');
    const prev = this.form.querySelector('#prev-step');

    if (next) {
      next.onclick = () => {
        const inputs = this.form.querySelectorAll('input, select');
        let valid = true;
        inputs.forEach((i) => {
          if (i.required && !i.value) valid = false;
          this.data[i.name] = i.value;
        });
        if (valid) {
          this.step++;
          this.renderStep();
        } else {
          alert('Please fill all fields');
        }
      };
    }

    if (prev) {
      prev.onclick = () => {
        this.step--;
        this.renderStep();
      };
    }

    this.form.onsubmit = (e) => {
      e.preventDefault();
      this.form.innerHTML = `
        <div class="text-center py-10">
          <div class="w-20 h-20 bg-sage-green/20 text-sage-green rounded-full flex items-center justify-center mx-auto mb-6">
            <i data-lucide="check-circle" class="w-10 h-10"></i>
          </div>
          <h3 class="text-2xl mb-2">Registration Success!</h3>
          <p class="text-brush-gray">Your journey to the Elemental Genesis begins now.</p>
        </div>
      `;
      if (window.lucide?.createIcons) window.lucide.createIcons();
    };
  }
}
