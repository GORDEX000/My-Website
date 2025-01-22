// URL of the stream (you can replace it with your actual stream URL)
const streamUrl = "https://gg.hls2.xyz/live/IR%20-%20GEM%20TV/chunks.m3u8?nimblesessionid=62373538";
const refererHeader = "https://www.aparatchi.com";

// Checking if HLS.js is supported
if (Hls.isSupported()) {
    const video = document.getElementById('video');
    const hls = new Hls();

    // Intercepting the request to add custom headers
    hls.on(Hls.Events.REQUEST_INITIATED, function (event, data) {
        // Add the Referer header to the request
        if (data.url === streamUrl) {
            data.headers = {
                ...data.headers,
                "Referer": refererHeader
            };
        }
    });

    hls.loadSource(streamUrl);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        console.log('Manifest parsed successfully');
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
        console.error("Error during stream loading:", data);
        video.innerHTML = "An error occurred while loading the stream.";
    });

} else {
    console.error("HLS.js is not supported on this browser.");
    document.querySelector("p").innerText = "Your browser does not support HLS.js.";
}
