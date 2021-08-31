import { debounceTime, filter, fromEvent, map, retry, switchMap } from 'rxjs';

//需求：會有一個搜尋框(input#search)，當我們在上面打字並停頓超過 100 毫秒就發送 HTTP Request 來取得建議選項並顯示在收尋框下方(ul#suggest-list)，如果使用者在前一次發送的請求還沒有回來就打了下一個字，此時前一個發送的請求就要捨棄掉，當建議選項顯示之後可以用鼠标點擊取建議選項代搜尋框的文字

const url =
  'https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&origin=*';

const getSuggestList = keyword =>
  fetch(url + '&search=' + keyword, { method: 'GET', mode: 'cors' }).then(res =>
    res.json()
  );

const searchInput = document.getElementById('search');
const suggestList = document.getElementById('suggest-list');

const keyword = fromEvent(searchInput, 'input');
const selectItem = fromEvent(suggestList, 'click');

const render = (suggestArr = []) =>
  (suggestList.innerHTML = suggestArr
    .map(item => '<li>' + item + '</li>')
    .join(''));

keyword
  .pipe(
    // filter(e => e.target.value.length > 2),
    debounceTime(100),
    switchMap(e => getSuggestList(e.target.value)),
    retry(3)
  )
  .subscribe(res => render(res[1]));

selectItem
  .pipe(
    filter(e => e.target.matches('li')),
    map(e => e.target.innerText)
  )
  .subscribe(text => {
    searchInput.value = text;
    render();
  });
