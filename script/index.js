var id;
var category = "character";
var sortBy = "id";
var viewMode = "list";
var a = 0;
new function addEventListener() {
    const buttonSort = document.querySelectorAll(".button-sort");
    for (var i = 0; i < buttonSort.length; i++) {
        buttonSort[i].addEventListener('click', function(e) {
            sortBy = e.target.getAttribute("data");
            createTable();
        });
    };
    const categoryItem = document.querySelectorAll("#character, #role");
    for (var i = 0; i < categoryItem.length; i++) {
        categoryItem[i].addEventListener('click', function(e) {
            category = e.target.getAttribute("value");
            createTable();
        });
    };
    const viewModeItem = document.querySelectorAll("#grid-view, #list-view");
    for (var i = 0; i < viewModeItem.length; i++) {
        viewModeItem[i].addEventListener('click', function(e) {
            viewMode = e.target.getAttribute("value");
            createTable();
        });
    };
}
new function removeUrlExtension() {
    var url = window.location.href;
    url = url.replace('index.html', '');
    window.history.replaceState(null, null, url);
}
new function setUrlValue() {
    var url = window.location.href;
    id = getUrlValue('id');
    if (url.match(/\/$/) != null) {
        document.getElementById("character").click();
        a++;
    } else {
        category = getUrlValue('category');
        loadingModel();
    }
    if (url.match(/\/\?category=character/) != null) {
        document.getElementById(category).click();
    }
    if (url.match(/\/\?category=role/) != null) {
        document.getElementById(category).click();
    }
}

function getUrlValue(key) {
    var url = new URL(window.location.href);
    return url.searchParams.get(key);
}

function loadingModel() {
    const container = document.querySelector('#container');
    container.innerHTML = '';
    new spine.SpinePlayer('container', {
        skelUrl: 'animation/' + category + '/' + id + '.skel',
        atlasUrl: 'animation/' + category + '/' + id + '.atlas',
        premultipliedAlpha: false,
        showControls: false,
        backgroundColor: "#00000000",
        alpha: true,
        viewport: {
            padLeft: 0,
            padRight: 0,
            padTop: 0,
            padBottom: 0,
        }
    });
}

function createTable() {
    const form = document.querySelector('#container-data');
    form.innerHTML = '';
    fetch('data/' + category + '.json').then((res) => res.json()).then((data) => {
        function date_sort(a, b) {
            switch (sortBy) {
                case "id":
                    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
                    break;
                case "name":
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                    break;
                case "content_rating":
                    return a.content_rating > b.content_rating ? -1 : a.content_rating < b.content_rating ? 1 : 0;
                    break;
                case "rating":
                    return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
                    break;
            }
        };
        switch (viewMode) {
            case "list":
                document.getElementById('list-view').checked = true;
                for (item of data[category]) {
                    let listData = document.createElement('div');
                    listData.classList.add('row-item');
                    listData.innerHTML = `
                    <div class="list-item">
                        <label>
                            <input id="${item.id}" name="inventoryItems" type="radio" value="${item.id}">
                                <span>${item.id}</span>
                            </input>
                        </label>
                    </div><!--
                    <div class="list-item">
                        <label for="${item.id}">
                            <span>${item.name}</span>
                        </label>
                    </div>-->
                    <div class="list-item">
                        <label for="${item.id}">
                            <span>${item.content_rating}<span>
                        </label>
                    </div>
                    <div class="list-item">
                        <label for="${item.id}">
                            <span>${item.rating}<span>
                        </label>
                    </div>`
                    data[category].sort(date_sort);
                    form.appendChild(listData);
                }
                break;
            case "grid":
                document.getElementById('grid-view').checked = true;
                let listData = document.createElement('div');
                listData.classList.add('grid-container');
                for (item of data[category]) {
                    listData.innerHTML += `
                    <div class="grid-item">
                        <input id="${item.id}" name="inventoryItems" type="radio" value="${item.id}">
                        <label for="${item.id}">
                            <img class="cover" src="images/icon/card/${item.id}.png" alt="${item.id}">
                        </label>
                    </div>`
                    data[category].sort(date_sort);
                    form.appendChild(listData);
                }
                break;
        }
        form.oninput = e => {
            id = form.inventoryItems.value;
            loadingModel();
            var url = window.location.href;
            var urlPath = '/?category=' + category + '&id=' + id;
            if (url.match(/\/$/) != null) {
                url = url.replace(/\/$/, urlPath);
                window.history.pushState(null, null, url);
            } else {
                url = url.replace(/\/\?.*/, urlPath);
                window.history.pushState(null, null, url);
            }
        }
        if (a == 0) {
            document.getElementById(id).checked = true;
            a++;
        }
    });
};