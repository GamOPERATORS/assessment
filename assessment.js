'use strict'; // 厳格モードを有効化 [2]

// 1. 各種UI部品をHTMLから取得して変数に定義する
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

// 2. 【抜けていた部分①】16パターンの診断結果配列
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、自然と緊張がほぐれます。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも正しく導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が信頼しています。',
  '###userName###のいいところはユニークさです。###userName###だけのその個性的な考えが世界を明るくします。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内面から溢れ出る###userName###の美しさに皆が惹かれます。',
  '###userName###のいいところは決断力です。###userName###が下す決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に優しくされた多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことを表現することで周りが豊かになります。',
  '###userName###のいいところは節度です。周りとの関係を大切にできる###userName###が信頼されています。',
  '###userName###のいいところは好奇心です。新しいことに挑戦し続ける###userName###が皆をワクワクさせます。',
  '###userName###のいいところは気配りです。###userName###の細かい配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###が皆に愛されています。',
  '###userName###のいいところは自制心です。問題に直面した時も冷静に立ち向かえる###userName###が皆の規範です。'
];

/**
 * 【抜けていた部分②】名前の文字列を渡すと、文字コードを計算して診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字の文字コードの番号を合計する
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字コードの合計値を配列の長さで割った余りを添字にする
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // 名前の置き換え
  result = result.replaceAll('###userName###', userName);
  return result;
}

// 3. 診断ボタンクリック時の処理（※提示していただいたコード）
assessmentButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return; // ガード句
  }

  // 1. 診断結果表示エリアの初期化
  resultDivision.innerText = '';

  // 2. Bootstrapの「Card」スタイルを適用して要素を動的に生成
  resultDivision.className = 'card';

  // ヘッダ部分を作成
  const headerDivision = document.createElement('div');
  headerDivision.className = 'card-header text-bg-primary';
  headerDivision.innerText = '診断結果';

  // 本文エリアを作成
  const bodyDivision = document.createElement('div');
  bodyDivision.className = 'card-body';

  // 結果テキストを作成
  const paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  const result = assessment(userName); // これで上記で定義した関数が正しく動きます！
  paragraph.innerText = result;

  // 各要素を組み立てて結果表示エリアに差し込む
  bodyDivision.appendChild(paragraph);
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

  // 3. ツイートエリアのクリア
  tweetDivision.innerText = '';

  // 4. ツイートボタンの動的生成
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

  tweetDivision.appendChild(anchor);
  tweetDivision.appendChild(script);
});
