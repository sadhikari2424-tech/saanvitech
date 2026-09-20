document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdekadgz";
  const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // digits only, e.g. 919876543210

  function showStatus(message, ok = true) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = ok ? "form-status success" : "form-status error";
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }
      showStatus("Sending your enquiry…");

      const formData = new FormData(form);
      formData.set("_subject", `Saanvitech Website Enquiry - ${formData.get("name") || "New Lead"}`);

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        const result = await response.json();

        if (response.ok) {
          form.reset();
          showStatus("Thank you! Your enquiry has been received. We will contact you shortly.");
        } else {
          const message = result?.errors?.map(x => x.message).join(", ") || "Please check the form and try again.";
          showStatus(message, false);
        }
      } catch (error) {
        showStatus("Connection problem. Please try again or contact us by WhatsApp.", false);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Enquiry";
        }
      }
    });
  }

  document.querySelectorAll("[data-whatsapp]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (WHATSAPP_NUMBER === "91XXXXXXXXXX") {
        alert("Please add your Saanvitech WhatsApp number in script.js before publishing.");
        return;
      }
      const message = "Hello Saanvitech, I would like to discuss an engineering / water treatment / Power BI / AI automation requirement.";
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
