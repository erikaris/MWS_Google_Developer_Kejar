function findLocation(x, y) {
	// console.log(x, y)
	for (var i=0; i<places.length; i++) {
		if (places[i].lokasi[0] == x &&
			places[i].lokasi[1] == y) {
			return i;
		}
	}
	return -1;
}

function showLocation(e)	{
	// console.log("you clicked " + e.latlng.lat + " and " + e.latlng.lng);
	let ix = findLocation(e.latlng.lat, e.latlng.lng);
	if (ix >= 0) {
		img.src = places[ix].gambar;
		par.textContent = places[ix].review;
	}
}

let gmb = document.getElementById('gmb');
let rev = document.getElementById('review');
let img = document.createElement('img');
let par = document.createElement('p');
gmb.appendChild(img);
rev.appendChild(par);

const URL = "data/peta.json";
let places = [];

fetch(URL)
	.then(resp => {
		return resp.json();
	})
	// .then(data => console.log(data))
	.then(resp =>	{
		places = resp.places;
		for (var p of places) {
			var marker = L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
			marker.on('click', showLocation);
		}
		// console.log(places);
	})
	.catch(function(err)	{
		console.log(err);
	})