$(function() {
  var searchField = $('#query');
  var icon = $('#search-btn');

  $(searchField).on('focus', function() {
    $(this).animate({
      width:"100%"
    }, 400);
    $(icon).animate({
      right: "10px"
    }, 400);
  });

  $(searchField).on('blur', function() {
    if(searchField.val() == ''){
      $(searchField).animate({
        width: "45%"
      },400, function(){});
      $(icon).animate({
        right: "360px"
      },400, function(){});
    }
  });
  $('#search-form').submit(function(e){
    e.preventDefault();
  });
})

function search(){
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyAIYjJ-kpwYLGD-uQL7_WaGxZ_GwyT5Gv0'},
    function(data){

      console.log(data);


  var videoId = data.items[0].id.videoId;
  var title = data.items[0].snippet.title;
  var thumbnail = data.items[0].snippet.thumbnails.default.url
})
