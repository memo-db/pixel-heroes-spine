var sort_by = "id";
var key_name = "character";
const button_sort = document.getElementsByClassName("button_sort");
for (var i = 0; i < button_sort.length; i++) {
    button_sort[i].addEventListener('click', function(e) {
        sort_by = e.target.getAttribute("data");
        create_table();
    });
};

function create_table() {
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

        function create_item() {
            let newItem = document.createElement('div');
            newItem.classList.add('item_radio');
            newItem.innerHTML = `
                <div class="item_id">
                    <label>
                        <input id="${item.id}" name="inventoryItems" type="radio" value="${item.id}">
                            <span>${item.id}</span>
                        </input>
                    </label>
                </div><!--
                <div class="item_name">
                    <label for="${item.id}">
                        <span>${item.name}</span>
                    </label>
                </div>-->
                <div class="item_content_rating">
                    <label for="${item.id}">${item.content_rating}</label>
                </div>
                <div class="item_rating">
                    <label for="${item.id}">${item.rating}</label>
                </div>
            `
            form.appendChild(newItem);
        }
        if (key_name == "character") {
            inventoryItems.character.sort(date_sort);
            for (item of inventoryItems.character) {
                create_item();
            }
            form.oninput = e => {
                loading_model(form.inventoryItems.value);
            }
        }

        function loading_model(value) {
            const spine_canvas = document.querySelector('#spine_canvas');
            spine_canvas.innerHTML = '';
            new spine.SpinePlayer("spine_canvas", {
                skelUrl: 'character/' + value + '.skel',
                atlasUrl: 'character/' + value + '.atlas',
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
    });
};
create_table();