var id;
var category = "character";
var sort_by = "id";
new function addEventListener() {
    const button_sort = document.getElementsByClassName("button_sort");
    for (var i = 0; i < button_sort.length; i++) {
        button_sort[i].addEventListener('click', function(e) {
            sort_by = e.target.getAttribute("data");
            create_table();
        });
    };
}

function getUrlValue(key) {
    var url = new URL(window.location.href);
    return url.searchParams.get(key);
}
new function removeUrlExtension() {
    var url = window.location.href;
    url = url.replace('index.html', '');
    window.history.replaceState(null, null, url);
}
new function createTable() {
    const form = document.querySelector('#input4radio');
    form.innerHTML = '';
    fetch('data/data.json').then((response) => response.json()).then((inventoryItems) => {
        function date_sort(a, b) {
            if (sort_by == "id") {
                return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
            }
            if (sort_by == "name") {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }
            if (sort_by == "content_rating") {
                return a.content_rating > b.content_rating ? -1 : a.content_rating < b.content_rating ? 1 : 0;
            }
            if (sort_by == "rating") {
                return a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0;
            }
        };

        function createItem() {
            let newItem = document.createElement('div');
            newItem.classList.add('item_radio');
            newItem.innerHTML = `
                <div class="item_id">
                    <label>
                        <input id="${item.id}" name="inventoryItems" type="radio" value="${item.id}">
                            <span>
                                ${item.id}
                            </span>
                        </input>
                    </label>
                </div><!--
                <div class="item_name">
                    <label for="${item.id}">
                        <span>
                            ${item.name}
                        </span>
                    </label>
                </div>-->
                <div class="item_content_rating">
                    <label for="${item.id}">
                        <span>
                            ${item.content_rating}
                        <span>
                    </label>
                </div>
                <div class="item_rating">
                    <label for="${item.id}">
                        <span>
                            ${item.rating}
                        <span>
                    </label>
                </div>
            `
            form.appendChild(newItem);
        }
        if (category == "character") {
            inventoryItems.character.sort(date_sort);
            for (item of inventoryItems.character) {
                createItem();
            }
        }
        if (category == "role") {
            inventoryItems.role.sort(date_sort);
            for (item of inventoryItems.role) {
                createItem();
            }
        }
        form.oninput = e => {
            loadingModel(form.inventoryItems.value);
            var url = window.location.href;
            var urlPath = '/?category=' + category + '&id=' + form.inventoryItems.value;
            if (url.match(/\/$/) != null) {
                url = url.replace(/\/$/, urlPath);
                window.history.pushState(null, null, url);
            } else {
                url = url.replace(/\/\?.*/, urlPath);
                window.history.pushState(null, null, url);
            }
        }

        function loadingModel(id) {
            const spine_canvas = document.querySelector('#spine_canvas');
            spine_canvas.innerHTML = '';
            new spine.SpinePlayer('spine_canvas', {
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
        new function loadingUrlValue() {
            var url = window.location.href;
            var origin = window.location.origin + "/";
            if (url != origin) {
                document.getElementById(getUrlValue('id')).checked = true;
                loadingModel(getUrlValue('id'));
            }
        }
    });
};