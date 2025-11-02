document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("close-btn");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupPrice = document.getElementById("popup-price");
    const popupDesc = document.getElementById("popup-desc");

    // Gắn sự kiện click cho từng sản phẩm
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img").src;
            const title = card.querySelector(".title").innerText;
            const price = card.querySelector(".price").innerText;

            popupImg.src = img;
            popupTitle.textContent = title;
            popupPrice.textContent = price;

            // Lấy thông tin chi tiết từ file khác (ví dụ info.json)
            fetch("SanPham.json")
                .then(res => res.json())
                .then(data => {
                    const item = data.find(p => p.name.trim().toLowerCase() === title.trim().toLowerCase());

                    popupDesc.textContent = item ? item.description : "Không có thông tin chi tiết.";
                })
                .catch(() => {
                    popupDesc.textContent = "Không tải được thông tin sản phẩm.";
                });

            // Hiện popup
            overlay.classList.remove("hidden");
            popup.classList.remove("hidden");
        });
    });

    // Đóng popup
    [overlay, closeBtn].forEach(el => {
        el.addEventListener("click", () => {
            overlay.classList.add("hidden");
            popup.classList.add("hidden");
        });
    });
});
