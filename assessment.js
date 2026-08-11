'use strict'; // 厳格モードを有効化 [3]

// 1. 【抜けていた部分】HTMLからUI部品を取得して変数に定義する [1]
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

// 2. 診断ボタンクリック時の処理（不要なカッコ { } を取り除いた正しい形） [4]
assessmentButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return; // ガード句 [5]
  }

  // 1. 診断結果表示エリアの初期化 [6]
  resultDivision.innerText = '';

  // 2. Bootstrapの「Card」スタイルを適用して要素を動的に生成 [4]
  resultDivision.className = 'card';

  // ヘッダ部分を作成 [4]
  const headerDivision = document.createElement('div');
  headerDivision.className = 'card-header text-bg-primary';
  headerDivision.innerText = '診断結果';

  // 本文エリアを作成 [4]
  const bodyDivision = document.createElement('div');
  bodyDivision.className = 'card-body';

  // 結果テキストを作成 [4]
  const paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  const result = assessment(userName); // ※関数の呼び出し [4]
  paragraph.innerText = result;

  // 各要素を組み立てて結果表示エリアに差し込む [4]
  bodyDivision.appendChild(paragraph);
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

  // 3. ツイートエリアのクリア [7]
  tweetDivision.innerText = '';

  // 4. ツイートボタンの動的生成 [8]
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
