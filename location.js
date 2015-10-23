//Working with Heqian li
var URL = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=pKVW3rnx6ZcDhPfePuiCF2iIVpzIXU2C&location=44.05778,-123.10944';



function get_address(lat, lng, cb) {
    $.ajax({
        'url': URL +  '&location=' + lat + ',' + lng,
        'type': 'get',
        'success': function(ret) {
            var loc = ret['results'][0]['locations'][0];
            cb(loc['street']);
        },
        'error': function(e) {
            console.log(e);
        },
    });
}

$(document).ready(function() {
    var map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [44.05778, -123.10944],
        zoom: 14,
    });
    map.on('click', function(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        var marker = L.marker([lat, lng]).addTo(map);
        get_address(lat, lng, function(addr) {
            marker.bindPopup("<b>Street:</b><br/>" + addr).openPopup();
        });
    });
});
