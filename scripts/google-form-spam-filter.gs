/**
 * Rise Googleフォーム迷惑送信フィルタ
 *
 * 使い方:
 * 1. Googleフォーム回答スプレッドシートで「拡張機能 > Apps Script」を開く。
 * 2. 既存の onFormSubmit(e) の冒頭で isSpamFormResponse_(e) を呼ぶ。
 * 3. true の場合は自動返信・管理者通知メールを送らず終了する。
 *
 * 例:
 * function onFormSubmit(e) {
 *   if (isSpamFormResponse_(e)) return;
 *   // 既存の自動返信・通知処理
 * }
 */

function isSpamFormResponse_(e) {
  var values = getNamedValues_(e);
  var company = getFirstValueByKeys_(values, ['御社名 / 屋号', '御社名/屋号', '会社名']);
  var name = getFirstValueByKeys_(values, ['お名前', '氏名']);
  var email = getFirstValueByKeys_(values, ['メールアドレス', 'メール']);
  var tel = getFirstValueByKeys_(values, ['電話番号', 'TEL']);
  var subject = getFirstValueByKeys_(values, ['ご相談内容', '相談内容']);
  var budget = getFirstValueByKeys_(values, ['ご予算', '予算']);
  var message = getFirstValueByKeys_(values, ['お問い合わせ内容', 'お問合わせ内容', '具体的なご要望']);
  var combinedText = [company, name, email, tel, subject, budget, message].join('\n');

  if (countUrls_(combinedText) > 1) return true;
  if (isLongEnglishOnly_(message)) return true;
  if (hasRepeatedNoise_(message)) return true;
  if (hasRandomRequiredFields_(name, email, message)) return true;
  if (includesBlockedWord_(combinedText)) return true;

  return false;
}

function getNamedValues_(e) {
  if (e && e.namedValues) return e.namedValues;
  return {};
}

function getFirstValue_(namedValues, key) {
  var value = namedValues[key];
  if (Array.isArray(value)) return String(value[0] || '').trim();
  return String(value || '').trim();
}

function getFirstValueByKeys_(namedValues, keys) {
  for (var i = 0; i < keys.length; i++) {
    var directValue = getFirstValue_(namedValues, keys[i]);
    if (directValue) return directValue;
  }

  var allKeys = Object.keys(namedValues);
  for (var j = 0; j < keys.length; j++) {
    for (var k = 0; k < allKeys.length; k++) {
      if (allKeys[k].indexOf(keys[j]) !== -1) {
        var partialValue = getFirstValue_(namedValues, allKeys[k]);
        if (partialValue) return partialValue;
      }
    }
  }

  return '';
}

function countUrls_(text) {
  var matches = String(text || '').match(/https?:\/\/|www\.|[a-z0-9-]+\.(com|net|org|info|biz|ru|cn|xyz|top|site|online|shop)\b/gi);
  return matches ? matches.length : 0;
}

function hasJapanese_(text) {
  return /[\u3040-\u30ff\u3400-\u9fff]/.test(String(text || ''));
}

function isLongEnglishOnly_(text) {
  text = String(text || '');
  var normalized = text.replace(/[0-9\s.,!?'"()\-_/@:;]+/g, '');
  if (text.length < 80 || hasJapanese_(text)) return false;
  return /^[a-z]+$/i.test(normalized) && normalized.length >= 50;
}

function hasRepeatedNoise_(text) {
  text = String(text || '');
  if (/(.)\1{8,}/.test(text)) return true;

  var words = text.toLowerCase().match(/[a-z0-9]{3,}/g);
  if (!words || words.length < 8) return false;

  var unique = {};
  words.forEach(function (word) {
    unique[word] = true;
  });

  return Object.keys(unique).length <= 3;
}

function hasRandomRequiredFields_(name, email, message) {
  var localPart = String(email || '').split('@')[0] || '';
  var randomish = /^[a-z0-9]{5,}$/i;
  var shortMessage = /^[a-z0-9]{4,16}$/i;
  return randomish.test(String(name || '')) && randomish.test(localPart) && shortMessage.test(String(message || ''));
}

function includesBlockedWord_(text) {
  var lowerText = String(text || '').toLowerCase();
  var blockedWords = [
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

  return blockedWords.some(function (word) {
    return lowerText.indexOf(word) !== -1;
  });
}
