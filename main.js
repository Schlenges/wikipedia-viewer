// Search for specific entries
$('i').click(function(){
    searchWiki();
});

$('#searchbox').keypress(function(e) {
   if(e.which==13) {
     searchWiki();
     e.preventDefault();
   }
});

// Get random article
$("svg").click(function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random');
});


function searchWiki(){
    var searchTerm = searchbox.value;
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json";
    $('.result').remove();
    $.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp", // jsonp to avoid cross origin problem
    success: displayResults
    });
};

function displayResults(data){
    if(data[1].length != 0){
        for(var i = 0; i < data[1].length; i++){
            div = document.createElement("div");
            div.className = 'result';
            div.id = `${i}`;
            document.querySelector(".flex-container").appendChild(div);
            $(`<a href="${data[3][i]}" target="blank"><span class="link-span"></span></a>`).appendTo(`#${i}`);
            $(`<h1>${data[1][i]}</h1>`).appendTo(`#${i}`);
            $(`<p>${data[2][i]}</p>`).appendTo(`#${i}`);
        };
    } else{
        $(`<p>Sorry, there are no matching articles for your search.</p>`).appendTo(`.flex-container`);
    };
    $(".flex-container").css("height", "auto");
};