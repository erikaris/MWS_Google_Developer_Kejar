// File: sw.js

const NAMACACHE = 'mws-v1';

// hanya files yang diperlukan untuk membentuk "application shell" saja yang didaftarkan ke cache. 
let filesToCache = [
	'.', 
	'index.html', 
	'asdf.html', 
	'task3.html', 
	'task4.html', 
	'task5.html', 
	'js/peta.js', 
	'js/math_operation.js', 
	'css/mystyle.css',  
	'images/monas.jpg'
];


// // self refers to the window. 
// self.addEventListener('fetch', event => {
// 	console.log("event.request");
// });

// // self.addEventListener('fetch', event =>	{
// // 	event.respondWith(new Response('<b>intersepsi</b> jawaban!', 
// // 		{
// // 			headers: {'content-type':'text/html'}
// // 		}));
// // })

// self.addEventListener('fetch', event => {
// 	event.respondWith(fetch('data/catatan.json'))
// 	console.log(event.request);
// });

// // self.addEventListener('fetch', event => {
// // 	event.respondWith(
// // 		fetch(event.request)
// // 			.then(resp => {
// // 				if(resp.status == 404)	{
// // 					return new Response("File tidak ditemukan");
// // 				}
// // 				return resp;  // jawaban normal tanpa error
// // 			})
// // 			.catch(error => {
// // 				return new Response("Terjadi Error: " + error);
// // 			})
// // 	)
// // });


self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(ada_response =>	{
			if(ada_response)	{
				return ada_response;
			}
			// jika tidak ada response, ambil ke jaringan
			else 	{
				return fetch(event.request)
					.then(jawaban => {
						//periksa jika jawaban itu tidak kosong
						if(!jawaban.ok)	{
							throw Error(jawaban.statusText);
						}

						// tulis jawaban di cache dan juga berikan jawaban ke browser
						return caches.open(NAMACACHE)
							.then(cache =>	{
								// cache.put --> mengisi cache dengan requested file. 
								cache.put(event.request, jawaban.clone());
								return jawaban;	
							})
					});

			}
		})
		.catch(error => {
			return new Response("Waduh, ada error " + error);
		})
	);
});

self.addEventListener('install', event => {
	console.log('Persiapan Cache');
	// event.waitUntil( ) akan melakukan loop hingga semua file yang terdaftar selesai disimpan dalam cache.
	event.waitUntil(
		// caches.open( NamaCache) Membuka NamaCache, jika belum ada, maka cache tersebut akan diciptakan
		caches.open(NAMACACHE)  
			.then(cache => {
				// caches.addAll (arrayOfFiles) menambahkan semua nama file dalam array untuk disimpan di Cache.
				return cache.addAll(filesToCache);
			})
	);
});