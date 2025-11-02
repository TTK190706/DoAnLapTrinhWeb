document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("close-btn");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupPrice = document.getElementById("popup-price");
    const popupDesc = document.getElementById("popup-desc");

    document.querySelectorAll(".product-card").forEach(card => {
        card.classList.add("orderItem");

        if (!card.querySelector(".orderBtn")) {
            const btn = document.createElement("button");
            btn.className = "orderBtn";
            btn.textContent = "Mua ngay";
            card.appendChild(btn);
        }
    });

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
                    const item = data.find(p => p.title === title);
                    popupDesc.textContent = item
                        ? item.description
                        : "Không có thông tin chi tiết.";
                })
                .catch(() => {
                    popupDesc.textContent = "Không tải được thông tin sản phẩm.";
                });

            overlay.classList.remove("hidden");
            popup.classList.remove("hidden");
        });
    });

    document.querySelectorAll(".orderBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation(); 
            const card = btn.closest(".orderItem");
            const title = card.querySelector(".title").innerText;
            console.log("Bạn vừa nhấn Mua:", title);
        });
    });

    [overlay, closeBtn].forEach(el => {
        el.addEventListener("click", () => {
            overlay.classList.add("hidden");
            popup.classList.add("hidden");
        });
    });
});
