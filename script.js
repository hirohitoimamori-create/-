document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".interactive-panel");

  panels.forEach((panel) => {
    const buttons = Array.from(
      panel.querySelectorAll(".interactive-panel__item"),
    );
    if (!buttons.length) return;

    const detail = panel.querySelector(".interactive-panel__detail");
    if (!detail) return;

    const image = detail.querySelector(".interactive-panel__image");
    const title = detail.querySelector(".interactive-panel__title");
    const description = detail.querySelector(".interactive-panel__description");
    const list = detail.querySelector(".interactive-panel__list");
    const caption = detail.querySelector(".interactive-panel__caption");

    const updateDetail = (button) => {
      buttons.forEach((btn) =>
        btn.classList.toggle("is-active", btn === button),
      );

      const {
        image: imgSrc,
        alt,
        title: itemTitle,
        description: itemDescription,
        highlights,
        caption: captionText,
      } = button.dataset;

      if (imgSrc && image) {
        image.src = imgSrc;
      }

      if (alt && image) {
        image.alt = alt;
      }

      if (itemTitle && title) {
        title.textContent = itemTitle;
      }

      if (itemDescription && description) {
        description.textContent = itemDescription;
      }

      if (captionText && caption) {
        caption.textContent = captionText;
      }

      if (list) {
        list.innerHTML = "";
        if (highlights) {
          highlights.split("|").forEach((text) => {
            const trimmed = text.trim();
            if (!trimmed) return;
            const li = document.createElement("li");
            li.textContent = trimmed;
            list.appendChild(li);
          });
        }
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => updateDetail(button));
    });

    const active =
      buttons.find((btn) => btn.classList.contains("is-active")) ?? buttons[0];
    updateDetail(active);
  });
});
