const form = document.querySelector('form');
const queryInput = document.querySelector('#query');
const limitInput = document.querySelector('#limit');
const indentInput = document.querySelector('#indent');
const languageSelect = document.querySelector('#languages');
const resultsDiv = document.querySelector('#results');

let isResultScore = false;

function syntaxHighlight(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }

  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
          if (/^"resultScore"/.test(match)) {
            isResultScore = true;
          } else {
            isResultScore = false;
          }
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      } else if (isResultScore) {
        cls = 'result-score-value';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const query = queryInput.value;
  const limit = limitInput.value;
  const indent = indentInput.checked;
  const language = languageSelect.value;

  const url = `api.php?query=${query}&limit=${limit}&indent=${indent}&languages=${language}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const formattedJson = syntaxHighlight(data);
      resultsDiv.innerHTML = formattedJson;
    })
    .catch((error) => {
      console.error(error);
    });
});
