fetch("works.csv")
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {

        // CSVを行ごとに分割
        var rows = data.trim().split("\r\n");
        
        //一行目は見出し
        var headers = rows[0].split(",");

        //二行目以降を作品データにする
        var works = rows.slice(1).map(function(row) {
            var values = row.split(",");
            var work = {};
            headers.forEach(function(header, index) {
                work[header] = values[index];
            });
            return work;
        });

        //Worksを表示する場所
        var grid = document.getElementById("works-grid");
        var categorySelect = document.getElementById("category");
        var sortSelect = document.getElementById("sort");

        // カテゴリー一覧を作る
        var categories = [];

        works.forEach(function(work) {
            // カテゴリーがまだリストにない場合は追加
            if (!categories.includes(work.category)) {
                categories.push(work.category);
            }
        });

        // selectにカテゴリーを追加しWebページに表示させる
        categories.forEach(function(category) {
            var option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        displayWorks();

        //カテゴリ変更時
        categorySelect.addEventListener("change", function() {
            displayWorks();
        });

        //ソート変更時
        sortSelect.addEventListener("change", function() {
            displayWorks();
        });

        // 作品を表示する関数
        function displayWorks() {
            
            //選択されたカテゴリーを取得
            var selectedCategory = categorySelect.value;

            //選択されたソート方法を取得
            var sortType = sortSelect.value;
            
            //元のworksをコピー
            var filteredWorks = works.slice();

            //カテゴリ絞り込み
            if (selectedCategory !== "all") {
                filteredWorks = filteredWorks.filter(function(work) {
                    return work.category === selectedCategory;
                });
            }
            //ソート
            if (sortType === "new") {
                filteredWorks.sort(function(a, b) {
                    return Number(b.year) - Number(a.year);
                });
            }
            else if (sortType === "old") {
                filteredWorks.sort(function(a, b) {
                    return Number(a.year) - Number(b.year);
                });
            }
            else if (sortType == "title") {
                filteredWorks.sort(function(a, b) {
                    return a.title.localeCompare(b.title, "ja");
                });
            }

            //画面を一度空にする
            grid.innerHTML = "";

            //作品を一つずつ表示
            filteredWorks.forEach(function(work) {
                var card = document.createElement("article");
                card.className = "work-card";
                card.innerHTML =
                    '<a href="' + work.link + '">' +
                        '<img src="' + work.image + '" alt="' + work.title + '">' +
                        '<div class= "work-info">' +
                            '<p class="work-category">' + work.category + '</p>' +
                            '<h4>' + work.title + '</h4>' +
                            '<p>' + work.description + '</p>' +
                        '</div>' +
                    '</a>';
                grid.appendChild(card);
            });

        }

    })


                var latitude = 35.6895; // 東京の緯度
                var longitude = 139.6917; // 東京の経度
                var weatherUrl = 
                    "https://api.open-meteo.com/v1/forecast" +
                    "?latitude=" + latitude +
                    "&longitude=" + longitude +
                    "&current=temperature_2m,weather_code";
                    "&timezone=Asia%2FTokyo";


    




/* =========================
   CAMPING MAP
========================= */

                var campingSpots = [
                    {
                        name: "本栖湖",
                        location: "山梨県",
                        x: 244,
                        y: 326,
                        description: "富士山を眺めながら、湖畔の自然を満喫できるキャンプスポット。"
                    },
                    {
                        name: "ふもとっぱら",
                        location: "静岡県",
                        x: 251,
                        y: 337,
                        description: "広い草原と富士山の眺望が魅力のキャンプ場。"
                    },
                    {
                        name: "大洗サンビーチ",
                        location: "茨城県",
                        x: 277,
                        y: 286,
                        description: "海の近くで開放的なアウトドアを楽しめるエリア。"
                    }
                ];


    /* =========================
    HIKING MAP
    ========================= */

                var hikingSpots = [
                    {
                        name: "大雪山",
                        location: "北海道",
                        x: 291,
                        y: 88,
                        description: "雄大な山岳風景と高山植物が魅力の登山エリア。"
                    },
                    {
                        name: "上高地",
                        location: "長野県",
                        x: 239,
                        y: 267,
                        description: "梓川と北アルプスの景色を楽しめる自然豊かな場所。"
                    },
                    {
                        name: "高尾山",
                        location: "東京都",
                        x: 254,
                        y: 316,
                        description: "都心からアクセスしやすく、自然を楽しめる山。"
                    }
                ];


    /* =========================
    MAP COMMON FUNCTIONS
    ========================= */

        function setupOutdoorMap(config) {

                var markerGroup = document.getElementById(config.markerId);
                var popup = document.getElementById(config.popupId);

                if (!markerGroup || !popup) {
                    return;
                }

                var nameText = document.getElementById(config.nameId);
                var categoryText = document.getElementById(config.categoryId);
                var locationText = document.getElementById(config.locationId);
                var descriptionText = document.getElementById(config.descriptionId);

        function showSpot(spot) {
            nameText.textContent = spot.name;
            categoryText.textContent = config.label;
            locationText.textContent = spot.location;
            descriptionText.textContent = spot.description;

            popup.classList.add("show");
        }

        config.spots.forEach(function (spot) {

                var marker = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );

                marker.setAttribute("cx", spot.x);
                marker.setAttribute("cy", spot.y);
                marker.setAttribute("r", "6");

                marker.setAttribute(
                    "class",
                    "outdoor-marker " + config.markerClass
                );

                marker.setAttribute("tabindex", "0");
                marker.setAttribute("role", "button");
                marker.setAttribute("aria-label", spot.name);

                marker.addEventListener("click", function () {
                    showSpot(spot);
                });

                marker.addEventListener("keydown", function (event) {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        showSpot(spot);
                    }
                });

                markerGroup.appendChild(marker);
            });

                var closeButton = popup.querySelector(".popup-close");

                if (closeButton) {
                    closeButton.addEventListener("click", function () {
                        popup.classList.remove("show");
                    });
                }
            }


    /* =========================
    INITIALIZE MAPS
    ========================= */

    document.addEventListener("DOMContentLoaded", function () {

        setupOutdoorMap({
            markerId: "camping-markers",
            popupId: "camping-popup",
            nameId: "camping-name",
            categoryId: "camping-category",
            locationId: "camping-location",
            descriptionId: "camping-description",
            markerClass: "camping-marker",
            label: "CAMPING SPOT",
            spots: campingSpots
        });

        setupOutdoorMap({
            markerId: "hiking-markers",
            popupId: "hiking-popup",
            nameId: "hiking-name",
            categoryId: "hiking-category",
            locationId: "hiking-location",
            descriptionId: "hiking-description",
            markerClass: "hiking-marker",
            label: "HIKING SPOT",
            spots: hikingSpots
        });

    });












fetch(weatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var weatherCode = data.current.weather_code;
        showWeather(weatherCode);
    })

    function showWeather(code) {
        var icon = document.getElementById("weather-icon");
        if (code === 0) {
            icon.textContent = "☀️";
            document.body.className = "weather-sunny";

        } else if (code >= 1 && code <= 3) {
            icon.textContent = "⛅";
            document.body.className = "weather-cloudy";

        } else if (code >= 51 && code <= 67) {
            icon.textContent = "🌧️";
            document.body.className = "weather-rainy";

        } else {
            icon.textContent = "⛅";
            document.body.className = "weather-cloudy";
        }

    }

    
    // クリック時に遷移するウェブサイトのURL
/*    // カテゴリー選択肢を追加
    var categorySelect = document.getElementById("category");
    categories.forEach(function(category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });*/
