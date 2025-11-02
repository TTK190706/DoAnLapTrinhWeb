document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("close-btn");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupPrice = document.getElementById("popup-price");
    const popupDesc = document.getElementById("popup-desc");

    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img").src;
            const title = card.querySelector(".title").innerText;
            const price = card.querySelector(".price").innerText;

            popupImg.src = img;
            popupTitle.textContent = title;
            popupPrice.textContent = price;

            fetch("SanPham.json")
                .then(res => res.json())
                .then(data => {
    const item = data.find(p => p.name.trim().toLowerCase() === title.trim().toLowerCase());
    if (item) {
        popupDesc.innerHTML = `
            <b>Tác giả:</b> ${item.author}<br>
            <b>Thể loại:</b> ${item.category}<br>
            <b>Nhà xuất bản:</b> ${item.publisher}<br>
            <b>Năm XB:</b> ${item.publicYear}<br>
            <b>Mô tả:</b> ${item.description}
        `;
    } else {
        popupDesc.textContent = "Không có thông tin chi tiết.";
    }
})

                .catch(() => {
                    popupDesc.textContent = "Không tải được thông tin sản phẩm.";
                });

            overlay.classList.remove("hidden");
            popup.classList.remove("hidden");
        });
    });

    [overlay, closeBtn].forEach(el => {
        el.addEventListener("click", () => {
            overlay.classList.add("hidden");
            popup.classList.add("hidden");
        });
    });
});
