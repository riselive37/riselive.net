(function () {
    'use strict';

    const form = document.getElementById('contactForm');
    if (!form) return;

    const pageLoadedAt = Date.now();
    const minimumInputTimeMs = 3000;
    const submitButton = form.querySelector('button[type="submit"]');
    const honeypot = form.querySelector('input[name="company_url"]');

    const fieldNames = {
        company: 'entry.437180940',
        name: 'entry.1744271345',
        email: 'entry.1222709491',
        tel: 'entry.1490200769',
        subject: 'entry.1459953426',
        budget: 'entry.995478391',
        message: 'entry.219151659'
    };

    const blockedWords = [
        'seo',
        'backlink',
        'guest post',
        'casino',
        'crypto',
        'bitcoin',
        'usdc',
        'forex',
        'loan',
        'viagra',
        'marketing agency',
        'website traffic',
        'graph.org',
        't.me',
        'telegram'
    ];

    function getValue(name) {
        const field = form.elements[name];
        return field ? String(field.value || '').trim() : '';
    }

    function countUrls(text) {
        const matches = String(text || '').match(/https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|info|biz|ru|cn|xyz|top|site|online|shop)\b/gi);
        return matches ? matches.length : 0;
    }

    function hasJapanese(text) {
        return /[\u3040-\u30ff\u3400-\u9fff]/.test(String(text || ''));
    }

    function isLongEnglishOnly(text) {
        const value = String(text || '');
        const normalized = value.replace(/[0-9\s.,!?'"()\-_/@:;]+/g, '');
        if (value.length < 80 || hasJapanese(value)) return false;
        return /^[a-z]+$/i.test(normalized) && normalized.length >= 50;
    }

    function hasRepeatedNoise(text) {
        const value = String(text || '');
        if (/(.)\1{8,}/.test(value)) return true;

        const words = value.toLowerCase().match(/[a-z0-9]{3,}/g);
        if (!words || words.length < 8) return false;

        const uniqueWords = new Set(words);
        return uniqueWords.size <= 3;
    }

    function hasRandomRequiredFields(name, email, message) {
        const localPart = email.split('@')[0] || '';
        const randomish = /^[a-z0-9]{5,}$/i;
        const shortMessage = /^[a-z0-9]{4,16}$/i;
        return randomish.test(name) && randomish.test(localPart) && shortMessage.test(message);
    }

    function includesBlockedWord(text) {
        const lowerText = String(text || '').toLowerCase();
        return blockedWords.some((word) => lowerText.includes(word));
    }

    function shouldBlockSubmit() {
        const elapsedMs = Date.now() - pageLoadedAt;
        if (elapsedMs < minimumInputTimeMs) return true;
        if (honeypot && honeypot.value.trim() !== '') return true;

        const company = getValue(fieldNames.company);
        const name = getValue(fieldNames.name);
        const email = getValue(fieldNames.email);
        const tel = getValue(fieldNames.tel);
        const subject = getValue(fieldNames.subject);
        const budget = getValue(fieldNames.budget);
        const message = getValue(fieldNames.message);
        const combinedText = [company, name, email, tel, subject, budget, message].join('\n');

        if (countUrls(combinedText) > 1) return true;
        if (isLongEnglishOnly(message)) return true;
        if (hasRepeatedNoise(message)) return true;
        if (hasRandomRequiredFields(name, email, message)) return true;
        if (includesBlockedWord(combinedText)) return true;

        return false;
    }

    function restoreSubmitButton() {
        if (!submitButton) return;
        submitButton.textContent = '送信する';
        submitButton.disabled = false;
    }

    form.addEventListener('submit', function (event) {
        if (!shouldBlockSubmit()) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        restoreSubmitButton();
        alert('送信内容を確認できませんでした。お手数ですが、内容を見直してから再度送信してください。');
    });
})();
