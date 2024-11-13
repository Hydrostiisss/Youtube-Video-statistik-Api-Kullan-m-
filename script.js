function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getVideoStats() {
    var videoId = document.getElementById("videoId").value.trim(); // ID'yi alırken baştaki ve sondaki boşlukları kaldırma
    var statsDiv = document.getElementById("videoStats");
    statsDiv.innerHTML = ""; // Her istek yapıldığında önceki mesajları temizleme

    // ID girilmemişse hata mesajı göster
    if (!videoId) {
        displayError("ID girilmemiş.");
        return; // İşlemi sonlandır
    }

    var apiUrl = "https://tilki.dev/api/youtube-video-istatistik/" + videoId;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayVideoStats(data, videoId);
        })
        .catch(error => {
            console.error('Hata', error);
            displayError("Oluştu");
        });
}

function displayVideoStats(data, videoId) {
    var statsDiv = document.getElementById("videoStats");
    var videolinkFirst = "https://www.youtube.com/watch?v=";
    var formattedViewCount = formatNumber(data.statistics.viewCount);
    var formattedLikeCount = formatNumber(data.statistics.likeCount);
    var formattedCommentCount = formatNumber(data.statistics.commentCount);

    statsDiv.innerHTML += `
        <h2>Video İstatistikleri</h2>
        <h4><a href="${videolinkFirst + videoId}" target="_blank">Belirtilen ID'ye Sahip Video</a></h4>
        <h4>Video ID: ${data.videoId}</h4>
        <h4>Görüntülenme Sayısı: ${formattedViewCount}</h4>
        <h4>Beğeni Sayısı: ${formattedLikeCount}</h4>
        <h4>Yorum Sayısı: ${formattedCommentCount}</h4>
    `;
}

function displayError(errorMessage) {
    var statsDiv = document.getElementById("videoStats");
    statsDiv.innerHTML += `
        <h3>Hata: ${errorMessage}</h3>
    `;
}
